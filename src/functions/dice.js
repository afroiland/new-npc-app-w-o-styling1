export function rollDice(number, die) {
  let result = 0;
  for (let i = 0; i < number; i++) {
    result = result + Math.floor(Math.random() * die + 1);
  }
  return result;
}