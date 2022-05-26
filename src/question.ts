export type Question = {
  question: string;
  answer: string;
  type: string;
};
export type Questions = Array<Question>;

function genDigit(): number {
  return Math.floor(Math.random() * 10);
}

function genNonZeroDigit(): number {
  return 1 + Math.floor(Math.random() * 9);
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

function addFour(): Question {
  const a = genNumberWithDigits(2);
  const b = genNumberWithDigits(2);
  const c = genNumberWithDigits(2);
  const d = genNumberWithDigits(2);
  const result = a + b + c + d;
  return {
    question: `${a} + ${b} + ${c} + ${d}`,
    answer: `${result}`,
    type: "Add four",
  };
}

function multiplyTwo(): Question {
  const a = genNumberWithDigits(2);
  const b = genNumberWithDigits(2);
  const result = a * b;
  return {
    question: `${a} · ${b}`,
    answer: `${result}`,
    type: "Multiply two",
  };
}

function divideTwo(): Question {
  const a = genNumberWithDigits(2);
  const b = genNumberWithDigits(2);
  const result = a * b;
  return {
    question: `${result} / ${a}`,
    answer: `${b}`,
    type: "Divide two",
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

export function generateQuestions(numToGenerate: number = 10): Questions {
  const baseGenerators = [addTwo, addFour, multiplyTwo, divideTwo];
  return prepareGenerators(baseGenerators, numToGenerate).map((gen) => gen());
}

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
