import * as EI from "./EatingInfo";
import * as LI from "./LectureInfo";
import * as Price from "./Price";
import * as P from "./Person";
import * as Tariff from "./Tariff";
import { pipe } from "fp-ts/lib/function";
import * as RA from "fp-ts/ReadonlyArray";
import * as C from "./Calculating";
import { Temporal } from "@js-temporal/polyfill";
import * as Money from "./Money";

export type DayInfo = Readonly<{
  __typename: "DayInfo";
  id: string;
  date: Temporal.PlainDate;
  enabled: boolean;
  eating: ReadonlyArray<EI.EatingInfo>;
  lectures: ReadonlyArray<LI.LectureInfo>;
  price: Price.Price;
}>;

type CalculateArgs = Readonly<{
  tariff: Tariff.Tariff;
  person: P.Person;
  day: DayInfo;
}>;

export function calculateEatingTotal(args: CalculateArgs) {
  return pipe(
    args.day.eating,
    RA.filter((x) => x.enabled),
    RA.map((x) => EI.calculateTotal({ ...args, eating: x })),
    C.sum
  );
}
export function calculateLectureTotal(args: CalculateArgs) {
  return pipe(
    args.day.lectures,
    RA.filter((x) => x.enabled),
    RA.map((x) => LI.calculateTotal({ ...args, lecture: x })),
    C.sum
  );
}

export function calculateTotal(args: CalculateArgs) {
  const { tariff, person, day } = args;

  const eatingTotalPrice = calculateEatingTotal(args);
  const lecturesTotalPrice = calculateLectureTotal(args);

  const eatingLecturesAndDay = pipe(
    [
      //
      C.value(day.price[tariff.type]),
      eatingTotalPrice,
      lecturesTotalPrice,
    ],
    C.sum
  );

  return pipe(
    person,
    P.match({
      [P.PersonType.COOK]: () => lecturesTotalPrice,
      [P.PersonType.COOK_ASSISTANT]: () =>
        pipe(
          [
            lecturesTotalPrice,
            eatingTotalPrice,
            pipe(C.value(day.price[tariff.type]), C.div(100), C.mul(70)),
          ],
          C.sum
        ),
      [P.PersonType.USUAL]: () => eatingLecturesAndDay,
      [P.PersonType.PENSIONER]: () => eatingLecturesAndDay,
      [P.PersonType.STUDENT]: () => eatingLecturesAndDay,
      [P.PersonType.CHILDREN_BEFORE_3]: () =>
        pipe(
          [C.value(Money.zero()), eatingTotalPrice, lecturesTotalPrice],
          C.sum
        ),
      [P.PersonType.CHILDREN_FROM_3_TO_7]: () =>
        pipe(
          C.value(day.price[tariff.type]),
          C.div(2),
          (x) => [x, eatingTotalPrice, lecturesTotalPrice],
          C.sum
        ),
      [P.PersonType.CHILDREN_FROM_7_TO_18]: () =>
        pipe(
          C.value(day.price[tariff.type]),
          C.div(2),
          (x) => [x, eatingTotalPrice, lecturesTotalPrice],
          C.sum
        ),
    })
  );
}
