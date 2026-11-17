import { useEffect, useRef, useState, type ComponentProps, type ReactNode } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerBody, DrawerFooter, IconButton, Popover, Tooltip } from "@rain-next/ui";
import { CloseIcon } from "@rain-next/ui/icons/close";
import { DownloadIcon } from "@rain-next/ui/icons/download";
import { FileIcon } from "@rain-next/ui/icons/file";
import { ArrowLeftIcon } from "@rain-next/ui/icons/arrow-left";
import { ArrowRightIcon } from "@rain-next/ui/icons/arrow-right";
import type { TableMediaItem } from "@rain-next/ui";
import "./table-cell-overlays.css";

export interface TableCellPopoverProps {
  open: boolean;
  title: string;
  description?: string;
  anchor: HTMLElement | null;
  width?: number;
  initialFocus?: ComponentProps<typeof Popover.Content>["initialFocus"];
  finalFocus?: ComponentProps<typeof Popover.Content>["finalFocus"];
  onOpenChange: ComponentProps<typeof Popover.Root>["onOpenChange"];
  onClose: () => void;
  closeTip?: string;
  children: ReactNode;
  footer?: ReactNode;
}
/** A nonmodal, anchored short task. The host decides apply/cancel from the close reason. */
export function TableCellPopover({open,title,description,anchor,width=360,initialFocus,finalFocus,onOpenChange,onClose,closeTip="关闭",children,footer}:TableCellPopoverProps) {
  return <Popover.Root open={open} modal={false} onOpenChange={onOpenChange}>
    <Popover.Content className="rt-cell-popover" width={width} positionerProps={{anchor,align:"end",side:"bottom",sideOffset:8,collisionPadding:12}} initialFocus={initialFocus} finalFocus={finalFocus}>
      <div className="rt-cell-popover-head"><div><Popover.Title>{title}</Popover.Title>{description&&<Popover.Description title={description}>{description}</Popover.Description>}</div>
        <Tooltip text={closeTip} portal><IconButton size="24/14" aria-label={`${closeTip}${title}`} icon={<CloseIcon/>} onClick={onClose}/></Tooltip>
      </div>
      {children}
      {footer&&<div className="rt-cell-popover-footer">{footer}</div>}
    </Popover.Content>
  </Popover.Root>;
}

export interface TablePreviewDrawerProps {
  open: boolean;
  items: readonly TableMediaItem[];
  selectedId?: string;
  collection: "images" | "files";
  description?: string;
  finalFocus?: ComponentProps<typeof DrawerContent>["finalFocus"];
  onClose: () => void;
  onSelect: (file: TableMediaItem) => void;
}
/** Preview only. Host supplies one field's collection and enforces its access/download policy. */
export function TablePreviewDrawer({open,items,selectedId,collection,description,finalFocus,onClose,onSelect}:TablePreviewDrawerProps) {
  const [narrow,setNarrow]=useState(()=>typeof window!=="undefined"&&typeof window.matchMedia==="function"&&window.matchMedia("(max-width:640px)").matches);
  const [failed,setFailed]=useState(false),closeRef=useRef<HTMLButtonElement>(null);
  const file=items.find(item=>item.id===selectedId);
  const remembered=useRef<{items:readonly TableMediaItem[];file:TableMediaItem;collection:"images"|"files";description?:string}|null>(null);
  if(open&&file)remembered.current={items,file,collection,description};
  const context=open&&file?{items,file,collection,description}:remembered.current;
  useEffect(()=>{if(typeof window.matchMedia!=="function")return;const query=window.matchMedia("(max-width:640px)");const sync=()=>setNarrow(query.matches);query.addEventListener("change",sync);return()=>query.removeEventListener("change",sync);},[]);
  useEffect(()=>setFailed(false),[file?.id,file?.url]);
  const index=context?.items.findIndex(item=>item.id===context.file.id)??-1;
  const images=context?.collection==="images";
  return <Drawer open={open&&!!file} modal={narrow?"trap-focus":false} swipeDirection="right" disablePointerDismissal onOpenChange={value=>{if(!value)onClose();}}>
    <DrawerContent className="rt-cell-preview" initialFocus={closeRef} finalFocus={finalFocus} data-base-ui-swipe-ignore>
      <DrawerHeader className="rt-cell-preview-head"><div><DrawerTitle title={context?.file.name}>{context?.file.name??"预览"}</DrawerTitle>{context?.description&&<DrawerDescription title={context.description}>{context.description}</DrawerDescription>}</div>
        <div className="rt-cell-preview-tools">{context&&<Tooltip text="下载" portal><a className="rt-cell-preview-download" href={context.file.url} download={context.file.name} aria-label={`下载${context.file.name}`}><DownloadIcon/></a></Tooltip>}
          <Tooltip text="关闭" portal><IconButton ref={closeRef} size="32/16" aria-label="关闭预览" icon={<CloseIcon/>} onClick={onClose}/></Tooltip>
        </div>
      </DrawerHeader>
      <DrawerBody className="rt-cell-preview-body" data-base-ui-swipe-ignore>{context&&<div className="rt-cell-preview-stage">{
        (images||context.file.image)&&!failed?<img key={context.file.url} src={context.file.url} alt={context.file.name} onError={()=>setFailed(true)}/>
        : /\.pdf$/i.test(context.file.name)?<iframe key={context.file.url} title={`预览${context.file.name}`} src={context.file.url}/>
        : <div className="rt-cell-preview-unavailable"><FileIcon/><p>{failed?"图片加载失败":"此文件暂不支持直接预览"}</p><span>可下载文件后查看。</span></div>
      }</div>}</DrawerBody>
      <DrawerFooter className="rt-cell-preview-footer"><span aria-live="polite">{index+1} / {context?.items.length??0} {images?"张图片":"个附件"}</span><div>
        <Tooltip text={images?"上一张":"上一个"} portal><IconButton size="28/16" aria-label={images?"上一张图片":"上一个附件"} icon={<ArrowLeftIcon/>} disabled={index<=0} onClick={()=>{const next=context?.items[index-1];if(next)onSelect(next);}}/></Tooltip>
        <Tooltip text={images?"下一张":"下一个"} portal><IconButton size="28/16" aria-label={images?"下一张图片":"下一个附件"} icon={<ArrowRightIcon/>} disabled={index<0||index>=(context?.items.length??0)-1} onClick={()=>{const next=context?.items[index+1];if(next)onSelect(next);}}/></Tooltip>
      </div></DrawerFooter>
    </DrawerContent>
  </Drawer>;
}
