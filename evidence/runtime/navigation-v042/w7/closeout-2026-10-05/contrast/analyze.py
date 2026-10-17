"""Analyze isolated rendered background pixels and explicit CSS foregrounds.

No product file is written. No contrast exception is inferred from visual approval.
"""
from pathlib import Path
import json
from collections import Counter, defaultdict
from hashlib import sha256
from math import floor, ceil
import re
from PIL import Image

OUT = Path(__file__).resolve().parent

def over(fg, bg):
    a = fg[3] + bg[3] * (1 - fg[3])
    if not a:
        return [0, 0, 0, 0]
    return [(fg[i] * fg[3] + bg[i] * bg[3] * (1 - fg[3])) / a for i in range(3)] + [a]

def path_paint(sample, text):
    layer = sample['foreground'][:] if text else [0, 0, 0, 0]
    for ancestor in reversed(sample['ancestors']):
        layer = over(layer, ancestor['background'])
        layer[3] *= ancestor['opacity']
    return over(layer, [255, 255, 255, 1])

def luminance(color):
    vals = [v / 255 for v in color[:3]]
    vals = [v / 12.92 if v <= .04045 else ((v + .055) / 1.055) ** 2.4 for v in vals]
    return sum(a*b for a, b in zip(vals, [.2126, .7152, .0722]))

def ratio(fg, bg):
    a, b = sorted([luminance(fg), luminance(bg)])
    return (b + .05) / (a + .05)

def sample_pixels(image, rects):
    pixels = Counter()
    bounds = []
    for rect in rects:
        # Preserve two px clear of line bounds, control outlines and edge antialiasing.
        x0, y0 = max(0, ceil(rect['x'] + 2)), max(0, ceil(rect['y'] + 2))
        x1, y1 = min(image.width, floor(rect['x'] + rect['width'] - 2)), min(image.height, floor(rect['y'] + rect['height'] - 2))
        if x1 <= x0 or y1 <= y0:
            continue
        bounds.append([x0, y0, x1, y1])
        for y in range(y0, y1):
            for x in range(x0, x1):
                pixels[image.getpixel((x, y))[:3]] += 1
    return pixels, bounds

def evaluate(sample, image):
    selector=sample['selector'];text=sample['text']
    role_refinement=None
    if any(x in selector for x in ['w6-replay-chapter-number','w6-grade-criteria']) and re.fullmatch(r'\d{2}',text):
        role_refinement=('auxiliary-metadata','Sequence number supplements the separately measured action/criterion label.')
    elif any(x in selector for x in ['w6-activity-category-heading','w6-group-heading > span','w6-members-heading > span']):
        if sample['role']=='main-task':role_refinement=('auxiliary-metadata','Passive category description or total member count, distinct from selectable object label/current score.')
    elif 'w6-feedback-heading' in selector and ' > span' in selector and text=='仅当前小组':
        role_refinement=('current-identity','Feedback scope binds editing to current group.')
    elif 'w6-grade-question-line' in selector and 'rain-tag' in selector:
        role_refinement=('current-identity','Current question badge identifies the grading object.')
    elif 'w6-replay-current-chapter' in selector or 'workspace-groups > header.w6-panel-heading > p' in selector or 'w6-grade-score-heading > span' in selector:
        role_refinement=('current-identity','Current selected activity/chapter label binds visible task content.')
    elif text in ['模拟作答','关联到课堂章节'] or ('w6-replay-section-title' in selector and ' > span' in selector):
        role_refinement=('auxiliary-metadata','Simulation/category/association descriptor supplements independently measured task heading.')
    elif 'w6-replay-time' in selector and text.startswith('/'):
        role_refinement=('auxiliary-metadata','Duration supplements independently measured current playback position.')
    elif 'w6-interaction-kicker' in selector and 'w6-inline-facts > span:nth-of-type(2)' in selector:
        role_refinement=('status-action','Every text node of current grade belongs to grade status, including its numeric value/unit.')
    if role_refinement and sample['role']!='disabled':
        sample['capturedRole']=sample['role'];sample['role'],sample['basis']=role_refinement
    # State badges inside a current-identity header still express status.
    # Keep captured role for provenance; refine semantics without recapturing pixels.
    if sample['role']!='disabled' and re.match(r'^(待批改|本页已|未保存|已提交|已投票|待评审|保存|尚未保存|未编辑)',sample['text']):
        sample['capturedRole']=sample['role']
        sample['role']='status-action'
        sample['basis']='Task status badge/outcome takes priority over containing identity header.'
    bg_css = path_paint(sample, False)
    fg_css = path_paint(sample, True)
    pixels, bounds = sample_pixels(image, sample['rects'])
    sample['backgroundPixelSampling'] = {'bounds': bounds, 'count': sum(pixels.values()),
        'uniqueColors':len(pixels),'dominant': [{'rgb':list(c),'count':n} for c,n in pixels.most_common(4)]}
    failures = []
    if sample['overlapping']:
        failures.append('Text range partially/fully occluded by another element at visible-range grid hit tests.')
    if not pixels:
        failures.append('No clear interior pixels available in visible text range.')
    if any(a['filter'] != 'none' or a['backdropFilter'] != 'none' or a['mixBlendMode'] != 'normal' for a in sample['ancestors']):
        failures.append('Filter/backdrop/blend painting cannot be represented by simple color composition.')
    if sample['textShadow'] != 'none' or float(sample['textStroke'].removesuffix('px') or 0) != 0:
        failures.append('Text shadow/stroke requires glyph paint analysis.')
    opacity = any(a['opacity'] != 1 for a in sample['ancestors'])
    image_paint = any(a['backgroundImage'] != 'none' for a in sample['ancestors'])
    opacity_index=next((i for i,a in enumerate(sample['ancestors']) if a['opacity']!=1),None)
    transparent_opacity_group=opacity and all(a['background'][3]==0 and a['backgroundImage']=='none' for a in sample['ancestors'][opacity_index:])
    if opacity and image_paint and not transparent_opacity_group:
        failures.append('Background image plus group opacity: inner pre-composite color cannot be reconstructed precisely.')
    matching = sum(n for color,n in pixels.items() if max(abs(color[i]-bg_css[i]) for i in range(3)) <= 1.5)
    match_fraction = matching / max(1, sum(pixels.values()))
    sample['cssPaintEstimate'] = {'background':bg_css,'foreground':fg_css,
        'backgroundPixelMatchFraction':round(match_fraction,6),'groupOpacityPresent':opacity,
        'foregroundAlphaPresent':sample['foreground'][3] != 1,'backgroundAlphaPresent':any(0 < a['background'][3] < 1 for a in sample['ancestors'])}
    if opacity and match_fraction < .995 and not transparent_opacity_group:
        failures.append('Group opacity and actual pixel background disagree with solid ancestry model.')
    if failures:
        sample.update({'measurement':'unverified','unverifiedReasons':failures,'ratio':None,'thresholdResult':'unverified'})
        return sample
    if transparent_opacity_group and match_fraction < .995:
        foreground=sample['foreground'][:]
        for ancestor in sample['ancestors']:foreground[3]*=ancestor['opacity']
        ratios=[(ratio(over(foreground,list(color)+[1]),color),color) for color in pixels]
        value,bg=min(ratios)
        sample.update({'measurement':'transparent-group-opacity-with-rendered-background',
            'background':list(bg)+[1],'compositedForeground':over(foreground,list(bg)+[1]),
            'ratio':round(value,4),'ratioRange':[round(value,4),round(max(x[0] for x in ratios),4)],
            'complexBackgroundBasis':'Every ancestor at/below outermost opacity group has transparent background and no background image; text alpha is multiplied by opacity groups and composed against actual sampled pixels.'})
    elif opacity or (match_fraction >= .995 and not image_paint):
        value = ratio(fg_css,bg_css)
        sample.update({'measurement':'solid-alpha-group-composition-pixel-crosschecked' if opacity else 'solid-alpha-composition-pixel-crosschecked',
            'background':bg_css,'compositedForeground':fg_css,'ratio':round(value,4),'ratioRange':[round(value,4),round(value,4)]})
    else:
        ratios = [(ratio(over(sample['foreground'], list(color)+[1]),color),color) for color in pixels]
        value,bg = min(ratios)
        sample.update({'measurement':'rendered-complex-background-pixels-with-css-foreground',
            'background':list(bg)+[1],'compositedForeground':over(sample['foreground'],list(bg)+[1]),
            'ratio':round(value,4),'ratioRange':[round(value,4),round(max(x[0] for x in ratios),4)],
            'complexBackgroundBasis':'Actual background-only screenshot includes SVG/gradient/image/sibling paints; conservatively samples all interior text-range pixels, not glyph antialiasing.'})
    # No epsilon tolerance turns a below-threshold result into a pass.
    sample['thresholdResult'] = 'inactive-control-recorded-no-conformance-claim' if sample['role']=='disabled' else ('at-or-above-text-threshold' if value >= sample['required'] else 'below-text-threshold')
    return sample

def aggregate(samples):
    measured = [s for s in samples if s['ratio'] is not None]
    active = [s for s in measured if s['role'] != 'disabled']
    return {'samples':len(samples),'measured':len(measured),'unverified':len(samples)-len(measured),
        'activeTextBelowThreshold':sum(s['thresholdResult']=='below-text-threshold' for s in active),
        'activeTextAtOrAboveThreshold':sum(s['thresholdResult']=='at-or-above-text-threshold' for s in active),
        'disabledRecordedWithoutConformanceClaim':sum(s['role']=='disabled' for s in measured),
        'minimumMeasuredRatio':round(min((s['ratio'] for s in measured),default=0),4),
        'measurements':dict(Counter(s['measurement'] for s in samples)),
        'groupOpacityMeasured':sum(s['cssPaintEstimate']['groupOpacityPresent'] for s in measured),
        'alphaBackgroundMeasured':sum(s['cssPaintEstimate']['backgroundAlphaPresent'] for s in measured),
        'alphaForegroundMeasured':sum(s['cssPaintEstimate']['foregroundAlphaPresent'] for s in measured)}

def reading_body(sample):
    s=sample['selector']
    return (('w6-submission-viewpoint' in s and ' > p' in s)
        or ('w6-submission-evidence' in s and ' > dd' in s)
        or ('section.w6-grade-prompt' in s and ' > p' in s)
        or ('section.w6-grade-answer' in s and ' > p' in s)
        or ('w6-review-document' in s and ' > p' in s)
        or ('w6-replay-transcript' in s and any(x in s for x in [' > blockquote','p.w6-replay-transcript-detail','w6-replay-takeaway > p']))
        or 'p.w6-reading' in s)

def self_check():
    assert abs(ratio([0,0,0,1],[255,255,255,1])-21)<1e-8
    assert abs(ratio([255,255,255,1],[255,255,255,1])-1)<1e-8
    sample={'foreground':[0,0,0,1],'ancestors':[{'background':[255,255,255,1],'opacity':1},{'background':[255,255,255,1],'opacity':.5}]}
    assert path_paint(sample,True)==[127.5,127.5,127.5,1]
    assert path_paint(sample,False)==[255,255,255,1]
    sample['ancestors'][1]['background']=[0,0,0,1]
    sample['foreground']=[255,255,255,1]
    assert path_paint(sample,True)==[255,255,255,1]
    assert path_paint(sample,False)==[127.5,127.5,127.5,1]
    print('Compositor self-check: black/white21, equal1, nested group opacity passed.')

if __name__=='__main__':
    self_check()
    report=json.loads((OUT/'capture-report.json').read_text())
    all_samples=[];diagnostic_samples=[];by_scene=defaultdict(list)
    for case in report['cases']:
        facts=json.loads((OUT/case['file']).read_text())
        image=Image.open(OUT/case['background']).convert('RGBA')
        facts['samples']=[evaluate(s,image) for s in facts['samples']]
        facts['summary']=aggregate(facts['samples'])
        for s in facts['samples']:s.update({'caseId':case['id'],'scene':case['scene'],'state':case['state'],'diagnostic':case['diagnostic']})
        (OUT/'cases'/f"{case['id']}-analysis.json").write_text(json.dumps(facts,ensure_ascii=False,indent=2)+'\n')
        case['analysis']=f"cases/{case['id']}-analysis.json";case['summary']=facts['summary']
        if case['diagnostic']:diagnostic_samples+=facts['samples']
        else:
            all_samples+=facts['samples'];by_scene[case['scene']]+=facts['samples']
        print(case['id'],json.dumps(facts['summary'],ensure_ascii=False))
    report['method']={'foreground':'Computed CSS foreground resolved through canvas, including alpha. Text shadows/strokes/filters/blends excluded.',
        'background':'Actual DPR1 background-only PNG, created by transient browser-only text-color masking that preserves element geometry. Original render also retained.',
        'solid':'Premultiplied source-over group composition models every ancestor background and opacity; compared with >=99.5% interior screenshot pixels within1.5 RGB channel units.',
        'complex':'With no group opacity, un-antialiased CSS foreground is composed against every sampled RGB background inside visible text rectangles; report minimum conservative ratio. Transparent opacity groups without inner background/image paint allow foreground alpha multiplied by group opacity against actual background pixels.',
        'limits':'Alpha is browser-canvas8bit resolved; subpixel edges excluded by2px inset. Unresolvable complex + opacity, partially occluded range grid, shadows/filters remain unverified. No glyph antialias ratio or complete a11y assertion.',
        'criteria':'Text minimum4.5; large24px or18.6667px700 weight minimum3. Disabled ratios recorded without conformance pass. Pale auxiliary text stays subject to measured threshold; visual preference is not an exception.'}
    report['overall']=aggregate(all_samples)
    report['byRole']={role:aggregate([s for s in all_samples if s['role']==role]) for role in report['roles'] if role!='decorative-excluded'}
    report['byScene']={scene:aggregate(samples) for scene,samples in by_scene.items()}
    report['readingBodySubset']={'basis':'Explicit answer, prompt, submission claim/evidence, review document body, replay transcript/detail/takeaway and E5 reading paragraphs; excludes metadata, navigation labels, badges and field placeholders.',
        **aggregate([s for s in all_samples if reading_body(s)]),
        'unverifiedSamples':[s for s in all_samples if reading_body(s) and s['measurement']=='unverified']}
    report['diagnosticOnly']=aggregate(diagnostic_samples)
    report['backgroundImageSampleCount']=sum(any(a['backgroundImage']!='none' for a in s['ancestors']) for s in all_samples)
    report['sourceAndArchiveIntegrity']='passed' if not report['protection']['runtimeChanges'] and not report['protection']['archiveChanges'] and report['protection']['archivesMatchRecorded'] else 'failed'
    report['contrastOutcome']='measured-deficits-remain-no-conformance-or-human-acceptance' if report['overall']['activeTextBelowThreshold'] or report['overall']['unverified'] else 'sampled-text-thresholds-only-not-full-a11y'
    below=[s for s in all_samples if s['thresholdResult']=='below-text-threshold']
    unique={}
    for s in sorted(below,key=lambda s:s['ratio']):
        key=(s['scene'],s['role'],s['text'],s['color'],tuple(round(x) for x in s['background'][:3]))
        if key not in unique:unique[key]=s
    report['uniqueBelowThresholdCount']=len(unique)
    report['examplesByRole']={role:[s for s in unique.values() if s['role']==role][:8] for role in report['roles'] if role!='decorative-excluded'}
    report['unverifiedSamples']=[s for s in all_samples if s['measurement']=='unverified']
    report['evidenceHashes']={p.relative_to(OUT).as_posix():sha256(p.read_bytes()).hexdigest() for p in OUT.glob('cases/*')}
    (OUT/'contrast-audit.json').write_text(json.dumps(report,ensure_ascii=False,indent=2)+'\n')
    lines=['# W7 review02 对比度差额取样','',
        f"快照：`{report['snapshotId']}`。本记录只增加审计证据，产品源码、CSS、Token 和两份 review02 ZIP 均不修改。",'',
        f"真实浅色消费页：12 个初始布局（E1–E6 ×1200/1440×900），另有 {sum(not c['diagnostic'] for c in report['cases'])-12} 个1440关键状态；1个既有 dark Token 诊断样本单独统计，不代表 W6 提供逆色产品主题。",'',
        '角色按真实任务用途分类。当前身份、队列进度、保存结果和可用动作不因字体小或颜色浅被归为可忽略辅助信息。',
        '用户明确要求 E1 辅助小字很浅、使用竖向分隔。此偏好作用于被标明的被动范围描述/人数/学期/说明；不构成对比度阈值例外，也不推广到学生/资料身份、状态或操作。','',
        '| 角色 | 已测 | 未验证 | 低于文字阈值 | 最小比值 |','|---|---:|---:|---:|---:|']
    role_names={'main-task':'主任务文字','current-identity':'当前身份','status-action':'状态与动作','auxiliary-metadata':'辅助元信息','form-guidance':'表单提示','disabled':'禁用控件'}
    for role,a in report['byRole'].items():lines.append(f"| {role_names[role]} | {a['measured']} | {a['unverified']} | {a['activeTextBelowThreshold'] if role!='disabled' else '不作通过判断'} | {a['minimumMeasuredRatio']}:1 |")
    lines+=['','同一文字在不同宽度与状态重复计数；不是不同缺陷数。完整选择器、字重/字号、角色理由、背景像素与阈值结果见每个 `cases/*-analysis.json`。','',
        f"独立正文子集：{report['readingBodySubset']['measured']} 个已测、{report['readingBodySubset']['unverified']} 个未验证、{report['readingBodySubset']['activeTextBelowThreshold']} 个低于阈值，已测最小 {report['readingBodySubset']['minimumMeasuredRatio']}:1。主任务标签/资料类型/变量标签/满分约束仍有低值，不能将正文子集的结果推广为主任务信息整体通过。",'',
        f"测得透明背景样本 {report['overall']['alphaBackgroundMeasured']}；父级 opacity 可精确合成并通过实际背景像素交叉检查的样本 {report['overall']['groupOpacityMeasured']}；复杂背景像素取样 {report['overall']['measurements'].get('rendered-complex-background-pixels-with-css-foreground',0)}。",'',
        f"本轮真实样本中背景图/渐变祖先为 {report['backgroundImageSampleCount']} 个；复杂背景差额主要来自既有 SVG 连接曲面/页签及多层绘制。处理方法支持的背景图/渐变情况不能因此被表述为本轮已验证。透明 opacity 组与复杂背景可确定的 {report['overall']['measurements'].get('transparent-group-opacity-with-rendered-background',0)} 个样本单独标注。",'',
        '方法：保留原始渲染截图，在隔离浏览器中临时隐藏文字颜色（几何保持），取得真实背景 PNG。纯色/alpha/父 opacity 用逐层 source-over 合成并与像素交叉检查；没有父 opacity 的 SVG/渐变/图像背景，以文字矩形内部所有像素的最小比值作保守记录。文字前景取 CSS 颜色，避免把抗锯齿边缘误当规定前景。','',
        '以下是仍低于阈值的代表样本，保留原样；没有据此更改已接受的视觉。','']
    for role,examples in report['examplesByRole'].items():
        if not examples:continue
        lines.append(f"**{role_names[role]}**")
        lines.append('')
        for s in examples[:4]:lines.append(f"- {s['caseId']}：{s['text'][:80]} — {s['ratio']}:1（要求{s['required']}:1）；{s['basis']}")
        lines.append('')
    lines+=['未验证项：非文本对比度（边框、图标、滑块、焦点、分隔线、头像），完整 hover/focus/error 状态、离屏/裁切内容、真实 Safari、VoiceOver、Windows、完整多浏览器无障碍审计。复杂背景同时有组透明度、遮挡、阴影/滤镜等无法精确确定的样本明确列未验证。','',
        f"此次真实页面文字结果：`{report['contrastOutcome']}`。视觉人工确认和可运行检查均不替代完整对比度合规。",'',
        '保护记录：`protection-before.json` 与 `protection-after.json`；两份 ZIP 实测 SHA 一致且匹配既有档案。原97项冻结中两份 AI 指南由父代理按已确认设计经验合法回流；冻结及ZIP本身保持历史状态，另列产品运行源保护。','',
        '实际执行及日志：`commands.json`、`capture.log`、`analyze.log`。`capture.mjs` 与 `analyze.py` 位于本证据目录，使用既有 Playwright/Pillow，无新增依赖或联网。','']
    (OUT/'README.md').write_text('\n'.join(lines))
    print('Final:',json.dumps({'cases':len(report['cases']),'overall':report['overall'],'byRole':report['byRole'],'sourceAndArchiveIntegrity':report['sourceAndArchiveIntegrity']},ensure_ascii=False))
