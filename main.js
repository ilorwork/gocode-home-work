// // 1
// const last2 = (str) => {
//   const last2Chars = str.slice(str.length - 3, str.length - 1);
//   return last2Chars;
// };

// console.log(last2("str"));

// 2

// // 3
// const instancesOfChar = (str, char) => {
//   //   return str.replace(/[^char]/g, "").length;
//   if (str.include(char)) {
//     return 0;
//   }

//   let counter = 0;
//   for (let i = 0; i < str.length; i++) {
//     if (str[i] === char) {
//       counter++;
//     }
//   }
//   return counter;
// };

// console.log(instancesOfChar("chafffrf", "f"));

// // 4
// const combineTwoStrings = (firstStr, secStr) => {
//   let combinedStr = "";
//   for (let i = 0; i < firstStr.length; i++) {
//     combinedStr += firstStr[i];
//     combinedStr += secStr[i];
//   }
//   return combinedStr;
// };

// console.log(combineTwoStrings("asdf", "asdf"));

// // 5
// const combineTwoStrings = (firstStr, secStr) => {
//   //debugger;
//   let combinedStr = "";
//   const longestSize =
//     firstStr.length >= secStr.length ? firstStr.length : secStr.length;

//   for (let i = 0; i < longestSize; i++) {
//     if (firstStr.length > i) {
//       combinedStr += firstStr[i];
//     }
//     if (secStr.length > i) {
//       combinedStr += secStr[i];
//     }
//   }
//   return combinedStr;
// };

// console.log(combineTwoStrings("fdsafdsa", "fdsa"));

// // 6
// const uniqueChars = (str) => {
//   let newStr = "";

//   for (let i = 0; i < str.length; i++) {
//     if (!newStr.includes(str[i])) {
//       newStr += str[i];
//     }
//   }
//   return newStr;
// };

// console.log(uniqueChars("11asdfasdf"));

// 7
// const firstuniqueChar = (str) => {
//   let slicedStr = "";
//   let helpStr = str;

//   for (let i = 0; i < str.length; i++) {
//     debugger;
//     slicedStr = str.slice(i + 1);
//     if (!slicedStr.includes(str[i])) {
//       return str[i];
//     } else {
//       helpStr = str.replace(str[i], "");
//     }
//   }
// };

// 7
const firstuniqueChar = (str) => {
  let notUniqeChars = "";
  for (let i = 0; i < str.length; i++) {
    let amount = str.indexOf(str[i], i + 1);
    if (amount === -1 && !notUniqeChars.includes(str[i])) {
      return str[i];
    }
    notUniqeChars += str[i];
  }
  return -1;
};

console.log(firstuniqueChar("11as8Rdfasdf"));

// let str1 = "";
// let notUniqeChars = "";
// notUniqeChars += str1;

// let s = "fdsafdsa";
// let char = "f";
// const regex = new RegExp(char, "g")
// const a = s.replace(regex, "");

// console.log(s);
// console.log(a);
