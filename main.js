// // 1
// const inputElement = document.createElement("input");
// const btnElement = document.createElement("button");

// btnElement.innerText = "show";

// document.body.appendChild(inputElement);
// document.body.appendChild(btnElement);

// btnElement.addEventListener("click", () => {
//   alert(inputElement.value);
// });

// // 2
// document.body.addEventListener("mousemove", (e) => {
//   const x = e.screenX;
//   const y = e.screenY;
//   console.log(`cordinate x: ${x}, cordinate y: ${y}`);
// });

// // 3
// // I'v added a verification and clear for the input content for the fun.
// const addImgFromUserLink = () => {
//   if (!inputElement.value) {
//     return;
//   }
//   const imgElement = document.createElement("img");
//   imgElement.src = inputElement.value;
//   document.body.appendChild(imgElement);

//   inputElement.value = "";
// };
// const inputElement = document.createElement("input");
// const btnElement = document.createElement("button");

// btnElement.innerText = "show";

// document.body.appendChild(inputElement);
// document.body.appendChild(btnElement);

// btnElement.addEventListener("click", () => {
//   addImgFromUserLink();
// });

// // 4
// const numbers = [1, 2, 3, 4, 5, 6, 7, 8];
// console.log(numbers);
// const removeBtn = document.createElement("button");
// removeBtn.innerText = "Remove";

// document.body.appendChild(removeBtn);

// removeBtn.addEventListener("click", () => {
//   numbers.pop();
//   console.log(numbers);
// });

// // 5
// const bgcolorBtnOnClick = (button, bgcolor) => {
//   button.addEventListener("click", () => {
//     document.body.style.backgroundColor = bgcolor;
//   });
// };

// colors = {
//   black: "black",
//   blue: "blue",
//   red: "red",
//   green: "green",
// };

// const createBgcBtn = (color) => {
//   const button = document.createElement("button");
//   button.className = `${color} button`;
//   button.innerText = color;
//   document.body.appendChild(button);
//   return button;
// };

// // const blackBtn = document.createElement("button");
// // const blueBtn = document.createElement("button");
// // const redBtn = document.createElement("button");
// // const greenBtn = document.createElement("button");

// // blackBtn.className = "black button";
// // blueBtn.className = "blue button";
// // redBtn.className = "red button";
// // greenBtn.className = "green button";

// // blackBtn.innerText = "black";
// // blueBtn.innerText = "blue";
// // redBtn.innerText = "red";
// // greenBtn.innerText = "green";

// // document.body.appendChild(blackBtn);
// // document.body.appendChild(blueBtn);
// // document.body.appendChild(redBtn);
// // document.body.appendChild(greenBtn);

// const blackBtn = createBgcBtn(colors.black);
// const blueBtn = createBgcBtn(colors.blue);
// const redBtn = createBgcBtn(colors.red);
// const greenBtn = createBgcBtn(colors.green);

// bgcolorBtnOnClick(blackBtn, colors.black);
// bgcolorBtnOnClick(blueBtn, colors.blue);
// bgcolorBtnOnClick(redBtn, colors.red);
// bgcolorBtnOnClick(greenBtn, colors.green);

// // 6
// const getRandomArbitrary = (min, max) => {
//   return Math.floor(Math.random() * (max - min) + min);
// };

// const colors = ["black", "blue", "red", "green", "grey"];

// setInterval(() => {
//   const randIndex = getRandomArbitrary(0, colors.length);
//   console.log(colors[randIndex]);
//   document.body.style.backgroundColor = colors[randIndex];
// }, 2000);
