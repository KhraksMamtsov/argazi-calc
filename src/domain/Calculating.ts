import * as Money from "./Money";
import { pipe } from "fp-ts/lib/function";
import * as RNEA from "fp-ts/ReadonlyNonEmptyArray";
import * as RA from "fp-ts/ReadonlyArray";
import * as O from "fp-ts/Option";
import { matchOn } from "../utils/adt";

export const match = matchOn("type");

enum ExpressionType {
  VALUE = "VALUE::ExpressionType",
  SUM = "SUM::ExpressionType",
  DIV = "DIV::ExpressionType",
  MUL = "MUL::ExpressionType",
}

type Value = Readonly<{
  type: ExpressionType.VALUE;
  value: Money.Money;
}>;

export const value = (value: Money.Money): Value => ({
  type: ExpressionType.VALUE,
  value,
});

export type Sum = Readonly<{
  type: ExpressionType.SUM;
  summands: ReadonlyArray<Calculating>;
}>;

export const sum = (summands: ReadonlyArray<Calculating>): Sum => ({
  type: ExpressionType.SUM,
  summands,
});

type Div = Readonly<{
  type: ExpressionType.DIV;
  divisible: Calculating;
  divisor: number;
}>;
export const div =
  (divisor: number) =>
  (divisible: Calculating): Div => ({
    type: ExpressionType.DIV,
    divisible,
    divisor,
  });

type Mul = Readonly<{
  type: ExpressionType.MUL;
  multiply: Calculating;
  multiplier: number;
}>;
export const mul =
  (multiplier: number) =>
  (multiply: Calculating): Mul => ({
    type: ExpressionType.MUL,
    multiplier,
    multiply,
  });

export type Calculating = Value | Sum | Div | Mul;

export const calculate = (expr: Calculating): Money.Money =>
  pipe(
    expr,
    optimize,
    O.match(
      () => Money.zero(),
      match({
        [ExpressionType.VALUE]: (x) => x.value,
        [ExpressionType.SUM]: (x) =>
          x.summands.reduce(
            (acc, cur) => pipe(acc, Money.sum(calculate(cur))),
            Money.zero()
          ),
        [ExpressionType.DIV]: (x) =>
          pipe(calculate(x.divisible), Money.div(x.divisor)),
        [ExpressionType.MUL]: (x) =>
          pipe(calculate(x.multiply), Money.mul(x.multiplier)),
      })
    )
  );

const optimize = (expr: Calculating): O.Option<Calculating> =>
  pipe(
    expr,
    match({
      [ExpressionType.VALUE]: (x) => O.some(x),
      [ExpressionType.DIV]: (x) =>
        pipe(optimize(x.divisible), O.map(div(x.divisor))),
      [ExpressionType.MUL]: (x) =>
        pipe(optimize(x.multiply), O.map(mul(x.multiplier))),
      [ExpressionType.SUM]: (x) =>
        pipe(
          x.summands,
          RNEA.fromReadonlyArray,
          O.map(RNEA.map(optimize)),
          O.map(RA.compact),
          O.map((x) => (x.length === 1 ? x[0] : sum(x)))
        ),
    })
  );

export const show = (expr: Calculating): string =>
  pipe(
    expr,
    optimize,
    O.match(
      () => "---",
      match({
        [ExpressionType.VALUE]: (x) => Money.show(x.value),
        [ExpressionType.SUM]: ({ summands }) =>
          `(${summands.map((x) => show(x)).join(" + ")})`,
        [ExpressionType.DIV]: (x) => `(${show(x.divisible)} / ${x.divisor})`,
        [ExpressionType.MUL]: (x) => `(${show(x.multiply)} * ${x.multiplier})`,
      })
    )
  );
