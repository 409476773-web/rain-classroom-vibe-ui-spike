import { useState, type ReactNode } from "react";
import { DensityProvider } from "@rain-next/foundations";
import { Inline, Stack } from "@rain-next/layouts";
import { Avatar, AvatarGroup, AvatarGrid, StatusIndicator, StatusIndicatorGroup, ActivityOverlay, avatarAssets, assignAvatarAssets,
  Button, Checkbox, Popover, IconButton, Link, type AvatarAssetId, type AvatarSize } from "@rain-next/ui";
import { CloseIcon } from "@rain-next/ui/icons/close";
import { ProhibitedIcon } from "@rain-next/ui/icons/prohibited";
import { ComputerFilledIcon } from "@rain-next/ui/icons/computer-filled";
import { MobileFilledIcon } from "@rain-next/ui/icons/mobile-filled";
import { VideoOffIcon } from "@rain-next/ui/icons/video-off";
import { VolumeFilledIcon } from "@rain-next/ui/icons/volume-filled";
import { ButtonLoadingIcon } from "@rain-next/ui/icons/button-loading";
import "./layouts-page.css";
import "./avatar-page.css";

const names = ["林雨", "陈星", "周明", "苏禾", "李晴", "王远", "何悦", "赵宁", "吴桐", "许安", "陆川", "方可"];
const assignment = assignAvatarAssets(names.map((_, i) => `member-${i}`), "student");
const members = names.map((name, i) => ({ id: `member-${i}`, name, src: avatarAssets[assignment[`member-${i}`]!] }));
const sizes: AvatarSize[] = [24, 32, 40];
function Section({ title, note, children }: { title: string; note: string; children: ReactNode }) {
  return <section className="avatar-review-section"><Stack gap={16}><div><h2>{title}</h2><p>{note}</p></div>{children}</Stack></section>;
}
function MemberDetails({ title, people, children }: { title: string; people: typeof members; children: ReactNode }) {
  return <Popover.Root>{children}<Popover.Content width={280}>
    <div className="rain-avatar-group__header"><Popover.Title>{title}</Popover.Title>
      <Popover.Close render={<IconButton icon={<CloseIcon />} size="24/16" aria-label="关闭" />} /></div>
    <Popover.Description>虚构成员资料示例</Popover.Description>
    <ul className="rain-avatar-group__members">{people.map(member => <li key={member.id}>
      <Avatar src={member.src} alt="" size={32} /><span>{member.name} · 学生</span>
    </li>)}</ul>
  </Popover.Content></Popover.Root>;
}
export function AvatarPage() {
  const [dark, setDark] = useState(false), [compact, setCompact] = useState(false);
  const [speaking, setSpeaking] = useState(true), [offline, setOffline] = useState(false);
  const [copyMessage, setCopyMessage] = useState("");
  async function copyAsset(id: AvatarAssetId) {
    try { await navigator.clipboard.writeText(`avatarAssets["${id}"]`); setCopyMessage(`已复制 ${id} 的引用`); }
    catch { setCopyMessage("复制未完成，请选中素材下方的引用文字复制。"); }
  }
  return <DensityProvider density={compact ? "compact" : "default"}>
    <main className="layouts-review py-rain-32" data-rain-id="avatar-page" data-rain-theme={dark ? "dark" : "light"}>
      <Stack gap={24} className="layouts-review-content">
        <Stack gap={12}><Link href="#components">返回组件</Link><h1 id="avatar-title" tabIndex={-1}>头像与成员</h1>
          <p>用人物图片识别成员，用组合表达关系，让状态始终有明确含义。</p>
          <p>待评审候选 · 人物图片与雨课堂默认图 · 以下姓名和课堂数据均为虚构</p>
        </Stack>
        <Inline gap={16} aria-label="预览设置"><Checkbox label="深色主题" checked={dark} onCheckedChange={setDark} />
          <Checkbox label="紧凑密度" checked={compact} onCheckedChange={setCompact} /></Inline>
        <Section title="01 · 单头像" note="24、32、40 三档尺寸；圆形与圆角方形。缺失或损坏的图片回退到同一张雨课堂默认图。">
          <div className="avatar-review-matrix">
            {(["circle", "square"] as const).map(shape => <Stack gap={16} key={shape}><strong>{shape === "circle" ? "圆形" : "圆角方形"}</strong>
              <Inline gap={24}>{sizes.map(size => <Stack key={size} gap={8} className="items-center"><Avatar src={members[0]!.src} alt="林雨" size={size} shape={shape} /><span>{size}</span></Stack>)}</Inline></Stack>)}
            <Stack gap={16}><strong>稳定回退</strong><Inline gap={24}><Stack gap={8} className="items-center"><Avatar alt="未设置头像" size={40} /><span>无图片</span></Stack>
              <Stack gap={8} className="items-center"><Avatar src="data:image/png;base64,invalid" alt="图片加载失败" size={40} /><span>图片损坏</span></Stack></Inline></Stack>
          </div>
          <Inline gap={24}>{([undefined, "online", "offline"] as const).map((presence, i) => <Stack gap={8} key={i} className="items-center">
            <Avatar src={members[1]!.src} alt="陈星" size={40} presence={presence} /><span>{["未声明在线状态", "在线 · 保留原图", "离线 · 灰度"][i]}</span>
          </Stack>)}</Inline>
          <Inline gap={16}><MemberDetails title="周明" people={[members[2]!]}><Avatar src={members[2]!.src} alt="" presence="offline" size={40} render={<Popover.Trigger render={<button type="button" />} aria-label="查看周明（离线）" />} /></MemberDetails>
            <span>离线仍可查看成员</span><Avatar src={members[3]!.src} alt="" size={40} render={<a href="#components" aria-label="返回组件目录" />} /><span>页面跳转使用链接</span></Inline>
        </Section>
        <Section title="02 · 横向头像组" note="上限包含 More 槽位。9 人全部显示；超过 9 人显示前 8 人和 More。">
          <Stack gap={20}>{sizes.map(size => <Inline key={size} gap={16}><span>{size}px</span><AvatarGroup members={members} size={size} label={`${size}px 课程成员`} /></Inline>)}</Stack>
          <Inline gap={24}><Stack gap={8}><span>刚好 9 人</span><AvatarGroup members={members.slice(0, 9)} label="九位成员" /></Stack>
            <Stack gap={8}><span>整组与 More 分别操作</span><MemberDetails title="全部课程成员" people={members}><AvatarGroup members={members} label="查看全部课程成员" render={<Popover.Trigger render={<button type="button" />} />} /></MemberDetails></Stack></Inline>
        </Section>
        <Section title="03 · 九宫格头像" note="固定 40 × 40。保留 1–9 人排列，超过 9 人只展示前 9 人；点击行为属于整个小组。">
          <Inline gap={24}>{Array.from({ length: 11 }, (_, count) => <Stack key={count} gap={8} className="items-center">
            <AvatarGrid members={members.slice(0, count)} label={`${count} 人学习小组`} /><span>{count === 10 ? "10 人 → 9 格" : `${count} 人`}</span>
          </Stack>)}</Inline>
        </Section>
        <Section title="04 · 状态装饰" note="边缘最多两个状态。活动状态出现时暂时隐藏边缘状态，结束后恢复；操作放在头像之外。">
          <Inline gap={24}>{(["bottom-start", "bottom-center", "bottom-end"] as const).map(position => <Stack gap={12} className="items-center" key={position}>
            <Avatar src={members[4]!.src} alt="李晴" size={40}><StatusIndicatorGroup position={position}>
              <StatusIndicator label="电脑加入" icon={<ComputerFilledIcon />} /><StatusIndicator label="摄像头关闭" icon={<VideoOffIcon />} tone="danger" />
            </StatusIndicatorGroup></Avatar><span>{{ "bottom-start": "下左", "bottom-center": "下中", "bottom-end": "下右" }[position]}</span></Stack>)}
            <Stack gap={12} className="items-center"><Avatar src={members[5]!.src} alt="王远" size={40}><ActivityOverlay label="正在连接" icon={<ButtonLoadingIcon />} motion="rotate" /></Avatar><span>连接中</span></Stack>
            <Stack gap={12} className="items-center"><Avatar src={members[6]!.src} alt="何悦" size={40} shape="square"><ActivityOverlay label="正在发言" icon={<VolumeFilledIcon />} motion="pulse" /></Avatar><span>正在发言</span></Stack>
          </Inline>
          <Inline gap={16}>{(["neutral", "info", "success", "warning", "danger"] as const).map(tone => <StatusIndicator key={tone} label={`${tone} 示例状态`} tone={tone} size={24} icon={<VolumeFilledIcon />} />)}</Inline>
          <Inline gap={24}>{([16, 20, 24] as const).map(size => <Stack gap={8} className="items-center" key={size}>
            <Inline gap={8}><StatusIndicator label="连接处理中" icon={<ButtonLoadingIcon />} tone="info" size={size} />
              <StatusIndicator label="已阻止" icon={<ProhibitedIcon />} size={size} /></Inline><span>{size}px · 处理中 / 已阻止</span>
          </Stack>)}</Inline>
        </Section>
        <Section title="05 · 在场景中组合" note="同一套头像分别进入名单、课程摘要和课堂状态。人物状态与操作由所在页面管理。">
          <div className="avatar-review-scenarios">
            <Stack gap={16}><h3>课程名单</h3><Inline gap={12}><Avatar src={members[0]!.src} alt="" size={40} presence={offline ? "offline" : "online"} />
              <Stack gap={0}><strong>林雨</strong><span>{offline ? "离线" : "在线"} · 学生</span></Stack>
              <MemberDetails title="林雨" people={[members[0]!]}><Popover.Trigger render={<Button size="small">查看资料</Button>} /></MemberDetails></Inline>
              <Checkbox label="模拟成员离线" checked={offline} onCheckedChange={setOffline} /></Stack>
            <Stack gap={16}><h3>设计研究 · 第三组</h3><Inline gap={12}><MemberDetails title="第三组" people={members.slice(0, 6)}><AvatarGrid members={members.slice(0, 6)} label="查看第三组" render={<Popover.Trigger render={<button type="button" />} />} /></MemberDetails><span>6 位小组成员</span></Inline>
              <AvatarGroup members={members} label="设计研究课程成员" /><span>课程共有 12 位成员</span></Stack>
            <Stack gap={16}><h3>课堂成员状态</h3><Inline gap={12}>
              <Avatar src={members[7]!.src} alt="" size={40} data-testid="live-avatar"><StatusIndicatorGroup>
                <StatusIndicator label="手机加入" icon={<MobileFilledIcon />} tone="info" /><StatusIndicator label="摄像头关闭" icon={<VideoOffIcon />} tone="danger" />
              </StatusIndicatorGroup><ActivityOverlay active={speaking} label="赵宁正在发言" icon={<VolumeFilledIcon />} motion="pulse" /></Avatar>
              <Stack gap={0}><strong>赵宁</strong><span>{speaking ? "正在发言" : "等待发言"}</span></Stack></Inline>
              <Button size="small" onClick={() => setSpeaking(value => !value)}>{speaking ? "结束发言" : "开始发言"}</Button></Stack>
          </div>
        </Section>
        <Section title="06 · 头像图库" note="默认图 1 张、学生 25 张、教师 25 张。复制素材引用；人物分配应在完整成员集合上完成，再筛选和分页。">
          <p role="status" aria-live="polite">{copyMessage || "素材引用可复制，也可直接选中文本。"}</p>
          {(["default", "student", "teacher"] as const).map(role => <Stack gap={16} key={role}><h3>{({ default: "雨课堂默认图", student: "学生", teacher: "教师" })[role]}</h3>
            <div className="avatar-review-gallery">{(Object.entries(avatarAssets) as [AvatarAssetId, string][]).filter(([id]) => id.startsWith(role)).map(([id, src]) =>
              <figure key={id} className="avatar-review-asset" data-asset-id={id}><img className="avatar-review-asset-image" src={src} alt="" width={64} height={64} />
                <figcaption><strong>{id}</strong><code>{`avatarAssets["${id}"]`}</code></figcaption>
                <Button variant="text" size="small" aria-label={`复制 ${id} 引用`} onClick={() => copyAsset(id)}>复制引用</Button>
              </figure>)}</div></Stack>)}
        </Section>
        <details><summary>使用约定与来源</summary><Stack gap={12} className="pt-rain-16">
          <p>来源：Rain Classic 人物资产与组排列；成熟库参考：Base UI / Radix 的加载与回退、Ant Design 的组溢出、MUI 的人数区分、Chakra / shadcn 的装饰组合。颜色、焦点、浮层使用 Rain Next 当前规则。</p>
          <p>图片加载和解码成功前始终显示默认图。离线只影响图片灰度；不声明 presence 时不暗示在线。邻近已有姓名时传空 alt，操作入口另设明确名称。</p>
          <p>assignAvatarAssets 对同一完整成员集合确定分配；成员集合改变时可能重新分配。需要长期固定头像时，由宿主保存分配结果。</p>
          <p>当前 PNG 为 240 × 240，历史导出为 160 × 160 后重采样。当前运行视觉已确认；对比度验收仍待确认；此页不提供选图、上传或裁剪流程。</p>
          <pre>{`<Avatar src={avatarAssets["student-01"]} alt="林雨" size={40} />
<AvatarGroup members={members} label="课程成员" max={9} />
<AvatarGrid members={members} label="学习小组" />`}</pre>
        </Stack></details>
      </Stack>
    </main>
  </DensityProvider>;
}
