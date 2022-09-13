import { createStore, createEvent } from "effector";
import * as Money from "../domain/Money";
import * as DI from "../domain/DayInfo";
import * as P from "../domain/Person";
import * as Tariff from "../domain/Tariff";
import * as EI from "../domain/EatingInfo";
import * as CI from "../domain/CourseInfo";
import * as C from "../domain/Calculating";
import { pipe } from "fp-ts/lib/function";
import { defaultState } from "./defaultState";

const reset = createEvent();
export const toggleDay = createEvent<{ dayId: string; enabled: boolean }>();
export const toggleEating = createEvent<{
  dayId: string;
  eatingId: string;
  enabled: boolean;
}>();
export const toggleLecture = createEvent<{
  dayId: string;
  lectureId: string;
  enabled: boolean;
}>();
export const setPersonType = createEvent<{
  person: P.Person;
}>();
export const setTariff = createEvent<{
  tariff: Tariff.Tariff;
}>();

export const course$ = createStore<CI.CourseInfo>(defaultState)
  .reset(reset)
  .on(setPersonType, (state, { person }) => ({
    ...state,
    person,
  }))
  .on(setTariff, (state, { tariff }) => ({
    ...state,
    tariff,
  }))
  .on(toggleDay, (state, { dayId, enabled }) => {
    return {
      ...state,
      days: state.days.map((d) => {
        if (d.id !== dayId) {
          return d;
        } else {
          return {
            ...d,
            enabled,
            eating: d.eating.map((e) => ({ ...e, enabled })),
            lectures: d.lectures.map((l) => ({ ...l, enabled })),
          };
        }
      }),
    };
  })
  .on(toggleEating, (state, { dayId, eatingId, enabled }) => {
    return {
      ...state,
      days: state.days.map((d) => {
        if (d.id !== dayId) {
          return d;
        } else {
          const newEating = d.eating.map((e) => ({
            ...e,
            enabled: e.id === eatingId ? enabled : e.enabled,
          }));
          return {
            ...d,
            enabled: d.eating.some((x) => x.id === eatingId)
              ? enabled
                ? true
                : [...d.lectures, ...newEating].every((x) => !x.enabled)
                ? false
                : d.enabled
              : d.enabled,
            eating: newEating,
          };
        }
      }),
    };
  })
  .on(toggleLecture, (state, { dayId, lectureId, enabled }) => {
    return {
      ...state,
      days: state.days.map((d) => {
        if (d.id !== dayId) {
          return d;
        } else {
          const newLectures = d.lectures.map((l) => ({
            ...l,
            enabled: l.id === lectureId ? enabled : l.enabled,
          }));
          return {
            ...d,
            enabled: d.lectures.some((x) => x.id === lectureId)
              ? enabled
                ? true
                : [...newLectures, ...d.eating].every((x) => !x.enabled)
                ? false
                : d.enabled
              : d.enabled,
            lectures: newLectures,
          };
        }
      }),
    };
  });

export const total$ = course$.map((x) => {
  return pipe(x, CI.calculateTotal);
});
