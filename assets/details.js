const container = document.getElementById("container");
const btnEdit = document.createElement("button");
const params = new URLSearchParams(window.location.search);
console.log(params);

const id = params.get("id");
console.log(id);

const spinner = document.querySelector("#spinner");

const loading = boolean => {
  if (boolean) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};

const getProduct = () => {
  fetch("https://striveschool-api.herokuapp.com/api/product/" + id, {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmU1YzdjMjM5YzAwMTUyZjRiNmMiLCJpYXQiOjE3MTgzNTM1MDAsImV4cCI6MTcxOTU2MzEwMH0.Ul5Z5XSctSrVk3sccrRlw8D-nGKudZsIeUtacK2eHuk",
    },
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else console.log("Errore");
    })
    .then(currProduct => {
      loading(false);
      const row = document.getElementById("row");

      const { name, description, brand, imageUrl, price } = currProduct;
      console.log(currProduct);
      const colImg = document.createElement("div");
      colImg.className = "col-12 col-md-6 col-lg-4 mt-4";
      row.appendChild(colImg);

      const colDescription = document.createElement("div");
      // // attribuisco le classi alla card
      colDescription.className = "col-12 col-md-6 col-lg-4";
      colDescription.classList.add("shadow-sm");
      // // appendo la card alla colonna
      row.appendChild(colDescription);

      // creo le immagini
      const img = document.createElement("img");
      img.className = "bd-placeholder-img card-img-top object-fit-cover";
      img.setAttribute("src", imageUrl);
      img.style.height = "30vh";
      img.setAttribute("alt", description);

      // Appendo l'immagine alla card
      colImg.appendChild(img);
      const cardBody = document.createElement("div");
      cardBody.className = "card-body";
      colDescription.appendChild(cardBody);
      // creo il titolo del body
      const cardTitle = document.createElement("h5");
      cardTitle.className = "card-title";
      cardTitle.innerText = name;
      cardBody.appendChild(cardTitle);
      const brandName = document.createElement("p");
      brandName.className = "lead card-text";
      brandName.innerText = `Brand: ${brand}`;
      cardBody.appendChild(brandName);
      const descriPtion = document.createElement("p");
      descriPtion.className = "card-text";
      descriPtion.innerText = `Description: ${description}`;
      cardBody.appendChild(descriPtion);
      const priceTag = document.createElement("p");
      priceTag.className = "card-text text-primary fw-bold";
      priceTag.innerText = `Price: ${price}$`;
      cardBody.appendChild(priceTag);
      // btn group

      const btnGroupCont = document.createElement("div");
      btnGroupCont.className = "d-flex justify-content-between align-items-center";
      cardBody.appendChild(btnGroupCont);

      const btnGroup = document.createElement("div");
      btnGroup.className = "btn-group";
      btnGroupCont.appendChild(btnGroup);

      btnEdit.type = "button";
      btnEdit.className = "btn btn-sm btn-outline-secondary";
      btnEdit.innerText = `EDIT`;
      btnGroup.appendChild(btnEdit);
      btnEdit.addEventListener("click", function () {
        window.location.assign("./backOffice.html?id=" + id);
      });
    })
    .catch(err => console.log(err));
};

window.addEventListener("DOMContentLoaded", function () {
  getProduct();
});
