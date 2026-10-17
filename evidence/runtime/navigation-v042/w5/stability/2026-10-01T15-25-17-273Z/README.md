# 最终冻结 S4 自然连续帧稳定性

原尺寸1440×800，中性pointer，连续五帧，没有mask或容差修改。首帧与后帧9个圆角像素最大±1差保留，frame2–5自然同字节，最终pair4/5。computed/geometry/focus/hover指纹与采集源码SHA前后均稳定，page/console error0。完整原始帧、哈希和state记录见 stability-report.json。该稳定对仅作为采集稳定性补充，Human视觉验收仍待评审。
