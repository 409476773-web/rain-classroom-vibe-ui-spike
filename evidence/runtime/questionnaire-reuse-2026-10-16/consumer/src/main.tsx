import { createRoot } from "react-dom/client";
import { createRef } from "react";
import { Questionnaire, QuestionnaireItem, QuestionnaireTitle, QuestionnaireChoices, QuestionnaireChoice, QuestionnaireInput, QuestionnaireSubmit, Radio, Checkbox, RadioCard, CheckboxCard, DropdownMenu, Input, FormItem, type QuestionnaireRecipe } from "@rain-next/ui";
import "./styles.css";
const recipe: QuestionnaireRecipe = {id:"consumer-field",origin:"ui-questionnaire",scope:"feature",classes:{"input-wrapper":"w-full"},modifiedParts:["input-wrapper"],candidateTokens:[],promotionStatus:"not-proposed"};
const labelRef=createRef<HTMLLabelElement>(), inputRef=createRef<HTMLInputElement>();
type PublicExports=typeof import("@rain-next/ui");
// @ts-expect-error Internal presentation must remain absent from the public barrel.
type PrivateSurface=PublicExports["SelectionControlSurface"];
createRoot(document.getElementById("root")!).render(<main style={{padding:24,display:"grid",gap:16,maxWidth:640}}><h1>Questionnaire 独立消费</h1>
<Questionnaire aria-label="独立反馈" items={[{name:"goal",choices:[{value:"review"}]}]} localRecipe={recipe} onSubmit={e=>e.preventDefault()}>
<QuestionnaireItem name="goal"><QuestionnaireTitle>学习目标</QuestionnaireTitle><QuestionnaireChoices><QuestionnaireChoice ref={labelRef} value="review">复习</QuestionnaireChoice><QuestionnaireInput ref={inputRef} aria-label="其他目标" size={20} maxLength={120} /></QuestionnaireChoices></QuestionnaireItem><QuestionnaireSubmit />
</Questionnaire><Radio name="original" value="one" label="普通单选" checked={false} onCheckedChange={()=>{}}/><Checkbox label="普通多选"/><RadioCard name="card" value="one" label="单选卡片" checked={false} onCheckedChange={()=>{}}/><CheckboxCard label="多选卡片"/>
<FormItem label="原有输入"><Input defaultValue="课堂" clearable maxLength={8} /></FormItem>
<DropdownMenu.Root><DropdownMenu.Trigger>显示方式</DropdownMenu.Trigger><DropdownMenu.Content><DropdownMenu.CheckboxItem label="显示说明" defaultChecked /></DropdownMenu.Content></DropdownMenu.Root>
</main>);
