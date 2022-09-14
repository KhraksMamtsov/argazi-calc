import Dinero from "dinero.js";
import { pipe } from "fp-ts/lib/function";

export type Money = unknown & { __tag: "Money" };

function decode(x: Money) {
  return x as unknown as Dinero.Dinero;
}

function encode(x: Dinero.Dinero) {
  return x as unknown as Money;
}

export function fromNumber(amount: number) {
  return Dinero({ amount }) as unknown as Money;
}

export const zero = () => fromNumber(0);

export function sum(summandB: Money) {
  return (summandA: Money) =>
    pipe(decode(summandA).add(decode(summandB)), encode);
}

export function div(divisor: number) {
  return (divisible: Money) =>
    pipe(decode(divisible).divide(divisor, "DOWN"), encode);
}

export function show(money: Money) {
  return decode(money).toFormat("0,0.00");
}
