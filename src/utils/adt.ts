import * as TsADT from "ts-adt/MakeADT";

export function matchOn<T extends string>(discriminant: T) {
  const [match, matchP, matchI, matchPI] = TsADT.makeMatchers(discriminant);

  return Object.assign(match, {
    P: matchP,
    I: matchI,
    PI: matchPI,
  });
}
