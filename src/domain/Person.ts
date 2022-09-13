import { matchOn } from "../utils/adt";

export enum PersonType {
  CHILDREN = "CHILDREN::PersonType",
  PENSIONER = "PENSIONER::PersonType",
  USUAL = "USUAL::PersonType",
  STUDENT = "STUDENT::PersonType",
}
const DISCRIMINANT = "type";

export const children = () => ({ [DISCRIMINANT]: PersonType.CHILDREN });
export const pensioner = () => ({ [DISCRIMINANT]: PersonType.PENSIONER });
export const usual = () => ({ [DISCRIMINANT]: PersonType.USUAL });
export const student = () => ({ [DISCRIMINANT]: PersonType.STUDENT });

export type Children = ReturnType<typeof children>;
export type Pensioner = ReturnType<typeof pensioner>;
export type Usual = ReturnType<typeof usual>;
export type Student = ReturnType<typeof student>;

export type Person = typeof All[number];

export const All = [children(), pensioner(), usual(), student()] as const;

export const match = matchOn(DISCRIMINANT);

export const toView = (p: Person) =>
  ({
    [PersonType.CHILDREN]: "Ребенок",
    [PersonType.PENSIONER]: "Пенсионер",
    [PersonType.USUAL]: "Обычный",
    [PersonType.STUDENT]: "Студент",
  }[p.type]);
