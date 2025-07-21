import { calculateToAmount } from "@/lib/utils";

describe("calculateToAmount", () => {
  it("should calculate the correct toAmount when fromAmount is a valid number", () => {
    const result = calculateToAmount({
      fromAmount: "100",
      fromCurrency: 1.0,
      toCurrency: 0.85,
    });
    expect(result).toBe("85.00");
  });

  it("should return '0.00' when fromAmount is '0'", () => {
    const result = calculateToAmount({
      fromAmount: "0",
      fromCurrency: 1.0,
      toCurrency: 0.85,
    });
    expect(result).toBe("0.00");
  });

  it("should handle decimal values correctly", () => {
    const result = calculateToAmount({
      fromAmount: "10.5",
      fromCurrency: 1.0,
      toCurrency: 0.85,
    });
    expect(result).toBe("8.92");
  });

  it("should handle large numbers correctly", () => {
    const result = calculateToAmount({
      fromAmount: "1000000",
      fromCurrency: 1.0,
      toCurrency: 0.85,
    });
    expect(result).toBe("850000.00");
  });

  it("should handle zero conversion rate", () => {
    const result = calculateToAmount({
      fromAmount: "100",
      fromCurrency: 1.0,
      toCurrency: 0,
    });
    expect(result).toBe("0.00");
  });
});
