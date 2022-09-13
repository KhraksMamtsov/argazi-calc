import * as EI from "./domain/EatingInfo";
import { CheckBox } from "./CheckBox";
import React from "react";
import { Money } from "./ui/Money/Money";

export function Eating(props: {
  eating: EI.EatingInfo;
  onChange: (enabled: boolean) => void;
}) {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div>
        <CheckBox state={props.eating.enabled} onChange={props.onChange} />
      </div>

      <div>{props.eating.name}</div>
      <div>
        <Money money={props.eating.price} />
      </div>
      <div>
        {props.eating.date.toLocaleString(undefined, {
          timeStyle: "short",
        })}
      </div>
    </div>
  );
}
