import * as EI from "./domain/EatingInfo";
import { CheckBox } from "./CheckBox";
import React from "react";
import { Money } from "./ui/Money/Money";
import * as P from "./domain/Person";

export function Eating(props: {
  eating: EI.EatingInfo;
  person: P.Person;
  onChange: (enabled: boolean) => void;
}) {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <div>
        <CheckBox state={props.eating.enabled} onChange={props.onChange} />
      </div>

      <div>{props.eating.name}</div>
      <div>
        <Money money={props.eating.price[props.person.type]} />
      </div>
      <div>
        {props.eating.date.toLocaleString([...window.navigator.languages], {
          timeStyle: "short",
        })}
      </div>
    </div>
  );
}
