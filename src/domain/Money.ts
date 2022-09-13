import Dinero from "dinero.js";
import { pipe } from "fp-ts/lib/function";

export type Money = unknown & { __tag: "Money" };

function decode(x: unknown) {
  return x as Dinero.Dinero;
}

function encode(x: Dinero.Dinero) {
  return x as unknown as Money;
}

export const zero = () => fromNumber(0);

export function sum(b: Money) {
  return (a: Money) => pipe(decode(b).add(decode(a)), encode);
}

export function show(money: Money) {
  return decode(money).toFormat("0,0.00");
}

export function div(b: number) {
  return (a: Money) => pipe(decode(a).divide(b, "DOWN"), encode);
}

export function fromNumber(amount: number) {
  return Dinero({ amount }) as unknown as Money;
}
