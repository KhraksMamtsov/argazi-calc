import "./Course.scss";
import * as CI from "./domain/CourseInfo";
import { useStore } from "effector-react";
import * as $ from "./store/Calculator";
import { Select } from "./Select";
import * as P from "./domain/Person";
import * as Tariff from "./domain/Tariff";
import * as C from "./domain/Calculating";
import React from "react";
import { pipe } from "fp-ts/lib/function";
import { Money } from "./ui/Money/Money";
import { Day } from "./ui/Day/Day";

export function Course(props: { course: CI.CourseInfo }) {
  const total = useStore($.total$);

  return (
    <div className={"course"}>
      <div className="course__item">
        <h1 className={"course__title"}>{props.course.name}</h1>
      </div>
      <div className="course__item">
        <h3 className={"course__date"}>
          {props.course.from.toLocaleString("ru-RU", {
            day: "numeric",
            month: "short",
            year: "2-digit",
            weekday: "short",
          })}
        </h3>
        <h3 className={"course__date"}>
          {props.course.to.toLocaleString("ru-RU", {
            day: "numeric",
            month: "short",
            year: "2-digit",
            weekday: "short",
          })}
        </h3>
      </div>

      <div className="course__item">
        <div className={"course__header"}>
          <div>
            <Select
              value={props.course.person}
              values={P.All}
              onChange={(x) => $.setPersonType({ person: x })}
              getId={(x) => x.type}
              renderOption={(x) => P.toView(x)}
            />
          </div>
          <div>
            <Select
              value={props.course.tariff}
              values={[Tariff.inPlace(), Tariff.booking()]}
              onChange={(tariff) => $.setTariff({ tariff })}
              getId={(x) => x.type}
              renderOption={(x) => Tariff.toView(x)}
            />
          </div>
        </div>
      </div>
      <div className="course__item">
        <div className={"course__days"}>
          <ul className={"days"}>
            {props.course.days.map((x) => (
              <li key={x.id} className={"days__item"}>
                <Day
                  person={props.course.person}
                  day={x}
                  tariff={props.course.tariff}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="course__item">
        <div className={"course__footer"}>
          <div>Calculating: {C.show(total)}</div>
          <h2 className={"course__total"}>
            Итого:{" "}
            {pipe(total, C.calculate, (x) => (
              <Money money={x} />
            ))}
          </h2>
        </div>
      </div>
    </div>
  );
}
