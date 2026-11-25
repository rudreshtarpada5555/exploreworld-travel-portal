// Sample daily rates in INR. Hotel is per room per night (2 travellers per room).
export const rates: Record<string, { hotel: number; food: number; transport: number }> = {
  Goa: { hotel: 3000, food: 800, transport: 4000 },
  Kashmir: { hotel: 3500, food: 900, transport: 6000 },
  Manali: { hotel: 2500, food: 700, transport: 3500 },
  Jaipur: { hotel: 2500, food: 600, transport: 3000 },
  Kerala: { hotel: 3200, food: 800, transport: 5000 },
  Gujarat: { hotel: 2200, food: 500, transport: 2500 },
  Mumbai: { hotel: 4000, food: 1000, transport: 3000 },
  Agra: { hotel: 2000, food: 500, transport: 2000 },
};
export const MISC_RATE = 0.1;

export function calcBudget(dest: string, travellers: number, days: number) {
  const r = rates[dest];
  if (!r || travellers < 1 || days < 1) return null;
  const rooms = Math.ceil(travellers / 2);
  const hotel = r.hotel * rooms * days;
  const food = r.food * travellers * days;
  const transport = r.transport * travellers;
  const misc = Math.round((hotel + food + transport) * MISC_RATE);
  const total = hotel + food + transport + misc;
  return { hotel, food, transport, misc, total, perPerson: Math.round(total / travellers) };
}
export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
