const productList = document.getElementById("containerList");
const row = document.getElementById("row");

const spinner = document.querySelector("#spinner");

const loading = boolean => {
  if (boolean) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};

window.addEventListener("DOMContentLoaded", function () {
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmU1YzdjMjM5YzAwMTUyZjRiNmMiLCJpYXQiOjE3MTgzNTM1MDAsImV4cCI6MTcxOTU2MzEwMH0.Ul5Z5XSctSrVk3sccrRlw8D-nGKudZsIeUtacK2eHuk",
    },
  })
    .then(resp => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Errore nella fetch");
      }
    })
    .then(products => {
      loading(false);
      products.forEach(product => {
        // // creo la colonna
        const col = document.createElement("div");
        // //attribuisco alla col
        col.className = "col-md-4";
        // // appendo la col alla row
        row.appendChild(col);
        // // creo la card
        const card = document.createElement("div");
        // // attribuisco le classi alla card
        card.classList.add("card");
        card.classList.add("mb-4");
        card.classList.add("shadow");
        // // appendo la card alla colonna
        col.appendChild(card);

        // creo le immagini
        const img = document.createElement("img");
        img.className = "bd-placeholder-img card-img-top object-fit-cover";
        img.setAttribute("src", product.imageUrl);
        img.style.height = "30vh";
        img.setAttribute("alt", product.alt);

        // Appendo l'immagine alla card
        card.appendChild(img);
        const cardBody = document.createElement("div");
        cardBody.className = "card-body";
        card.appendChild(cardBody);
        // creo il titolo del body
        const cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.innerText = product.name;
        cardBody.appendChild(cardTitle);
        const brandName = document.createElement("p");
        brandName.className = "lead card-text";
        brandName.innerText = `Brand: ${product.brand}`;
        cardBody.appendChild(brandName);
        const description = document.createElement("p");
        description.className = "card-text";
        description.innerText = `Description ${product.brand}`;
        const priceTag = document.createElement("p");
        priceTag.className = "card-text text-primary";
        priceTag.innerText = `Price: ${product.price}`;
        cardBody.appendChild(priceTag);
        // btn group

        const btnGroupCont = document.createElement("div");
        btnGroupCont.className = "btn-group";
        cardBody.appendChild(btnGroupCont);

        const btnGroup = document.createElement("div");
        btnGroup.className = "btn-group";
        btnGroupCont.appendChild(btnGroup);
        const btnView = document.createElement("button");
        btnView.type = "button";
        btnView.className = "btn btn-sm btn-secondary";
        btnView.innerText = `VIEW`;
        btnGroup.appendChild(btnView);
        btnView.addEventListener("click", function () {
          window.location.assign("./details.html?id=" + product._id);
        });
        const btnEdit = document.createElement("button");
        btnEdit.type = "button";
        btnEdit.className = "btn btn-sm btn-primary";
        btnEdit.innerText = `EDIT`;
        btnGroup.appendChild(btnEdit);
        btnEdit.addEventListener("click", function () {
          window.location.assign("./backOffice.html?id=" + product._id);
        });

        console.log(product._id);
      });
    });
});
