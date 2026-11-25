import { describe, expect, it } from "vitest";
import { calcBudget } from "./budget";
describe("calcBudget", () => {
  it("computes Goa for 3 travellers, 4 days", () => {
    const b = calcBudget("Goa", 3, 4)!;
    expect(b.hotel).toBe(24000); expect(b.food).toBe(9600); expect(b.transport).toBe(12000);
    expect(b.misc).toBe(4560); expect(b.total).toBe(50160); expect(b.perPerson).toBe(16720);
  });
  it("rejects invalid input", () => { expect(calcBudget("Goa", 0, 3)).toBeNull(); });
});
