#!/usr/bin/env python3
"""Native Safari only. Default: capability probe; --run: E3/E4/E6 smoke.

Python stdlib; no settings changes, dependency install, service or user tab reuse.
JSON goes to stdout. Exit 0=ready/pass, 1=smoke failure, 2=not-run.
"""
import argparse
import hashlib
import json
import plistlib
import signal
import socket
import subprocess
import sys
import tempfile
import time
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET
from pathlib import Path

ELEMENT = "element-6066-11e4-a52e-4f735466cecf"
REPORT = {"kind": "actual-installed-Safari-WebDriver", "status": "not-run",
          "cases": [], "checks": [], "settingsChanged": False,
          "userTabsReused": False, "servicesStarted": [], "voiceOver": {"status": "not-run"}}


def check(name, actual, expected):
    REPORT["checks"].append({"name": name, "actual": actual, "expected": expected})
    if actual != expected:
        raise AssertionError(f"{name}: {actual!r} != {expected!r}")


def voiceover_dictionary():
    app = Path("/System/Library/CoreServices/VoiceOver.app/Contents")
    source = (app / "Resources/VoiceOver.sdef").read_bytes()
    dictionary = ET.fromstring(source)
    info = plistlib.loads((app / "Info.plist").read_bytes())
    running = subprocess.run(["/usr/bin/pgrep", "-x", "VoiceOver"],
                             capture_output=True, timeout=3).returncode
    REPORT["voiceOver"].update({"version": info.get("CFBundleShortVersionString"),
        "build": info.get("CFBundleVersion"), "runningProbeExit": running,
        "dictionarySha256": hashlib.sha256(source).hexdigest(),
        "lastPhraseContentInterface": dictionary.find(".//class[@name='last phrase object']/property[@name='content']") is not None,
        "cursorTextInterface": dictionary.find(".//class[@name='vo cursor object']/property[@name='text under cursor']") is not None,
        "reason": "Installed dictionary read only. No VoiceOver launch, Apple Events, speech capture or permission changes."})


class Driver:
    def __init__(self, port):
        self.url = f"http://127.0.0.1:{port}"
        self.session = None
        # Local endpoints only; do not route private automation through proxies.
        self.http = urllib.request.build_opener(urllib.request.ProxyHandler({}))

    def request(self, method, route, body=None):
        raw = None if body is None else json.dumps(body).encode()
        request = urllib.request.Request(self.url + route, raw, method=method,
                                         headers={"Content-Type": "application/json"})
        try:
            with self.http.open(request, timeout=5) as response:
                result = json.load(response)
        except urllib.error.HTTPError as error:
            result = json.loads(error.read())
        value = result.get("value")
        if isinstance(value, dict) and "error" in value:
            raise RuntimeError(json.dumps(value, ensure_ascii=False))
        return value

    def call(self, method, route, body=None):
        return self.request(method, f"/session/{self.session}" + route, body)

    def read(self, script, *args):
        return self.call("POST", "/execute/sync", {"script": script, "args": list(args)})

    def find(self, selector, root=None, using="css selector"):
        route = f"/element/{root[ELEMENT]}/element" if root else "/element"
        return self.call("POST", route, {"using": using, "value": selector})

    def button(self, name, root):
        return self.find(f".//button[@aria-label='{name}' or normalize-space(.)='{name}']", root, "xpath")

    def click(self, element):
        self.call("POST", f"/element/{element[ELEMENT]}/click", {})

    def fill(self, element, value):
        self.call("POST", f"/element/{element[ELEMENT]}/clear", {})
        self.call("POST", f"/element/{element[ELEMENT]}/value", {"text": value})

    def keys(self, key, modifiers=()):
        actions = [{"type": "keyDown", "value": value} for value in modifiers]
        actions += [{"type": "keyDown", "value": key}, {"type": "keyUp", "value": key}]
        actions += [{"type": "keyUp", "value": value} for value in reversed(modifiers)]
        self.call("POST", "/actions", {"actions": [{"type": "key", "id": "w7-keyboard", "actions": actions}]})

    def prop(self, element, name):
        return self.read("return arguments[0][arguments[1]]", element, name)

    def attr(self, element, name):
        return self.read("return arguments[0].getAttribute(arguments[1])", element, name)

    def rect(self, element):
        return self.read("const r=arguments[0].getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height}", element)

    def scene(self, base, scene):
        self.call("POST", "/url", {"url": base.rstrip("/") + "/#" + scene})
        deadline = time.monotonic() + 5
        while True:
            ready = self.read("return document.querySelector('.w6-consumer')?.getAttribute('data-active-task')")
            if ready == scene:
                return self.find(f"[data-scene='{scene}']")
            if time.monotonic() >= deadline:
                raise AssertionError(f"Accepted W6 consumer not ready for {scene}: {ready!r}")
            time.sleep(0.1)


def e3(driver, base):
    root = driver.scene(base, "E3")
    identity = driver.find("[data-testid='grading-identity']", root)
    panel = driver.find("aside[aria-label='评分区']", root)
    tabs = driver.find("[role='tablist'][aria-label='当前题目选择']", root)
    driver.click(driver.find(".//*[@role='tab' and normalize-space(.)='第1题']", tabs, "xpath"))
    driver.keys("\ue014")  # native ArrowRight, followed by Enter (manual activation)
    driver.keys("\ue007")
    check("E3 keyboard question identity", driver.attr(identity, "data-draft-key"), "paper-microclimate/q2/lin-ning")
    driver.fill(driver.find("input[aria-label='本题分数']", root), "17")
    driver.keys("\ue004")
    driver.fill(driver.find("textarea[aria-label='评分评语']", root), "Safari 林宁第二题独立草稿")
    driver.click(driver.button("进入专注", root))
    driver.click(driver.button("退出专注", root))
    check("E3 score panel stays mounted", driver.prop(panel, "isConnected"), True)
    check("E3 layout does not save", driver.prop(driver.find("[role='status']", root), "textContent"), "尚未保存到本地")
    driver.click(driver.button("保存本地草稿", root))
    driver.click(driver.button("显示批改队列", root))
    driver.click(driver.find(".//label[input[@name='grading-mode' and @value='question']]", root, "xpath"))
    check("E3 question axis selected", driver.prop(driver.find("input[name='grading-mode'][value='question']", root), "checked"), True)
    student_tabs = driver.find("[role='tablist'][aria-label='当前学生选择']", root)
    driver.click(driver.find(".//*[@role='tab' and normalize-space(.)='陈安']", student_tabs, "xpath"))
    check("E3 other student identity", driver.attr(identity, "data-draft-key"), "paper-microclimate/q2/chen-an")
    check("E3 other student empty score", driver.prop(driver.find("input[aria-label='本题分数']", root), "value"), "")
    check("E3 other student empty comment", driver.prop(driver.find("textarea[aria-label='评分评语']", root), "value"), "")
    driver.click(driver.find(".//*[@role='tab' and normalize-space(.)='林宁']", student_tabs, "xpath"))
    check("E3 saved score follows student/question", driver.prop(driver.find("input[aria-label='本题分数']", root), "value"), "17")
    check("E3 saved comment follows student/question", driver.prop(driver.find("textarea[aria-label='评分评语']", root), "value"), "Safari 林宁第二题独立草稿")
    check("E3 saved status follows identity", driver.prop(driver.find("[role='status']", root), "textContent"), "已保存到本地状态")


def e4(driver, base):
    root = driver.scene(base, "E4")
    main = driver.find(".w6-replay-main", root)
    pane = driver.find(".rain-workspace__region[data-region-id='knowledge-index']", root)
    workspace = driver.find(".rain-workspace", root)
    notes = driver.find("textarea[aria-label='回放笔记']", root)
    driver.fill(notes, "Safari 固定知识索引前的笔记")
    driver.click(driver.button("讲稿 02:10", root))
    before = driver.rect(main)
    driver.click(driver.button("临时查看知识索引", root))
    check("E4 temporary mode", driver.attr(pane, "data-temporary"), "true")
    after = driver.rect(main)
    check("E4 temporary pane preserves main geometry", all(abs(before[k] - after[k]) <= 1 for k in before), True)
    driver.click(driver.button("固定知识索引", root))
    check("E4 pinned mode", driver.attr(pane, "data-mode"), "expanded")
    check("E4 pinned is not temporary", driver.attr(pane, "data-temporary"), "false")
    check("E4 pinned allocates space", driver.rect(main)["width"] < before["width"] - 200, True)
    driver.click(driver.button("进入专注", root))
    driver.click(driver.button("临时查看知识索引", root))
    driver.click(driver.button("固定知识索引", root))
    check("E4 pin retains focused mode", driver.attr(workspace, "data-focused"), "true")
    driver.click(driver.button("退出专注", root))
    check("E4 restore keeps pinned mode", driver.attr(pane, "data-mode"), "expanded")
    check("E4 playback stays at chapter", driver.prop(driver.find("[data-testid='playback-time']", root), "textContent"), "02:10")
    check("E4 notes survive layout changes", driver.prop(notes, "value"), "Safari 固定知识索引前的笔记")
    check("E4 paused state retained", driver.prop(driver.button("播放回放", root), "isConnected"), True)


def e6(driver, base):
    root = driver.scene(base, "E6")
    preview = driver.find(".w6-review-preview", root)
    comments = driver.find(".w6-review-comments", root)
    first = driver.attr(preview, "data-resource-id")
    note = driver.find("textarea", comments)
    driver.fill(note, "Safari 资料独立审核草稿")
    driver.click(driver.button("隐藏资源队列", root))
    edge = driver.button("展开资源队列", root)
    check("E6 nearby edge visible", driver.rect(edge)["width"] > 0, True)
    # macOS native Option+Shift+Tab reaches all controls without changing Safari preferences.
    for _ in range(30):
        if driver.read("return arguments[0]===document.activeElement", edge):
            break
        driver.keys("\ue004", ("\ue008", "\ue00a"))
    check("E6 native keyboard reaches nearby edge", driver.read("return arguments[0]===document.activeElement", edge), True)
    driver.keys("\ue007")
    check("E6 edge restores queue", driver.attr(driver.find(".rain-workspace__region[data-region-id='queue']", root), "data-mode"), "expanded")
    check("E6 restore preserves draft", driver.prop(note, "value"), "Safari 资料独立审核草稿")
    driver.click(driver.button("下一份", root))
    second = driver.attr(preview, "data-resource-id")
    check("E6 next resource differs", first != second, True)
    check("E6 preview/review same identity", driver.attr(comments, "data-resource-id"), second)
    check("E6 other resource empty draft", driver.prop(driver.find("textarea", comments), "value"), "")
    driver.click(driver.button("上一份", root))
    check("E6 return restores resource draft", driver.prop(driver.find("textarea", comments), "value"), "Safari 资料独立审核草稿")
    selected = driver.find(".w6-review-queue button[aria-pressed='true']", root)
    check("E6 queue/preview same title", driver.attr(selected, "aria-label"), driver.prop(driver.find("h1", preview), "textContent"))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--run", action="store_true", help="Run mock-page smoke in a new Safari automation session")
    parser.add_argument("--base-url", default="http://127.0.0.1:5368")
    args = parser.parse_args()
    if args.base_url != "http://127.0.0.1:5368":
        parser.error("Only the accepted 5368 mock-page service is allowed by this smoke")
    child = driver = None
    REPORT["startedAt"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
    def interrupted(signum, _frame):
        raise TimeoutError("120-second total deadline" if signum == signal.SIGALRM else "Interrupted; cleaning up owned resources")
    for signum in (signal.SIGALRM, signal.SIGINT, signal.SIGTERM):
        signal.signal(signum, interrupted)
    signal.alarm(120)
    with tempfile.TemporaryFile() as log:
        try:
            voiceover_dictionary()
            REPORT["driverVersion"] = subprocess.run(["/usr/bin/safaridriver", "--version"], capture_output=True, text=True, timeout=5).stdout.strip()
            with socket.socket() as reservation:
                reservation.bind(("127.0.0.1", 0))
                port = reservation.getsockname()[1]
            REPORT["driverCommand"] = ["/usr/bin/safaridriver", "-p", str(port)]
            child = subprocess.Popen(REPORT["driverCommand"], stdout=log, stderr=log)
            driver = Driver(port)
            started = time.monotonic()
            while True:
                try:
                    driver.request("GET", "/status")
                    break
                except urllib.error.URLError:
                    if child.poll() is not None or time.monotonic() - started > 5:
                        raise
                    time.sleep(0.1)
            session = driver.request("POST", "/session", {"capabilities": {"alwaysMatch": {"browserName": "safari"}}})
            driver.session = session["sessionId"]
            REPORT["capabilities"] = session["capabilities"]
            REPORT["sessionCreated"] = True
            REPORT["status"] = "ready"
            if args.run:
                driver.call("POST", "/timeouts", {"implicit": 0, "pageLoad": 8000, "script": 3000})
                driver.call("POST", "/window/rect", {"width": 1440, "height": 1000})
                for name, operation in (("E3", e3), ("E4", e4), ("E6", e6)):
                    try:
                        operation(driver, args.base_url)
                        REPORT["cases"].append({"scene": name, "status": "passed"})
                    except TimeoutError:
                        raise
                    except Exception as error:
                        REPORT["cases"].append({"scene": name, "status": "failed", "error": str(error)})
                REPORT["status"] = "passed" if all(case["status"] == "passed" for case in REPORT["cases"]) else "failed"
        except Exception as error:
            REPORT["reason"] = str(error)
            if args.run and REPORT.get("sessionCreated"):
                REPORT["status"] = "failed"
        finally:
            signal.alarm(0)
            if driver and driver.session:
                try:
                    driver.call("DELETE", "")
                    REPORT["sessionCleanup"] = "deleted-owned-session"
                except Exception as error:
                    REPORT["sessionCleanup"] = str(error)
            if child:
                child.terminate()
                try:
                    child.wait(timeout=3)
                except subprocess.TimeoutExpired:
                    child.kill()
                    child.wait(timeout=3)
                REPORT["driverCleanup"] = {"pid": child.pid, "exitCode": child.returncode, "stopped": True}
            log.seek(0)
            REPORT["driverLog"] = log.read(6000).decode(errors="replace")
            REPORT["finishedAt"] = time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
            print(json.dumps(REPORT, ensure_ascii=False, indent=2))
    return 2 if REPORT["status"] == "not-run" else 1 if REPORT["status"] == "failed" else 0


if __name__ == "__main__":
    sys.exit(main())
