const sum_to_n_a = function (n) {
  return (n * (n + 1)) / 2;
};

const sum_to_n_b = function (n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

const sum_to_n_c = function (n) {
  if (n <= 1) {
    return n;
  }

  return sum_to_n_c(n - 1) + n;
};

module.exports = { sum_to_n_a, sum_to_n_b, sum_to_n_c };

// console.log("Sum to 5:", sum_to_n_a(5)); // 15
// console.log("Sum to 5:", sum_to_n_b(5)); // 15
// console.log("Sum to 5:", sum_to_n_c(5)); // 15
