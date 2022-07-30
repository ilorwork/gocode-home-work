// 1
// const cat = {
//   name: "kitty",
//   color: "black and white",
//   jump: function () {
//     return "Jump!";
//   },
// };

// console.log(cat.color);
// console.log(cat.jump());

// // 2
// const key = prompt("Enter a key");
// const value = prompt("Enter a value");
// cat[key] = value;

// console.log(cat);

// 3
const checkIsCatName = (cat, catName) => {
  const correctName = cat.name === catName ? true : false;
  return correctName;
};

// const isCorrectName = checkIsCatName(cat, "kitty");
// console.log(isCorrectName);

// // 4
// const obj1 = {
//   name: "e",
//   color: "black",
// };

// const obj2 = {
//   age: "s",
//   hight: 180,
// };

// const addTwoObjects = (obj1, obj2) => {
//   for (const key in obj2) {
//     let value = obj2[key];
//     obj1[key] = value;
//   }
//   return obj1;
// };

// const combinedObj = addTwoObjects(obj1, obj2);
// console.log(combinedObj);

// 5
const createCat = (catName) => {
  const cat = {
    name: catName,
  };
  return cat;
};

const createCats = (numOfCats) => {
  const cats = {};

  for (let i = 0; i < numOfCats; i++) {
    cats["cat" + i] = createCat(prompt("enter cat name"));
  }
  return cats;
};

//console.log(createCats(10));

// 6

const cats = createCats(2);

for (const cat in cats) {
  const catNameToCheck = prompt("check the cat name");
  const isCorrectName = checkIsCatName(cats[cat], catNameToCheck);
  console.log("The name is correct:" + isCorrectName);
  console.log(
    "The correct cat name is: " + cats[cat].name,
    " The name you checked is: ",
    catNameToCheck
  );
}
