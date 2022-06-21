import { tuple } from "./utils";

export type Question = {
  question: string;
  answer: string;
  type: string;
};
export type Questions = Array<Question>;

function shuffleArray<T>(array: T[]) {
  // Randomize array in-place using Durstenfeld shuffle algorithm
  // https://stackoverflow.com/a/12646864/1804173
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function randChoice<T>(choices: Array<T>): T {
  return choices[Math.floor(Math.random() * choices.length)];
}

function randSwap<T>(a: T, b: T): [T, T] {
  if (Math.random() < 0.5) {
    return tuple(a, b);
  } else {
    return tuple(b, a);
  }
}

function formatWithSeparators(x: number): string {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, "'");
}

function genRange(low: number, high: number) {
  return Math.floor(Math.random() * (high - low + 1)) + low;
}

function genDigit(): number {
  return genRange(0, 9);
}

function genNonZeroDigit(): number {
  return genRange(1, 9);
}

function genNumberWithDigits(n: number): number {
  let x = genNonZeroDigit();
  n -= 1;
  while (n > 0) {
    x = x * 10 + genDigit();
    n -= 1;
  }
  return x;
}

function genSemiNiceTwoDigitNumber(): number {
  while (true) {
    const x = genNonZeroDigit() * 10 + randChoice([0, 5]);
    if (x !== 10) {
      return x;
    }
  }
}

function genNiceTwoDigitNumber(): number {
  return randChoice([12, 15, 16, 20, 25, 30, 40, 45, 50, 60, 70, 80, 90]);
}

function genTeen(): number {
  return randChoice([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
}

function genOrderOfMagnitude(orders: number) {
  let choices = [1];
  for (let order = 1; order <= orders; ++order) {
    choices.push(Math.pow(10, order));
  }
  return randChoice(choices);
}

function addTwo(): Question {
  const a = genNumberWithDigits(3);
  const b = genNumberWithDigits(3);
  const result = a + b;
  return {
    question: `${a} + ${b}`,
    answer: `${result}`,
    type: "Add two",
  };
}

function addFour(factor: number = 1): Question {
  const a = genNumberWithDigits(2) * factor;
  const b = genNumberWithDigits(2) * factor;
  const c = genNumberWithDigits(2) * factor;
  const d = genNumberWithDigits(2) * factor;
  const result = a + b + c + d;
  return {
    question:
      factor >= 1
        ? `${a} + ${b} + ${c} + ${d}`
        : `${a.toFixed(2)} + ${b.toFixed(2)} + ${c.toFixed(2)} + ${d.toFixed(
            2
          )}`,
    answer: `${result}`,
    type: `Add four (factor)`,
  };
}

function subtractFour(factor: number = 1): Question {
  const a = genNumberWithDigits(2) * factor * 2;
  const b = genNumberWithDigits(2) * factor;
  const c = genNumberWithDigits(2) * factor;
  const d = genNumberWithDigits(2) * factor;
  const result = a - b - c - d;
  return {
    question:
      factor >= 1
        ? `${a} - ${b} - ${c} - ${d}`
        : `${a.toFixed(2)} - ${b.toFixed(2)} - ${c.toFixed(2)} - ${d.toFixed(
            2
          )}`,

    answer: `${result}`,
    type: `Subtract four (factor)`,
  };
}

function multiplyTwo(): Question {
  let a = genNumberWithDigits(2);
  let b = genNiceTwoDigitNumber();
  [a, b] = randSwap(a, b);
  const result = a * b;
  return {
    question: `${a} · ${b}`,
    answer: `${result}`,
    type: "Multiply two",
  };
}

function divideTwo(): Question {
  let a = genNumberWithDigits(2);
  let b = genNiceTwoDigitNumber();
  [a, b] = randSwap(a, b);
  const result = a * b;
  return {
    question: `${result} / ${a}`,
    answer: `${b}`,
    type: "Divide two",
  };
}

function multiplyTwoTeen(): Question {
  let a = genTeen();
  let b = genTeen();
  const result = a * b;
  return {
    question: `${a} · ${b}`,
    answer: `${result}`,
    type: "Multiply two (1X)",
  };
}

function divideTwoTeen(): Question {
  let a = genTeen();
  let b = genTeen();
  const result = a * b;
  return {
    question: `${result} / ${a}`,
    answer: `${b}`,
    type: "Divide two (1X)",
  };
}

function multiplyMagnitudes(): Question {
  let a = genRange(2, 20) * genOrderOfMagnitude(4);
  let b = genRange(2, 20) * genOrderOfMagnitude(4);
  const result = a * b;
  return {
    question: `${formatWithSeparators(a)} · ${formatWithSeparators(b)}`,
    answer: `${formatWithSeparators(result)}`,
    type: "Multiply two (orders of magnitudes)",
  };
}

function divideMagnitudes(): Question {
  let a = genRange(2, 20) * genOrderOfMagnitude(4);
  let b = genRange(2, 20) * genOrderOfMagnitude(4);
  const result = a * b;
  return {
    question: `${formatWithSeparators(result)} / ${formatWithSeparators(a)}`,
    answer: `${formatWithSeparators(b)}`,
    type: "Divide two (orders of magnitudes)",
  };
}

export function prepareGenerators(
  baseGenerators: Array<() => Question>,
  numToGenerate: number
): Array<() => Question> {
  const generators = [];

  let i = 0;
  while (generators.length < numToGenerate) {
    generators.push(baseGenerators[i]);
    i = (i + 1) % baseGenerators.length;
  }

  shuffleArray(generators);
  return generators;
}

export function generateQuestions(numToGenerate: number = 20): Questions {
  const baseGenerators = [
    multiplyTwo,
    divideTwo,
    multiplyTwoTeen,
    divideTwoTeen,
    addTwo,
    addFour,
    () => addFour(0.1),
    subtractFour,
    multiplyMagnitudes,
    multiplyMagnitudes,
    multiplyMagnitudes,
    multiplyMagnitudes,
    multiplyMagnitudes,
    multiplyMagnitudes,
    divideMagnitudes,
    divideMagnitudes,
    divideMagnitudes,
    divideMagnitudes,
    divideMagnitudes,
    divideMagnitudes,
  ];
  return prepareGenerators(baseGenerators, numToGenerate).map((gen) => gen());
}
