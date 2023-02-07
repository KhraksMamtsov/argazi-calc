import * as Money from "../domain/Money";
import * as CI from "../domain/CourseInfo";
import * as Tariff from "../domain/Tariff";
import * as P from "../domain/Person";
import { Temporal } from "@js-temporal/polyfill";

export const defaultState: CI.CourseInfo = {
  name: "Курс Нёндро",
  person: P.usual(),
  tariff: Tariff.booking(),
  from: Temporal.PlainDate.from({
    year: 2023,
    month: 2,
    day: 23,
  }),
  to: Temporal.PlainDate.from({
    year: 2023,
    month: 2,
    day: 26,
  }),
  days: [
    {
      __typename: "DayInfo",
      id: "day-1",
      date: Temporal.PlainDate.from({
        year: 2023,
        month: 2,
        day: 23,
      }),
      enabled: false,
      price: {
        [Tariff.BookingType]: Money.fromNumber(20000),
        [Tariff.InPlaceType]: Money.fromNumber(20000),
      },
      eating: [
        {
          __typename: "EatingInfo",
          id: "eating-1",
          date: Temporal.PlainDateTime.from({
            year: 2023,
            month: 2,
            day: 23,
            hour: 8,
          }),
          enabled: false,
          name: "Завтрак",
          price: {
            [P.PersonType.CHILDREN_BEFORE_3]: Money.fromNumber(10000),
            [P.PersonType.CHILDREN_FROM_3_TO_7]: Money.fromNumber(10000),
            [P.PersonType.CHILDREN_FROM_7_TO_18]: Money.fromNumber(15000),
            [P.PersonType.STUDENT]: Money.fromNumber(15000),
            [P.PersonType.USUAL]: Money.fromNumber(15000),
            [P.PersonType.PENSIONER]: Money.fromNumber(15000),
          },
        },
        {
          __typename: "EatingInfo",
          id: "eating-2",
          date: Temporal.PlainDateTime.from({
            year: 2023,
            month: 2,
            day: 23,
            hour: 14,
          }),
          enabled: false,
          name: "Oбед",
          price: {
            [P.PersonType.CHILDREN_BEFORE_3]: Money.fromNumber(15000),
            [P.PersonType.CHILDREN_FROM_3_TO_7]: Money.fromNumber(15000),
            [P.PersonType.CHILDREN_FROM_7_TO_18]: Money.fromNumber(30000),
            [P.PersonType.STUDENT]: Money.fromNumber(30000),
            [P.PersonType.USUAL]: Money.fromNumber(30000),
            [P.PersonType.PENSIONER]: Money.fromNumber(30000),
          },
        },
        {
          __typename: "EatingInfo",
          id: "eating-3",
          date: Temporal.PlainDateTime.from({
            year: 2023,
            month: 2,
            day: 23,
            hour: 19,
          }),
          enabled: false,
          name: "Ужин",
          price: {
            [P.PersonType.CHILDREN_BEFORE_3]: Money.fromNumber(10000),
            [P.PersonType.CHILDREN_FROM_3_TO_7]: Money.fromNumber(10000),
            [P.PersonType.CHILDREN_FROM_7_TO_18]: Money.fromNumber(25000),
            [P.PersonType.STUDENT]: Money.fromNumber(25000),
            [P.PersonType.USUAL]: Money.fromNumber(25000),
            [P.PersonType.PENSIONER]: Money.fromNumber(25000),
          },
        },
      ],
      lectures: [
        // {
        //   __typename: "LectureInfo",
        //   id: "lecture-1",
        //   date: Temporal.PlainDateTime.from({
        //     year: 2023,
        //     month: 2,
        //     day: 23,
        //   }),
        //   enabled: false,
        //   name: "Участие в Дхарма-программе",
        //   price: {
        //     [Tariff.BookingType]: Money.fromNumber(30000),
        //     [Tariff.InPlaceType]: Money.fromNumber(60000),
        //   },
        // },
      ],
    },
    {
      id: "day-2",
      __typename: "DayInfo",
      enabled: false,
      date: Temporal.PlainDate.from({
        year: 2023,
        month: 2,
        day: 24,
      }),
      price: {
        [Tariff.BookingType]: Money.fromNumber(20000),
        [Tariff.InPlaceType]: Money.fromNumber(20000),
      },
      eating: [
        {
          __typename: "EatingInfo",
          id: "eating-1",
          date: Temporal.PlainDateTime.from({
            year: 2023,
            month: 2,
            day: 24,
            hour: 8,
          }),
          enabled: false,
          name: "Завтрак",
          price: {
            [P.PersonType.CHILDREN_BEFORE_3]: Money.fromNumber(10000),
            [P.PersonType.CHILDREN_FROM_3_TO_7]: Money.fromNumber(10000),
            [P.PersonType.CHILDREN_FROM_7_TO_18]: Money.fromNumber(15000),
            [P.PersonType.STUDENT]: Money.fromNumber(15000),
            [P.PersonType.USUAL]: Money.fromNumber(15000),
            [P.PersonType.PENSIONER]: Money.fromNumber(15000),
          },
        },
        {
          __typename: "EatingInfo",
          id: "eating-2",
          date: Temporal.PlainDateTime.from({
            year: 2023,
            month: 2,
            day: 24,
            hour: 14,
          }),
          enabled: false,
          name: "Oбед",
          price: {
            [P.PersonType.CHILDREN_BEFORE_3]: Money.fromNumber(15000),
            [P.PersonType.CHILDREN_FROM_3_TO_7]: Money.fromNumber(15000),
            [P.PersonType.CHILDREN_FROM_7_TO_18]: Money.fromNumber(30000),
            [P.PersonType.STUDENT]: Money.fromNumber(30000),
            [P.PersonType.USUAL]: Money.fromNumber(30000),
            [P.PersonType.PENSIONER]: Money.fromNumber(30000),
          },
        },
        {
          __typename: "EatingInfo",
          id: "eating-3",
          date: Temporal.PlainDateTime.from({
            year: 2023,
            month: 2,
            day: 24,
            hour: 19,
          }),
          enabled: false,
          name: "Ужин",
          price: {
            [P.PersonType.CHILDREN_BEFORE_3]: Money.fromNumber(10000),
            [P.PersonType.CHILDREN_FROM_3_TO_7]: Money.fromNumber(10000),
            [P.PersonType.CHILDREN_FROM_7_TO_18]: Money.fromNumber(25000),
            [P.PersonType.STUDENT]: Money.fromNumber(25000),
            [P.PersonType.USUAL]: Money.fromNumber(25000),
            [P.PersonType.PENSIONER]: Money.fromNumber(25000),
          },
        },
      ],
      lectures: [
        // {
        //   __typename: "LectureInfo",
        //   id: "lecture-1",
        //   date: Temporal.PlainDateTime.from({
        //     year: 2023,
        //     month: 2,
        //     day: 24,
        //   }),
        //   enabled: false,
        //   name: "Участие в Дхарма-программе",
        //   price: {
        //     [Tariff.BookingType]: Money.fromNumber(30000),
        //     [Tariff.InPlaceType]: Money.fromNumber(60000),
        //   },
        // },
      ],
    },

    {
      __typename: "DayInfo",
      id: "day-3",
      date: Temporal.PlainDate.from({
        year: 2023,
        month: 2,
        day: 25,
      }),
      enabled: false,
      price: {
        [Tariff.BookingType]: Money.fromNumber(20000),
        [Tariff.InPlaceType]: Money.fromNumber(20000),
      },
      eating: [
        {
          __typename: "EatingInfo",
          id: "eating-1",
          date: Temporal.PlainDateTime.from({
            year: 2023,
            month: 2,
            day: 25,
            hour: 8,
          }),
          enabled: false,
          name: "Завтрак",
          price: {
            [P.PersonType.CHILDREN_BEFORE_3]: Money.fromNumber(10000),
            [P.PersonType.CHILDREN_FROM_3_TO_7]: Money.fromNumber(10000),
            [P.PersonType.CHILDREN_FROM_7_TO_18]: Money.fromNumber(15000),
            [P.PersonType.STUDENT]: Money.fromNumber(15000),
            [P.PersonType.USUAL]: Money.fromNumber(15000),
            [P.PersonType.PENSIONER]: Money.fromNumber(15000),
          },
        },
        {
          __typename: "EatingInfo",
          id: "eating-2",
          date: Temporal.PlainDateTime.from({
            year: 2023,
            month: 2,
            day: 25,
            hour: 14,
          }),
          enabled: false,
          name: "Oбед",
          price: {
            [P.PersonType.CHILDREN_BEFORE_3]: Money.fromNumber(15000),
            [P.PersonType.CHILDREN_FROM_3_TO_7]: Money.fromNumber(15000),
            [P.PersonType.CHILDREN_FROM_7_TO_18]: Money.fromNumber(30000),
            [P.PersonType.STUDENT]: Money.fromNumber(30000),
            [P.PersonType.USUAL]: Money.fromNumber(30000),
            [P.PersonType.PENSIONER]: Money.fromNumber(30000),
          },
        },
        {
          __typename: "EatingInfo",
          id: "eating-3",
          date: Temporal.PlainDateTime.from({
            year: 2023,
            month: 2,
            day: 25,
            hour: 19,
          }),
          enabled: false,
          name: "Ужин",
          price: {
            [P.PersonType.CHILDREN_BEFORE_3]: Money.fromNumber(10000),
            [P.PersonType.CHILDREN_FROM_3_TO_7]: Money.fromNumber(10000),
            [P.PersonType.CHILDREN_FROM_7_TO_18]: Money.fromNumber(25000),
            [P.PersonType.STUDENT]: Money.fromNumber(25000),
            [P.PersonType.USUAL]: Money.fromNumber(25000),
            [P.PersonType.PENSIONER]: Money.fromNumber(25000),
          },
        },
      ],
      lectures: [
        // {
        //   __typename: "LectureInfo",
        //   id: "lecture-1",
        //   date: Temporal.PlainDateTime.from({
        //     year: 2023,
        //     month: 2,
        //     day: 25,
        //   }),
        //   enabled: false,
        //   name: "Участие в Дхарма-программе",
        //   price: {
        //     [Tariff.BookingType]: Money.fromNumber(30000),
        //     [Tariff.InPlaceType]: Money.fromNumber(60000),
        //   },
        // },
      ],
    },
    {
      __typename: "DayInfo",
      id: "day-4",
      date: Temporal.PlainDate.from({
        year: 2023,
        month: 2,
        day: 26,
      }),
      enabled: false,
      price: {
        [Tariff.BookingType]: Money.fromNumber(20000),
        [Tariff.InPlaceType]: Money.fromNumber(20000),
      },
      eating: [
        {
          __typename: "EatingInfo",
          id: "eating-1",
          date: Temporal.PlainDateTime.from({
            year: 2023,
            month: 2,
            day: 26,
            hour: 8,
          }),
          enabled: false,
          name: "Завтрак",
          price: {
            [P.PersonType.CHILDREN_BEFORE_3]: Money.fromNumber(10000),
            [P.PersonType.CHILDREN_FROM_3_TO_7]: Money.fromNumber(10000),
            [P.PersonType.CHILDREN_FROM_7_TO_18]: Money.fromNumber(15000),
            [P.PersonType.STUDENT]: Money.fromNumber(15000),
            [P.PersonType.USUAL]: Money.fromNumber(15000),
            [P.PersonType.PENSIONER]: Money.fromNumber(15000),
          },
        },
        {
          __typename: "EatingInfo",
          id: "eating-2",
          date: Temporal.PlainDateTime.from({
            year: 2023,
            month: 2,
            day: 26,
            hour: 14,
          }),
          enabled: false,
          name: "Oбед",
          price: {
            [P.PersonType.CHILDREN_BEFORE_3]: Money.fromNumber(15000),
            [P.PersonType.CHILDREN_FROM_3_TO_7]: Money.fromNumber(15000),
            [P.PersonType.CHILDREN_FROM_7_TO_18]: Money.fromNumber(30000),
            [P.PersonType.STUDENT]: Money.fromNumber(30000),
            [P.PersonType.USUAL]: Money.fromNumber(30000),
            [P.PersonType.PENSIONER]: Money.fromNumber(30000),
          },
        },
        {
          __typename: "EatingInfo",
          id: "eating-3",
          date: Temporal.PlainDateTime.from({
            year: 2023,
            month: 2,
            day: 26,
            hour: 19,
          }),
          enabled: false,
          name: "Ужин",
          price: {
            [P.PersonType.CHILDREN_BEFORE_3]: Money.fromNumber(10000),
            [P.PersonType.CHILDREN_FROM_3_TO_7]: Money.fromNumber(10000),
            [P.PersonType.CHILDREN_FROM_7_TO_18]: Money.fromNumber(25000),
            [P.PersonType.STUDENT]: Money.fromNumber(25000),
            [P.PersonType.USUAL]: Money.fromNumber(25000),
            [P.PersonType.PENSIONER]: Money.fromNumber(25000),
          },
        },
      ],
      lectures: [
        // {
        //   __typename: "LectureInfo",
        //   id: "lecture-1",
        //   date: Temporal.PlainDateTime.from({
        //     year: 2023,
        //     month: 2,
        //     day: 23,
        //   }),
        //   enabled: false,
        //   name: "Участие в Дхарма-программе",
        //   price: {
        //     [Tariff.BookingType]: Money.fromNumber(30000),
        //     [Tariff.InPlaceType]: Money.fromNumber(60000),
        //   },
        // },
      ],
    },
  ],
};
