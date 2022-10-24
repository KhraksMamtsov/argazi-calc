import { matchOn } from "../utils/adt";

export enum PersonType {
  CHILDREN_BEFORE_3 = "CHILDREN_BEFORE_3::PersonType",
  CHILDREN_FROM_3_TO_7 = "CHILDREN_FROM_3_TO_7::PersonType",
  CHILDREN_FROM_7_TO_18 = "CHILDREN_FROM_7_TO_18::PersonType",
  PENSIONER = "PENSIONER::PersonType",
  USUAL = "USUAL::PersonType",
  STUDENT = "STUDENT::PersonType",
}
const DISCRIMINANT = "type";

export const childrenBefore3 = () => ({
  [DISCRIMINANT]: PersonType.CHILDREN_BEFORE_3,
});
export const childrenFrom3To7 = () => ({
  [DISCRIMINANT]: PersonType.CHILDREN_FROM_3_TO_7,
});
export const childrenFrom7To18 = () => ({
  [DISCRIMINANT]: PersonType.CHILDREN_FROM_7_TO_18,
});
export const pensioner = () => ({ [DISCRIMINANT]: PersonType.PENSIONER });
export const usual = () => ({ [DISCRIMINANT]: PersonType.USUAL });
export const student = () => ({ [DISCRIMINANT]: PersonType.STUDENT });

export type ChildrenBefore3 = ReturnType<typeof childrenBefore3>;
export type ChildrenFrom3To7 = ReturnType<typeof childrenFrom3To7>;
export type ChildrenFrom7To18 = ReturnType<typeof childrenFrom7To18>;
export type Pensioner = ReturnType<typeof pensioner>;
export type Usual = ReturnType<typeof usual>;
export type Student = ReturnType<typeof student>;

export type Person = typeof All[number];

export const All = [
  usual(),
  pensioner(),
  student(),
  childrenBefore3(),
  childrenFrom3To7(),
  childrenFrom7To18(),
] as const;

export const match = matchOn(DISCRIMINANT);

export const toView = (p: Person) =>
  ({
    [PersonType.CHILDREN_BEFORE_3]: "Ребенок до 3х лет",
    [PersonType.CHILDREN_FROM_3_TO_7]: "Ребенок от 3 до 7 лет",
    [PersonType.CHILDREN_FROM_7_TO_18]: "Ребенок от 7 до 18 лет",
    [PersonType.PENSIONER]: "Пенсионер",
    [PersonType.USUAL]: "Обычный",
    [PersonType.STUDENT]: "Студент",
  }[p.type]);
