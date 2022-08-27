const breedsSelect = document.createElement("select");
const h3 = document.createElement("h3");
h3.innerText = "בחר זן חתולים";
document.body.append(h3);

const fetchBreedNames = async () => {
  const response = await fetch("https://api.thecatapi.com/v1/breeds");
  const data = await response.json();

  return data;
};

const renderSelect = async () => {
  const breedsArr = await fetchBreedNames();
  console.log(breedsArr);

  breedsArr.forEach((breed) => {
    const option = document.createElement("option");
    option.innerText = breed.name;
    option.id = breed.id;
    breedsSelect.append(option);

    // option.addEventListener("touchend", () => {
    //   option.click();
    // });

    // option.addEventListener("touchstart", () => {
    //   option.click();
    // });

    // option.addEventListener("change", () => {
    //   option.click();
    // });
  });
  document.body.append(breedsSelect);
};

breedsSelect.addEventListener("change", async (e) => {
  const response = await fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${e.target.id}`
  );
  const data = await response.json();
  console.log(data);

  clearOldImgs();

  const dogImg = document.createElement("img");
  dogImg.src = data[0].url;

  document.body.append(dogImg);
});

const clearOldImgs = () => {
  const ImgArr = document.querySelectorAll("img");

  ImgArr.forEach((img) => {
    img.parentElement.removeChild(img);
  });
};

renderSelect();
