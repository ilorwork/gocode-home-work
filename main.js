const resultsArr = ["fdsafds", "asdf", "aasdf", "sdf", "fafds"];
const input = document.querySelector("input");
const itemsContainer = document.createElement("div");
renderResults(resultsArr);

document.body.append(itemsContainer);

input.addEventListener("keyup", () => {
  const startsWithArr = resultsArr.filter((res) => res.startsWith(input.value));
  const includsArr = resultsArr.filter((res) => res.includes(input.value));
  const filteredArr = [...new Set([...startsWithArr, ...includsArr])];

  renderResults(filteredArr);
});

function renderResults(arr) {
  itemsContainer.innerHTML = "";
  arr.forEach((item) => {
    const itemElement = document.createElement("div");
    itemElement.innerText = item;
    itemsContainer.append(itemElement);
  });
}
