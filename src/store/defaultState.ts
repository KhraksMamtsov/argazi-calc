import * as Money from "../domain/Money";
import * as CI from "../domain/CourseInfo";
import * as Tariff from "../domain/Tariff";
import * as P from "../domain/Person";
import { Temporal } from "@js-temporal/polyfill";

export const defaultState: CI.CourseInfo = {
  name: "Курс N",
  person: P.usual(),
  tariff: Tariff.inPlace(),
  from: Temporal.PlainDate.from({
    year: 2022,
    month: 9,
    day: 3,
  }),
  to: Temporal.PlainDate.from({
    year: 2022,
    month: 9,
    day: 14,
  }),
  days: [
    {
      __typename: "DayInfo",
      id: "qwe",
      date: Temporal.PlainDate.from({
        year: 2022,
        month: 9,
        day: 3,
      }),
      enabled: true,
      price: {
        [Tariff.BookingType]: Money.fromNumber(3),
        [Tariff.InPlaceType]: Money.fromNumber(3),
      },
      eating: [],
      lectures: [],
    },
    {
      id: "qwe2",
      __typename: "DayInfo",
      enabled: true,
      date: Temporal.PlainDate.from({
        year: 2022,
        month: 9,
        day: 4,
      }),
      price: {
        [Tariff.BookingType]: Money.fromNumber(444),
        [Tariff.InPlaceType]: Money.fromNumber(555),
      },
      eating: [
        {
          __typename: "EatingInfo",
          id: "eating-1",
          date: Temporal.PlainDateTime.from({
            year: 2022,
            month: 9,
            day: 4,
            hour: 8,
          }),
          enabled: true,
          name: "Завтрак",
          price: Money.fromNumber(100),
        },
        {
          __typename: "EatingInfo",
          id: "eating-2",
          date: Temporal.PlainDateTime.from({
            year: 2022,
            month: 9,
            day: 4,
            hour: 14,
          }),
          enabled: true,
          name: "Oбед",
          price: Money.fromNumber(200),
        },
        {
          __typename: "EatingInfo",
          id: "eating-3",
          date: Temporal.PlainDateTime.from({
            year: 2022,
            month: 9,
            day: 4,
            hour: 19,
          }),
          enabled: true,
          name: "Ужин",
          price: Money.fromNumber(33),
        },
      ],
      lectures: [
        {
          __typename: "LectureInfo",
          id: "lecture-1",
          date: Temporal.PlainDateTime.from({
            year: 2022,
            month: 9,
            day: 4,
            hour: 10,
          }),
          enabled: true,
          name: "Lecture-1",
          price: Money.fromNumber(1),
        },
        {
          __typename: "LectureInfo",
          id: "lecture-3",
          date: Temporal.PlainDateTime.from({
            year: 2022,
            month: 9,
            day: 4,
            hour: 16,
          }),
          enabled: true,
          name: "Lecture-3",
          price: Money.fromNumber(2),
        },
      ],
    },
  ],
};
