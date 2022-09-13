import * as Tariff from "./Tariff";
import * as Money from "./Money";

export type Price = Readonly<Record<Tariff.TariffType, Money.Money>>;