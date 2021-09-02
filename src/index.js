let addToy = false;
const url = "http://localhost:3000/toys"
const toyCollection = document.getElementById("toy-collection");
// const toyForm = document.querySelector(".add-toy-form");

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener("submit", function (e) {
        e.preventDefault()
        toyFormContainer.style.display = "none";
        postToy(e.target)
        // alert("Toy has been added!")
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

fetch(url)
  .then(resp => resp.json())
  .then(toys => {
    for (toy of toys) {
      addCards(toy);
    };
  });

function postToy(toyForm) {
  const formData = {
    "name": toyForm.name.value,
    "image": toyForm.image.value,
    "likes": 0
  }

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(formData)
  })
    .then(resp => resp.json())
    .then((toyInfo) => addCards(toyInfo))
}

function addCards(toy) {
  let div = document.createElement("div")
  div.classList.add("card")
  toyCollection.appendChild(div)

  let h2 = document.createElement("h2")
  h2.innerText = toy.name

  let img = document.createElement("img")
  img.classList.add("toy-avatar")
  img.src = toy.image

  let par = document.createElement("p")
  par.innerText = `${toy.likes} Likes`

  let btn = document.createElement("button")
  btn.classList.add("like-btn")
  btn.id = toy.id
  btn.innerText = `Like <3`
  btn.addEventListener("click", function (e) {
    addLikes(e);
  })
  div.append(h2, img, par, btn)
}

function addLikes(e) {
  let heart = parseInt(e.target.previousElementSibling.innerText) + 1
  fetch(`${url}/${e.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": heart
    })
  })
    .then(resp => resp.json())
    .then(likes => {
      e.target.previousElementSibling.innerText = `${heart} Likes`
    })
}
