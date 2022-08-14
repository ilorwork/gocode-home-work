const baseApi = "https://api.thecatapi.com/v1/images/search?limit=10";
const container = document.createElement("div");
let pageIndex = 0;

const fetchCatImgs = async (api) => {
  const response = await fetch(api);
  const data = await response.json();

  return data;
};

const renderImages = async (api) => {
  const catsImgsArr = await fetchCatImgs(api);

  catsImgsArr.forEach((cat) => {
    const catImg = document.createElement("img");
    catImg.src = cat.url;

    container.append(catImg);
  });

  document.body.append(container);

  renderPagenation();
};

const renderPagenation = async () => {
  const pagenationContainer = document.createElement("div");
  const previousBtn = document.createElement("button");
  const nextBtn = document.createElement("button");

  previousBtn.innerText = "previous";
  nextBtn.innerText = "next";

  pagenationContainer.append(previousBtn);

  for (let i = 0; i < 10; i++) {
    const button = document.createElement("button");
    button.innerText = i + 1;
    pagenationContainer.append(button);

    button.addEventListener("click", async () => {
      const pageApi = buildPagePath(i + 1);

      container.innerHTML = "";
      pagenationContainer.innerHTML = "";

      await renderImages(pageApi);
      pageIndex = i + 1;
    });
  }

  pagenationContainer.append(nextBtn);
  document.body.append(pagenationContainer);

  previousBtn.addEventListener("click", async () => {
    if (pageIndex < 2) return;

    const pageApi = buildPagePath(pageIndex - 1);

    container.innerHTML = "";
    pagenationContainer.innerHTML = "";

    await renderImages(pageApi);
    pageIndex = pageIndex - 1;
  });

  nextBtn.addEventListener("click", async () => {
    if (pageIndex === 10) return;

    const pageApi = buildPagePath(pageIndex + 1);

    container.innerHTML = "";
    pagenationContainer.innerHTML = "";

    await renderImages(pageApi);
    pageIndex = pageIndex + 1;
  });
};

const buildPagePath = (pageNum) => {
  const searchParams = new URLSearchParams(`&page=${pageNum}`);
  const pageApi = baseApi + searchParams;
  return pageApi;
};

renderImages(baseApi);
