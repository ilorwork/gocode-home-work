const baseAPI = "https://reqres.in/api/users/"

const fetchData = async (api) => {
    const response = await fetch(api)
    const data = await response.json()
    return data
}

const renderUsersData = async () => {
    const data = await fetchData(baseAPI)
    const usersDataArr = data.data

    usersDataArr.forEach(userData => {

        const container = document.createElement("a")
        const avatar = document.createElement("img")
        const fullName = document.createElement("p")
        const email = document.createElement("p")

        container.href = baseAPI + userData.id
        avatar.src = userData.avatar
        const userFullName = userData.first_name + " " + userData.last_name
        fullName.innerText = userFullName
        email.innerText = userData.email

        container.append(avatar, fullName, email)
        document.body.appendChild(container)

        container.addEventListener("click", async (e) => {
            // This stops the link from actually being followed which is the 
            // default action 
            e.preventDefault();

            const userDataApi = container.href
            const data = await fetchData(userDataApi)
            userData = data.data

            console.log(userData)
            alert(`avatar: ${userData.avatar}
full name: ${userFullName}
email: ${userData.email}`
            )
        })
    });
}

renderUsersData()