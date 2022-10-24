export const InPlaceType = "in-place" as const;
export const BookingType = "booking" as const;

export const TariffTypeContract = [InPlaceType, BookingType] as const;
export type TariffType = typeof TariffTypeContract[number];

export const inPlace = () => ({
  type: InPlaceType,
});
export const booking = () => ({
  type: BookingType,
});

export type InPlace = ReturnType<typeof inPlace>;
export type Booking = ReturnType<typeof booking>;

export type Tariff = InPlace | Booking;
const viewFrom: Readonly<Record<TariffType, string>> = {
  "in-place": "На месте",
  booking: "Предоплата",
};

export const toView = (t: Tariff) => viewFrom[t.type];
