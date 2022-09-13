import React, { useEffect, useRef } from "react";

type CheckBoxCheckedState = boolean;
type CheckBoxState = CheckBoxCheckedState | "indeterminate";

type CheckBoxProps = {
  state: CheckBoxState;
  onChange: (checked: CheckBoxCheckedState) => void;
};

export const CheckBox = (props: CheckBoxProps) => {
  const checkBoxRef = useRef<HTMLInputElement | null>(null);

  const checkbox = checkBoxRef.current;
  if (checkbox !== null) {
    checkbox.indeterminate = props.state === "indeterminate";
  }

  return (
    <input
      style={{
        width: "30px",
        height: "30px",
      }}
      ref={checkBoxRef}
      checked={props.state === "indeterminate" ? undefined : props.state}
      type="checkbox"
      onChange={() => {
        if (props.state === "indeterminate") {
          props.onChange(false);
        } else {
          props.onChange(!props.state);
        }
      }}
    />
  );
};
