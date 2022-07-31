// 1
// const createArray = (numOfCells) => {
//   //const array = [numOfCells];
//   const array = new Array(numOfCells);
//   return array;
// };

// const numOfCells = Number(prompt("Enter the num of cells for the array"));
// const array = createArray(numOfCells);
// console.log(array);

// // 2
// const doubled = (array1, array2) => {
//   for (let i = 0; i < array2.length; i++) {
//     //debugger;
//     array1[array1.length] = array2[i];
//   }
//   return array1;
// };

// let arr = [40, 100, 1, 5, 25, 10];
// let arr2 = [6, 5, 4];
// // a.push.apply(arr, arr2);
// const mergedArr = doubled(arr, arr2);
// console.log(mergedArr);

// // 3
// const reverseArr = (array) => {
//   let reversedArr = [];
//   for (let i = 0; i < array.length; i++) {
//     reversedArr[i] = array[array.length - (i + 1)];
//   }
//   return reversedArr;
// };

// let arr = [40, 100, 1, 5, 25, 10];
// const reversed = reverseArr(arr);
// console.log(reversed);

// // 4
// const tenLengthArr = (firstValue) => {
//   let array = [];
//   for (let i = 0; i < 10; i++) {
//     array[i] = firstValue + i;
//   }
//   return array;
// };

// const arr = tenLengthArr(Number(prompt("Enter the first value")));
// console.log(arr);

// // 5
// const createDog = (dogEyeColor, dogWeight, dogAge) => {
//   dog = {
//     eyeColor: dogEyeColor,
//     weight: dogWeight,
//     age: dogAge,
//   };
//   return dog;
// };

// const getDogs = () => {
//   let dogsArr = [];
//   for (let i = 0; i < 2; i++) {
//     const dogEyeColor = prompt("Enter the dog's eye color");
//     const dogWeight = Number(prompt("Enter the dog's weight"));
//     const dogAge = Number(prompt("Enter the dog's age"));
//     dogsArr[i] = createDog(dogEyeColor, dogWeight, dogAge);
//   }
//   return dogsArr;
// };

// console.log(getDogs());
