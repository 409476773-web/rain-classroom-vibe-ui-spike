import { forwardRef, type ComponentPropsWithoutRef, type CSSProperties, type ReactNode } from "react";
import { Avatar } from "../avatar/avatar";
import { Button } from "../button/button";
import { Checkbox, type CheckboxProps } from "../checkbox/checkbox";
import { IconButton, type IconButtonProps } from "../icon-button/icon-button";
import { Input, type InputProps } from "../input/input";
import { Tooltip } from "../tooltip/tooltip";
import { defineRainLocalRecipe } from "../recipes/local-recipe";
import { rainCn } from "../utils/rain-class-names";
import { ArrowDownIcon } from "../icons/arrow-down";
import { PasswordLockIcon } from "../icons/password-lock";
import { FileFormatPdfIcon } from "../icons/file-format-pdf";
import { FileFormatGenericIcon } from "../icons/file-format-generic";
import { FileFormatImagePngIcon } from "../icons/file-format-image-png";
import { FileFormatMarkdownIcon } from "../icons/file-format-markdown";
import { FileFormatTxtIcon } from "../icons/file-format-txt";
import { FileFormatDocxIcon } from "../icons/file-format-docx";
import { FileFormatXlsxIcon } from "../icons/file-format-xlsx";
import { FileFormatPptIcon } from "../icons/file-format-ppt";
import { FileFormatZipIcon } from "../icons/file-format-zip";
import { TableCell, TableHead } from "./table";
import "./table-cell-parts.css";

const actionRecipe = defineRainLocalRecipe({
  id: "table-cell-action", scope: "feature", origin: "ui-icon-button",
  classes: { root: "rain-table-cell-action", icon: "rain-table-cell-action-icon" },
  modifiedParts: ["root", "icon"], candidateTokens: [], promotionStatus: "proposed",
});
const selectionRecipe = defineRainLocalRecipe({
  id: "table-row-selection", scope: "feature", origin: "ui-checkbox",
  classes: { root: "rain-table-row-checkbox", control: "rain-table-row-checkbox-control" },
  modifiedParts: ["root", "control"], candidateTokens: [], promotionStatus: "proposed",
});

export type TableCellActionButtonProps = Omit<IconButtonProps, "size" | "localRecipe" | "aria-label" | "aria-labelledby" | "tone" | "highlight"> & {
  "aria-label": string;
  /** A short visible operation name. Keep the full context in aria-label. */
  tip: string;
};
export const TableCellActionButton = forwardRef<HTMLButtonElement, TableCellActionButtonProps>(function TableCellActionButton({tip, ...props}, ref) {
  return <Tooltip text={tip} portal><IconButton {...props} ref={ref} size="20/12" localRecipe={actionRecipe}/></Tooltip>;
});

type WithoutRecipe<T> = T extends unknown ? Omit<T,"localRecipe"> : never;
export type TableRowCheckboxProps = WithoutRecipe<CheckboxProps>;
export const TableRowCheckbox = forwardRef<HTMLInputElement, TableRowCheckboxProps>(function TableRowCheckbox(props, ref) {
  return <span className="rain-table-selection-action"><Checkbox {...props as CheckboxProps} ref={ref} localRecipe={selectionRecipe}/></span>;
});

export interface TableRowActionsProps extends ComponentPropsWithoutRef<"span"> {
  selection?: ReactNode;
  move?: ReactNode;
  add?: ReactNode;
}
/** Only place in the leading identity cell. Slots preserve selection → move → add order. */
export function TableRowActions({selection, move, add, className, ...props}: TableRowActionsProps) {
  return <span {...props} data-rain-id="ui-table-row-actions" data-slot="row-actions" className={rainCn("rain-table-row-actions", className)}>{selection}{move}{add}</span>;
}
export function TableCellActions({className, ...props}: ComponentPropsWithoutRef<"span">) {
  return <span {...props} data-slot="cell-actions" className={rainCn("rain-table-cell-actions",className)}/>;
}

export interface TableActionCellProps extends Omit<ComponentPropsWithoutRef<"td">,"align"> {
  active?: boolean;
  editing?: boolean;
  invalid?: boolean;
  identity?: boolean;
  depth?: number;
  /** Share this layout value with TableActionHeader; it is not a column width. */
  leadingSpace?: number;
  align?: "start" | "center" | "end";
  leading?: ReactNode;
  disclosure?: ReactNode;
  actions?: ReactNode;
  actionCount?: number;
  persistentActions?: boolean;
  onActivate?: () => void;
}
export const TableActionCell = forwardRef<HTMLTableCellElement, TableActionCellProps>(function TableActionCell({
  active, editing, invalid, identity, depth=0, leadingSpace=94, align="start", leading,
  disclosure, actions, actionCount=actions?1:0, persistentActions, onActivate, onClick, children, className, style, ...props
}, ref) {
  return <TableCell {...props} ref={ref} data-action-cell="" data-active={active || undefined}
    data-editing={editing || undefined} data-invalid={invalid || undefined} data-identity={identity || undefined}
    data-align={align} data-persistent-actions={persistentActions || undefined}
    className={rainCn("rain-table-action-cell", className)} style={{...style,
      "--rain-table-identity-space":`${leadingSpace + depth * 16}px`,
      "--rain-table-cell-action-space":`${actionCount > 0 ? 10 + actionCount * 22 : 16}px`,
    } as CSSProperties}
    onClick={event => {
      onClick?.(event);
      if (!event.defaultPrevented && !(event.target as HTMLElement).closest("button,input,label,textarea,select,a,[role=combobox],[data-slot=readonly-mark]")) onActivate?.();
    }}>
    {leading}
    <div data-slot="cell-value" className="rain-table-cell-value">
      {identity && <span data-slot="cell-disclosure" className="rain-table-cell-disclosure">{disclosure}</span>}
      {children}
    </div>
    {!editing && actions && <TableCellActions>{actions}</TableCellActions>}
  </TableCell>;
});

export interface TableActionHeaderProps extends ComponentPropsWithoutRef<typeof TableHead> {
  selection?: ReactNode;
  identity?: boolean;
  leadingSpace?: number;
}
export function TableActionHeader({selection,identity,leadingSpace=94,children,className,style,...props}: TableActionHeaderProps) {
  return <TableHead {...props} data-identity={identity || undefined} className={rainCn("rain-table-action-header",className)}
    style={{...style,"--rain-table-identity-space":`${leadingSpace}px`} as CSSProperties}>
    {selection && <span className="rain-table-header-selection">{selection}</span>}{children}
  </TableHead>;
}

export type TableDisclosureButtonProps = Omit<TableCellActionButtonProps,"icon"|"tip"|"aria-expanded"> & {expanded:boolean};
export const TableDisclosureButton = forwardRef<HTMLButtonElement,TableDisclosureButtonProps>(function TableDisclosureButton({expanded,className,...props},ref) {
  return <TableCellActionButton {...props} ref={ref} className={rainCn("rain-table-disclosure-button",className)}
    tip={expanded?"收起":"展开"} aria-expanded={expanded} icon={<ArrowDownIcon/>}/>;
});
export function TableReadonlyMark({reason}: {reason:string}) {
  return <Tooltip text="不可编辑" portal><span data-slot="readonly-mark" role="img" tabIndex={0}
    aria-label={`不可编辑：${reason}`} className="rain-table-readonly-mark"><PasswordLockIcon/></span></Tooltip>;
}

export const TableInlineInput = forwardRef<HTMLInputElement,InputProps>(function TableInlineInput({className,...props},ref) {
  return <div data-slot="cell-input" className={rainCn("rain-table-inline-input",className)}><Input {...props} ref={ref} clearable={false}/></div>;
});

export interface TableMediaItem { id: string; name: string; url: string; image?: boolean }
export interface TablePersonValueProps { name: string; src?: string; }
export function TablePersonValue({name,src}:TablePersonValueProps) {
  if (!name) return null;
  return <span data-slot="person-value" className="rain-table-person-value"><Avatar size={24} src={src} alt=""/><span>{name}</span></span>;
}
export function TableImageValue({images,onPreview}: {images:readonly TableMediaItem[];onPreview:(image:TableMediaItem)=>void}) {
  if (!images.length) return null;
  return <span data-slot="image-value" className="rain-table-image-value">{images.slice(0,2).map(file =>
    <Tooltip key={file.id} text={file.name} portal><button type="button" className="rain-table-image-thumb" aria-label={`预览${file.name}`} onClick={()=>onPreview(file)}><img src={file.url} alt=""/></button></Tooltip>)}
    {images.length>2 && <button type="button" className="rain-table-image-count" aria-label={`查看其余${images.length-2}张图片`} onClick={()=>onPreview(images[2]!)}>+{images.length-2}</button>}
  </span>;
}

export function TableFileName({name}: {name:string}) {
  const dot=name.lastIndexOf("."), split=dot>0;
  const extension=split?name.slice(dot+1).toLowerCase():"";
  const Icon = extension==="pdf"?FileFormatPdfIcon : extension==="png"?FileFormatImagePngIcon
    : extension==="md"?FileFormatMarkdownIcon : extension==="txt"?FileFormatTxtIcon
    : extension==="docx"?FileFormatDocxIcon : extension==="xlsx"?FileFormatXlsxIcon
    : extension==="pptx"||extension==="ppt"?FileFormatPptIcon : extension==="zip"?FileFormatZipIcon : FileFormatGenericIcon;
  return <span data-slot="file-name" className="rain-table-file-name"><Icon size={16}/><span className="rain-table-file-stem"><span>{split?name.slice(0,dot):name}</span>{split&&<span>{name.slice(dot)}</span>}</span></span>;
}
export function TableFileValue({files,onPreview,onManage}: {
  files:readonly TableMediaItem[];onPreview:(file:TableMediaItem)=>void;onManage:(origin:HTMLElement)=>void;
}) {
  if (!files.length) return null;
  return <span data-slot="file-value" className="rain-table-file-value" data-multiple={files.length>1||undefined}>
    <Tooltip text={files[0]!.name} portal><Button className="rain-table-file-trigger" variant="text" size="compact" aria-label={`预览${files[0]!.name}`} onClick={()=>onPreview(files[0]!)}><TableFileName name={files[0]!.name}/></Button></Tooltip>
    {files.length>1&&<button type="button" className="rain-table-file-count" aria-label={`查看其余${files.length-1}个附件`} onClick={event=>onManage(event.currentTarget)}>+{files.length-1}</button>}
  </span>;
}
export function TableDataValue({value,unit,emphasized=false}: {value:ReactNode;unit?:ReactNode;emphasized?:boolean}) {
  if (value===null||value===undefined||value==="") return null;
  return <span data-slot="data-value" className="rain-table-data-value"><span data-slot="value" data-emphasized={emphasized||undefined}>{value}</span>{unit&&<span data-slot="unit">{unit}</span>}</span>;
}
