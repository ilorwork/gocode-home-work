const fetchUsersData = async () => {
    const response = await fetch("https://reqres.in/api/users")
    const data = await response.json()
    return data.data
}

const renderUsersData = async () => {
    const usersDataArr = await fetchUsersData()

    usersDataArr.forEach(userData => {
        console.table(userData)

        const container = document.createElement("div")
        const avatar = document.createElement("img")
        const fullName = document.createElement("p")
        const email = document.createElement("p")

        avatar.src = userData.avatar
        fullName.innerText = userData.first_name + " " + userData.last_name
        email.innerText = userData.email

        container.append(avatar, fullName, email)
        document.body.appendChild(container)
    });
}

renderUsersData()