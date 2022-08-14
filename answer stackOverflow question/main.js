// this meant to be an answer to this:
// https://stackoverflow.com/questions/8813674/javascript-popup-alert-on-link-click/8813699#8813699
// but I dont have enough repitation points or something

const a = document.createElement("a");
a.href = "#your path";
a.innerText = "your";
document.body.appendChild(a);

a.addEventListener("click", (e) => {
  // This stops the link from actually being followed which is the
  // default action
  e.preventDefault();
  alert("I stoped you!");
});
