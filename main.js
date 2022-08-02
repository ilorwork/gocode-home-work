// const powArray = (arr) => {
//   let newArr = [];
//   for (let i = 0; i < arr.length; i++) {
//     newArr[i] = arr[i] ** 2;
//   }
//   return newArr;
// };

// const numbersArr = [2, 3, 4];

// console.log(powArray(numbersArr));

// const powedArr = numbersArr.map((num) => {
//   return num ** 2;
// });
// console.log(powedArr);

// // 2
// // Here I tried to solve this using custome sorting or somthing.
// const sortStringList = (arr, orderByASC) => {
//   arr.sort((item) => {
//     if(item > )
//   });
//   if (!orderByASC) {
//     arr.reverse();
//   }
//   return arr;
// };

// // The first way.
// const sortStringList = (arr, orderByASC) => {
//   arr.sort();
//   if (!orderByASC) {
//     arr.reverse();
//   }
//   return arr;
// };

// const namesArr = ["Avi", "Dani", "shuki", "mOshe", "arik"];
// console.log(sortStringList(namesArr, true));
// console.log(sortStringList(namesArr, false));

// // 3
// const last = (arr, num) => {
//   if (num <= 0 || typeof num === "undefined") {
//     // Do not use pop, it will cut the end of the original array.
//     const lastCellArr = [arr[arr.length - 1]];
//     return lastCellArr;
//   } else if (num > arr.length) {
//     return arr;
//   }
//   return arr.slice(arr.length - num, arr.length);
// };

// const lastUsingLoop = (arr, num) => {
//   if (num <= 0 || typeof num === "undefined") {
//     // Do not use pop, it will cut the end of the original array.
//     const lastCellArr = [arr[arr.length - 1]];
//     return lastCellArr;
//   } else if (num > arr.length) {
//     return arr;
//   }

//   lastArr = [];
//   let index = 0;
//   for (let j = arr.length - num; j < arr.length; j++) {
//     lastArr[index] = arr[j];
//     index++;
//   }
//   return lastArr;
// };

// const numbers = [1, 2, 3, 4, 5, 6, 7, 9];
// console.log(last(numbers));
// console.log(numbers);
// console.log(lastUsingLoop(numbers, -1));
// console.log(numbers);

// // 4
// const noCapital = (arr) => {
//   return arr.filter((name) => {
//     return name.toLowerCase() === name;
//   });
// };

// const namesArr = ["Avi", "Dani", "shuki", "mOshe", "arik"];
// console.log(noCapital(namesArr));

// // 5
// const reverseStr = (arr) => {
//   return arr.reverse();
// };

// const namesArr = ["Avi", "Dani", "shuki", "mOshe", "arik"];
// console.log(reverseStr(namesArr));

// // 5
// const reverseStr = (str) => {
//   const arr = str.split("");
//   arr.reverse();
//   const reversed = arr.join("");
//   return reversed;
// };

// // const name = "Dani";
// // console.log(reverseStr(name));

// // 6
// const findPolindroms = (arr) => {
//   return arr.filter((word) => reverseStr(word) === word);
// };

// const wordsArr = ["aba", "goog", "shuki", "bgugb", "arik", "a", "rr", "fdsa"];
// console.log(findPolindroms(wordsArr));

// // 7
// const delAnimals = (animals, animalsToDelete) => {
//   return animals.filter((animal) => {
//     return animalsToDelete.findIndex((an) => an === animal) === -1;
//   });
// };

// // Another way using indexOf method.
// // const delAnimals = (animals, animalsToDelete) => {
// //   return animals.filter((animal) => animalsToDelete.indexOf(animal) === -1);
// // };

// const animalsArr = ["lion", "camel", "fly", "butterfly", "zebra", "monky"];
// const animalsToDelArr = ["fly", "butterfly"];
// console.log(delAnimals(animalsArr, animalsToDelArr));

// // 8
// function getRandomArbitrary(min, max) {
//   return Math.floor(Math.random() * (max - min) + min);
// }
// //console.log(getRandomArbitrary(1, 7));

// const guessNumber = () => {
//   const generatedNum = getRandomArbitrary(1, 7);
//   console.log(generatedNum);
//   const guesses = [];
//   while (true) {
//     let guessedNum = Number(prompt("Guess the num (between 1-6)"));
//     if (guessedNum === generatedNum) {
//       console.log("Correct!");
//       console.log("Your wrong guesses were: " + guesses);
//       break;
//     }
//     guesses.push(guessedNum);
//   }
// };

// guessNumber();

// 9 - seemed like we need to use sort

// // 10
// // a:
// const a = [1, 2];
// let b = [];
// b = a;
// console.log(b);

// // b:
// const c = [1, 2];
// let d = c.map((o) => o);
// console.log(d);

// // c:
// const e = [1, 2];
// let f = [];

// for (let i = 0; i < e.length; i++) {
//   f[i] = e[i];
// }

// console.log(f);
