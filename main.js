// 1
const text = prompt("Enter some text");

for (let i = 0; i < 10; i++) {
  console.log(text);
}

// 2
const index = prompt("Enter positive number");

for (let i = 0; i < index; i++) {
  //debugger;
  console.log("Hello");
}

// I've skipped 3 for now

// 4
let input = "";
for (let index = 0; input !== "stop"; index++) {
  input = prompt("Enter a word");
}

// 5
let num = Number(prompt("Enter a number"));
let biggest = num;

for (let index = 0; num !== -1; ) {
  num = Number(prompt("Enter a number"));
  biggest = num > biggest ? num : biggest;
}

console.log(biggest);
