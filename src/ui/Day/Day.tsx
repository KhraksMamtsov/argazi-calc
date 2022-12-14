import * as DI from "../../domain/DayInfo";
import { CheckBox } from "../../CheckBox";
import * as $ from "../../store/Calculator";
import { Eating } from "../../Eating";
import React from "react";
import { Tariff } from "../../domain/Tariff";
import { Lecture } from "../../Lecture";
import { Person } from "../../domain/Person";
import * as Calc from "../../domain/Calculating";
import { pipe } from "fp-ts/lib/function";
import "./Day.scss";
import { Money } from "../Money/Money";
import { match } from "../../utils/type";
import { Temporal } from "@js-temporal/polyfill";

type DayProps = Readonly<{
  tariff: Tariff;
  day: DI.DayInfo;
  person: Person;
}>;

export function Day(props: DayProps) {
  return (
    <details className={"day"} open>
      <summary className={"day__summary"}>
        <div className={"day__summary-inner"}>
          <div className={"day__toggle"}>
            <CheckBox
              state={props.day.enabled}
              onChange={(enabled) =>
                $.toggleDay({
                  dayId: props.day.id,
                  enabled,
                })
              }
            />
          </div>

          <div className={"day__total-amount"}>
            Итого за день:{" "}
            {pipe(
              DI.calculateTotal({
                ...props,
              }),
              Calc.calculate,
              (x) => (
                <Money money={x} />
              )
            )}
          </div>
          <div className={"day__date"}>
            Пребывание в РЦ:{" "}
            <Money money={props.day.price[props.tariff.type]} />
          </div>
          <div className={"day__date"}>
            {props.day.date.toLocaleString([...window.navigator.languages], {
              day: "numeric",
              weekday: "short",
              month: "short",
            })}
          </div>
        </div>
      </summary>
      <ul className={"day__events"}>
        {[...props.day.eating, ...props.day.lectures]
          .sort((a, b) => Temporal.PlainDateTime.compare(a.date, b.date))
          .map((event) => (
            <li className={"day__event"} key={event.id}>
              {pipe(
                event,
                match({
                  EatingInfo: (e) => (
                    <Eating
                      person={props.person}
                      eating={e}
                      onChange={(enabled) =>
                        $.toggleEating({
                          dayId: props.day.id,
                          eatingId: e.id,
                          enabled,
                        })
                      }
                    />
                  ),
                  LectureInfo: (l) => (
                    <Lecture
                      person={props.person}
                      tariff={props.tariff}
                      lecture={l}
                      onChange={(enabled) =>
                        $.toggleLecture({
                          dayId: props.day.id,
                          lectureId: l.id,
                          enabled,
                        })
                      }
                    />
                  ),
                })
              )}
            </li>
          ))}
      </ul>
    </details>
  );
}
