import { useState } from "react";
import { createRoot } from "react-dom/client";
import { Button, Drawer, DrawerBody, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@rain-next/ui";
import "@rain-next/foundations/tokens.css";
import "@rain-next/foundations/typography.css";
import "@rain-next/foundations/focus.css";
import "@rain-next/ui/styles.css";
import "./styles.css";
function SnapCase({ direction, handle }: { direction: "up" | "down"; handle: boolean }) {
  const [snap, setSnap] = useState<number | string | null>(0.5);
  const label = `${direction === "up" ? "顶部" : "底部"}${handle ? "带把手" : "无把手"}`;
  return <Drawer swipeDirection={direction} showSwipeHandle={handle} snapPoints={[0.5, 0.85]} snapPoint={snap} onSnapPointChange={setSnap}>
    <DrawerTrigger render={<Button>{label}</Button>} />
    <DrawerContent><DrawerHeader><DrawerTitle>{label}</DrawerTitle><Button variant="text" onClick={() => setSnap(snap === 0.5 ? 0.85 : 0.5)}>切换吸附位置</Button></DrawerHeader>
      <DrawerBody>{Array.from({ length: 30 }, (_, index) => <p key={index}>第{index + 1}段：阅读区域独立滚动。</p>)}</DrawerBody>
      <DrawerFooter><DrawerClose render={<Button>关闭测试抽屉</Button>} /></DrawerFooter>
    </DrawerContent>
  </Drawer>;
}
createRoot(document.getElementById("root")!).render(<>{(["up", "down"] as const).flatMap(direction => [true, false].map(handle => <SnapCase key={`${direction}-${handle}`} direction={direction} handle={handle} />))}</>);
