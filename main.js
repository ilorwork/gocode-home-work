function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
//console.log(getRandomArbitrary(1, 7));

const cardsArray = [
  "&#128525;",
  "&#128525;",
  "&#128561;",
  "&#128561;",
  "&#128564;",
  "&#128564;",
  "&#128520;",
  "&#128520;",
  "&#128545;",
  "&#128545;",
  "&#129313;",
  "&#129313;",
];

const cardCouple = [];

const cards = document.querySelectorAll(".card");
let firstCard = "";

cards.forEach((card) => {
  const randomIndex = getRandomArbitrary(0, cardsArray.length - 1);
  console.log(cardsArray.length - 1);
  const selectedArr = cardsArray.splice(randomIndex, 1);
  const selected = selectedArr[0];
  card.querySelector(".back").innerHTML += selected;
  card.querySelector(".back").id += selected;

  card.addEventListener("click", () => {
    if (card.querySelector(".back").style.backfaceVisibility === "visible")
      return;
    const front = card.querySelector(".front");
    const back = card.querySelector(".back");

    back.style.backfaceVisibility = "visible";

    if (firstCard === "") {
      firstCard = card;
    } else {
      const firstCardFront = firstCard.querySelector(".front");
      const firstCardBack = firstCard.querySelector(".back");
      if (firstCardBack.id !== selected) {
        firstCardBack.style.backfaceVisibility = "hidden";
        back.style.backfaceVisibility = "hidden";
        cardsArray.push(selected);
        cardsArray.push(firstCardBack.innerHTML);
        firstCard = "";
      } else {
        console.log("great!!!");
        firstCard = "";
      }
    }
    // back.style.display = "block";
  });
});
