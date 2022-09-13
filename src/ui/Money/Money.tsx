import * as M from "../../domain/Money";

export type MoneyProps = Readonly<{ money: M.Money }>;

export function Money(props: MoneyProps) {
  return <span>{M.show(props.money)}&nbsp;₽</span>;
}
