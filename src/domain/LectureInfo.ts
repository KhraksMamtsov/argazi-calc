import { Money } from "./Money";
import { Tariff, TariffType } from "./Tariff";
import * as P from "./Person";
import * as Calc from "./Calculating";
import { pipe } from "fp-ts/lib/function";
import { Temporal } from "@js-temporal/polyfill";

export type LectureInfo = Readonly<{
  __typename: "LectureInfo";
  enabled: boolean;
  date: Temporal.PlainDateTime;
  id: string;
  name: string;
  price: Readonly<Record<TariffType, Money>>;
}>;

type CalculateArgs = Readonly<{
  tariff: Tariff;
  person: P.Person;
  lecture: LectureInfo;
}>;

export const calculateTotal = (args: CalculateArgs) =>
  pipe(
    args.person,
    P.match.P(
      {
        [P.PersonType.PENSIONER]: () =>
          pipe(Calc.value(args.lecture.price[args.tariff.type]), Calc.div(2)),
        [P.PersonType.STUDENT]: () =>
          pipe(Calc.value(args.lecture.price[args.tariff.type]), Calc.div(2)),
      },
      () => Calc.value(args.lecture.price[args.tariff.type])
    )
  );
