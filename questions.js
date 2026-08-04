// questions.js
// Data only — no logic here. Each question object follows the shape
// defined in the project plan: questionText, options, correctAnswer (index).

  


export const questions = [
  {
    questionText: "Which method converts a JavaScript object into a JSON string?",
    options: ["JSON.parse()", "JSON.stringify()", "Object.toString()", "Object.freeze()"],
    correctAnswer: 1
  },
  {
    questionText: "How do you access the value of the 'name' property on an object called 'user'?",
    options: ["user->name", "user.name", "user::name", "user[name]"],
    correctAnswer: 1
  },
  {
    questionText: "What does the following expression return? '5' + 3",
    options: ["8", "'53'", "NaN", "Error"],
    correctAnswer: 1
  },
  {
    questionText: "What is the correct way to write a template literal?",
    options: [
      "\"Hello \" + name",
      "'Hello ' . name",
      "`Hello ${name}`",
      "Hello {name}"
    ],
    correctAnswer: 2
  },
  {
    questionText: "Inside a template literal, how do you embed a variable called 'price'?",
    options: ["{price}", "${price}", "%price%", "#{price}"],
    correctAnswer: 1
  },
  {
    questionText: "What does 0.1 + 0.2 === 0.3 evaluate to in JavaScript?",
    options: ["true", "false", "0.3", "undefined"],
    correctAnswer: 1
  },
  {
    questionText: "Why does floating-point currency math (e.g. 0.1 + 0.2) produce rounding errors?",
    options: [
      "JavaScript stores numbers as text by default",
      "Decimal fractions can't always be represented exactly in binary",
      "The + operator only works on integers",
      "It's a bug that was fixed in ES6"
    ],
    correctAnswer: 1
  },
  {
    questionText: "What's a common way to safely handle currency values and avoid floating-point errors?",
    options: [
      "Always round to 2 decimal places before comparing",
      "Work in the smallest unit (e.g. cents) as whole numbers",
      "Store the amount as a string and never do math on it",
      "Both A and B are common approaches"
    ],
    correctAnswer: 3
  },
  {
    questionText: "Which method adds a new key-value pair to an existing object called 'car'?",
    options: [
      "car.push('color', 'red')",
      "car.color = 'red'",
      "car.add('color': 'red')",
      "car.new('color', 'red')"
    ],
    correctAnswer: 1
  },
  {
    questionText: "What does Object.keys(user) return?",
    options: [
      "The values stored in the object",
      "An array of the object's property names",
      "A single string of all properties combined",
      "The number of properties in the object"
    ],
    correctAnswer: 1
  }
];


