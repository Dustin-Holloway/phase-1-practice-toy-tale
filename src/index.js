let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

const bttn = document.querySelector(".add-toy-form");

bttn.addEventListener("submit", (e) => {
  e.preventDefault();

  const newToy = {
    name: e.target.name.value,
    image: e.target.image.value,
  };

  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(newToy),
  })
    .then((res) => res.json())
    .then((toy) => toyRenderer(toy));
});

const toyCollection = document.querySelector("#toy-collection");

const toyRenderer = (toy) => {
  innerHTML = "";
  const toyCard = document.createElement("div");
  toyCard.setAttribute("class", "card");
  toyCollection.append(toyCard);

  // toyCard.src = toy.image;
  const h2 = document.createElement("h2");
  h2.textContent = toy.name;
  const image = document.createElement("img");
  image.setAttribute("class", "toy-avatar");
  image.src = toy.image;

  const p = document.createElement("p");
  p.textContent = toy.likes;
  const btn = document.createElement("button");
  btn.innerText = toy.id;
  btn.addEventListener("click", (e) => {
    innerHTML = "";
    const updatedLikes = {
      likes: (toy.likes += 1),
    };

    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedLikes),
    })
      .then((res) => res.json())
      .then((likes) => {
        // const p = document.createElement("p");
        p.textContent = toy.likes;
        toyCard.append(p, btn);
      });
  });
  toyCard.append(h2, image, p, btn);
};

fetch("http://localhost:3000/toys")
  .then((res) => res.json())
  .then((toys) => {
    toys.forEach(toyRenderer);

    // console.log(toys);
  });
