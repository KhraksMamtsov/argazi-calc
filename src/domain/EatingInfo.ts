import { Money } from "./Money";
import { Tariff } from "./Tariff";
import * as P from "./Person";
import { value } from "./Calculating";
import { Temporal } from "@js-temporal/polyfill";

export type EatingInfo = Readonly<{
  __typename: "EatingInfo";
  id: string;
  enabled: boolean;
  date: Temporal.PlainDateTime;
  name: string;
  price: Money;
}>;

type CalculateArgs = Readonly<{
  tariff: Tariff;
  person: P.Person;
  eating: EatingInfo;
}>;

export const calculateTotal = (args: CalculateArgs) => value(args.eating.price);
