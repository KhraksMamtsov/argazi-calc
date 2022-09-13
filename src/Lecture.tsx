import * as LI from "./domain/LectureInfo";
import { CheckBox } from "./CheckBox";
import React from "react";
import * as P from "./domain/Person";
import * as Calc from "./domain/Calculating";
import { pipe } from "fp-ts/lib/function";
import * as Tariff from "./domain/Tariff";
import { Money } from "./ui/Money/Money";

export function Lecture(props: {
  lecture: LI.LectureInfo;
  person: P.Person;
  tariff: Tariff.Tariff;
  onChange: (enabled: boolean) => void;
}) {
  return (
    <details>
      <summary style={{ display: "flex", gap: "20px" }}>
        <div>
          <CheckBox state={props.lecture.enabled} onChange={props.onChange} />
        </div>
        <div>{props.lecture.name}</div>

        <div>
          {pipe(
            LI.calculateTotal({
              lecture: props.lecture,
              person: props.person,
              tariff: props.tariff,
            }),
            Calc.calculate,
            (x) => (
              <Money money={x} />
            )
          )}
        </div>
        <div>
          {props.lecture.date.toLocaleString([...window.navigator.languages], {
            timeStyle: "short",
          })}
        </div>
      </summary>
      <div>
        {pipe(
          LI.calculateTotal({
            lecture: props.lecture,
            person: props.person,
            tariff: props.tariff,
          }),
          Calc.show
        )}
      </div>
    </details>
  );
}
