const { sum_to_n_a, sum_to_n_b, sum_to_n_c } = require("../index");

describe("sum_to_n functions", () => {
  test("sum_to_n_a should return the sum of numbers from 1 to n using the formula", () => {
    expect(sum_to_n_a(5)).toBe(15);
    expect(sum_to_n_a(10)).toBe(55);
    expect(sum_to_n_a(0)).toBe(0);
  });

  test("sum_to_n_b should return the sum of numbers from 1 to n using a loop", () => {
    expect(sum_to_n_b(5)).toBe(15);
    expect(sum_to_n_b(10)).toBe(55);
    expect(sum_to_n_b(0)).toBe(0);
  });

  test("sum_to_n_c should return the sum of numbers from 1 to n using recursion", () => {
    expect(sum_to_n_c(5)).toBe(15);
    expect(sum_to_n_c(10)).toBe(55);
    expect(sum_to_n_c(0)).toBe(0);
  });
});
