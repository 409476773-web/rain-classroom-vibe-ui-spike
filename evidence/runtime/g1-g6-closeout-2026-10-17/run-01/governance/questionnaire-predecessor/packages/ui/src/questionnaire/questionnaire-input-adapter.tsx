import * as React from "react";
import { Questionnaire as Primitive } from "@shadcn/react/questionnaire";
import { useDensity } from "@rain-next/foundations";
import { fieldFrameRecipe } from "../field/field.styles";
import { inputControlClassName, inputSizeClassName } from "../input/input.styles";
import { rainCn } from "../utils/rain-class-names";
import { renderQuestionnaireControl } from "./questionnaire-render";

type InputProps = React.ComponentProps<typeof Primitive.Input>;
type InputState = { disabled: boolean; filled: boolean; invalid: boolean };

function InputSurface({ state, render, wrapperClassName, ...props }: React.ComponentPropsWithRef<"input"> & {
  state: InputState;
  render?: InputProps["render"];
  wrapperClassName?: string;
}) {
  const density = useDensity();
  const size = density === "compact" ? 28 : 32;
  const permission = state.disabled ? "disabled" : props.readOnly ? "readonly" : "editable";
  const status = state.invalid ? "error" : "default";
  const input = renderQuestionnaireControl({ ...props }, state, render, <input />);
  return <div data-slot="input-wrapper" data-density={density} data-size={size} data-appearance="outlined"
    data-status={status} data-permission={permission} data-state={state.disabled ? "disabled" : "default"}
    className={rainCn("rain-input group/input rain-questionnaire__input-wrapper", fieldFrameRecipe({ size, appearance: "outlined", status, state: permission }), inputSizeClassName(size), wrapperClassName)}>
    {input}
  </div>;
}

/** Presentation only: Primitive retains the actual input, answer registration and native reset. */
export function QuestionnaireInputAdapter({ className, render, wrapperClassName, ...props }: InputProps & { wrapperClassName?: string }) {
  return <Primitive.Input {...props} data-slot="input" className={rainCn(inputControlClassName, "rain-questionnaire__input", className)}
    render={(nativeProps, state) => <InputSurface {...nativeProps} state={state} render={render} wrapperClassName={wrapperClassName} />} />;
}
