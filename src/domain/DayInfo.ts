import * as EI from "./EatingInfo";
import * as LI from "./LectureInfo";
import { Price } from "./Price";
import * as P from "./Person";
import { Tariff } from "./Tariff";
import { pipe } from "fp-ts/lib/function";
import * as RA from "fp-ts/ReadonlyArray";
import * as C from "./Calculating";
import { Temporal } from "@js-temporal/polyfill";

export type DayInfo = Readonly<{
  __typename: "DayInfo";
  id: string;
  date: Temporal.PlainDate;
  enabled: boolean;
  eating: ReadonlyArray<EI.EatingInfo>;
  lectures: ReadonlyArray<LI.LectureInfo>;
  price: Price;
}>;

type CalculateArgs = Readonly<{
  tariff: Tariff;
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

  return pipe(
    person,
    P.match({
      [P.PersonType.USUAL]: () =>
        pipe(
          [
            C.value(day.price[tariff.type]),
            eatingTotalPrice,
            lecturesTotalPrice,
          ],
          C.sum
        ),
      [P.PersonType.CHILDREN]: () => pipe(day.price[tariff.type], C.value),
      [P.PersonType.PENSIONER]: () =>
        pipe(
          [
            C.value(day.price[tariff.type]),
            eatingTotalPrice,
            lecturesTotalPrice,
          ],
          C.sum
        ),
      [P.PersonType.STUDENT]: () =>
        pipe(
          [
            C.value(day.price[tariff.type]),
            eatingTotalPrice,
            lecturesTotalPrice,
          ],
          C.sum
        ),
    })
  );
}
