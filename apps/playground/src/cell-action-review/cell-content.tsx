import { Avatar, avatarAssets, DropdownMenu, TableCellActionButton, TablePersonValue, TableImageValue, TableFileValue } from "@rain-next/ui";
import { ArrowDownIcon } from "@rain-next/ui/icons/arrow-down";
import type { ReviewMedia } from "./flow-panels";

const people = [
  { name: "林知夏", src: avatarAssets["student-01"] },
  { name: "陈予安", src: avatarAssets["student-02"] },
  { name: "许清和", src: avatarAssets["student-03"] },
];
/** Host-owned options; the public value part does not prescribe people or selection policy. */
export function OwnerPicker({name,value,onChange}:{name:string;value:string;onChange:(value:string)=>void}) {
  return <DropdownMenu.Root>
    <DropdownMenu.Trigger className="ca-owner-trigger" aria-label={`${name}负责人：${value}`}>
      <TablePersonValue name={value} src={people.find(person=>person.name===value)?.src}/>
    </DropdownMenu.Trigger>
    <span className="ca-owner-actions"><DropdownMenu.Trigger render={<TableCellActionButton tip="选择" aria-label={`选择${name}负责人`} icon={<ArrowDownIcon/>}/>}/></span>
    <DropdownMenu.Content width={200}><DropdownMenu.RadioGroup aria-label="负责人" value={value} onValueChange={onChange}>
      {people.map(person=><DropdownMenu.RadioItem key={person.name} value={person.name} label={person.name} leading={<Avatar size={24} src={person.src} alt=""/>}/>)}
    </DropdownMenu.RadioGroup></DropdownMenu.Content>
  </DropdownMenu.Root>;
}
export function OwnerChoices({onSelect}:{onSelect:(name:string)=>void}) {
  return <>{people.map(person=><DropdownMenu.Item key={person.name} label={person.name} leading={<Avatar size={24} src={person.src} alt=""/>} onClick={()=>onSelect(person.name)}/>)}</>;
}
export function MediaCell({files,kind,onPreview,onManage}:{kind:"media"|"attachments";files:ReviewMedia[];onPreview:(file:ReviewMedia)=>void;onManage:(origin:HTMLElement)=>void}) {
  return kind==="media"?<TableImageValue images={files} onPreview={onPreview}/>:<TableFileValue files={files} onPreview={onPreview} onManage={onManage}/>;
}
