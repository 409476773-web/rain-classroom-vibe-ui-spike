import * as React from "react";
import { Questionnaire as Primitive } from "@shadcn/react/questionnaire";
import { SelectionControlSurface } from "../selection-control/selection-control";
import { CardSurface } from "../selection-card/selection-card.parts";
import { rainCn } from "../utils/rain-class-names";
import { renderQuestionnaireControl } from "./questionnaire-render";

type ChoiceProps = React.ComponentProps<typeof Primitive.Choice>;
type ChoiceState = { checked: boolean; disabled: boolean; invalid: boolean; shortcut: string | null; type: "checkbox" | "radio" };
function ChoiceSurface({ render, state, ...props }: React.ComponentPropsWithRef<"label"> & { render?: ChoiceProps["render"]; state: ChoiceState }) {
  return renderQuestionnaireControl({ ...props, className: rainCn("rain-selection-card rain-selection-card__selection w-full", props.className) }, state, render, <CardSurface as="label" />);
}

/** The engine owns selection; the shared surface only renders its native answer input. */
export function QuestionnaireChoiceAdapter({ children, render, ...props }: ChoiceProps) {
  return <Primitive.Choice {...props} render={(nativeProps, state) => <SelectionControlSurface
    state={{ kind: state.type, checked: state.checked, disabled: state.disabled, invalid: state.invalid }}
    labelProps={{ "data-rain-id": undefined, "data-disabled": undefined, ...nativeProps }}
    input={<Primitive.ChoiceInput data-slot="choice-input" data-focus="control" className="rain-questionnaire__choice-input sr-only" />}
    renderLabel={labelProps => <ChoiceSurface {...labelProps} state={state} render={render} />}
    trailing={<Primitive.ChoiceShortcut data-slot="choice-shortcut" className="rain-questionnaire__choice-shortcut" />}>
    <Primitive.ChoiceLabel data-slot="choice-label" className="rain-questionnaire__choice-label flex min-w-0 flex-1 flex-col">{children}</Primitive.ChoiceLabel>
  </SelectionControlSurface>} />;
}
