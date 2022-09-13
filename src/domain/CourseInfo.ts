import { Person } from "./Person";
import * as DI from "./DayInfo";
import { Tariff } from "./Tariff";

import { pipe } from "fp-ts/lib/function";
import * as RA from "fp-ts/ReadonlyArray";
import * as C from "./Calculating";
import { Temporal } from "@js-temporal/polyfill";

export type CourseInfo = Readonly<{
  name: string;
  days: ReadonlyArray<DI.DayInfo>;
  person: Person;
  tariff: Tariff;

  from: Temporal.PlainDate;
  to: Temporal.PlainDate;
}>;

export function calculateTotal(course: CourseInfo) {
  return pipe(
    course.days,
    RA.filter((x) => x.enabled),
    RA.map((day) =>
      DI.calculateTotal({
        tariff: course.tariff,
        person: course.person,
        day,
      })
    ),
    C.sum
  );
}
