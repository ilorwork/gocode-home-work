const getUserBtn = document.createElement("button")
getUserBtn.innerText = "get a user"
document.body.appendChild(getUserBtn)


getUserBtn.addEventListener("click", async () => {
    const response = await fetch("https://randomuser.me/api/");

    const data = await response.json();

    const userData = data.results[0];

    console.log(userData)

    const userInfoContainer = document.createElement("div")
    const userImg = document.createElement("img")
    const userNameTitle = document.createElement("h3")

    userImg.src = userData.picture.thumbnail;
    userNameTitle.innerText = userData.name.first + " " + userData.name.last;

    userInfoContainer.append(userImg, userNameTitle)
    document.body.appendChild(userInfoContainer)
})