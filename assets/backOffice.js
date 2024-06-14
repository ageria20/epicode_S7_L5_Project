const saveBtn = document.getElementById("save");
const form = document.querySelector("#createPrduct");
const resetBtn = document.getElementById("reset");
const tipo = document.getElementById("tipo");
const deleteBtn = document.querySelector("#delete");
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

const inputName = document.getElementById("floatingName");
const inputDescription = document.getElementById("floatingDescription");
const inputBrand = document.getElementById("floatingBrand");
const inputImage = document.getElementById("floatingImage");
const inputPrice = document.getElementById("floatingPrice");

const Url = productId
  ? "https://striveschool-api.herokuapp.com/api/product/" + productId
  : "https://striveschool-api.herokuapp.com/api/product/";
const methods = productId ? "PUT" : "POST";

window.addEventListener("DOMContentLoaded", function () {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const newProducts = {
      name: inputName.value,
      description: inputDescription.value,
      brand: inputBrand.value,
      imageUrl: inputImage.value,
      price: inputPrice.value,
    };

    fetch(Url, {
      method: methods,
      body: JSON.stringify(newProducts),
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmU1YzdjMjM5YzAwMTUyZjRiNmMiLCJpYXQiOjE3MTgzNTM1MDAsImV4cCI6MTcxOTU2MzEwMH0.Ul5Z5XSctSrVk3sccrRlw8D-nGKudZsIeUtacK2eHuk",
      },
    })
      .then(resp => {
        if (resp.ok) return resp.json();
        else console.log("Errore");
      })
      .then(createdProduct => {
        if (productId) {
          alert(`Product: ${createdProduct.name}
id: ${createdProduct._id} MODIFIED!`);

          window.location.assign("./home.html");
        } else {
          alert(`Product: ${createdProduct.name}
id: ${createdProduct._id} CREATED!`);
          form.addEventListener("reset", function () {
            window.location.assign("./home.html");
          });
          window.location.assign("./home.html");
        }
      })
      .catch(err => console.log(err));
  });

  if (productId) {
    saveBtn.innerText = "Edit";
    tipo.innerText = "Edit Product";

    resetBtn.classList.add("d-none");
    deleteBtn.innerText = "Delete";
    deleteBtn.className = "btn btn-danger";
    deleteBtn.classList.remove("d-none");
    deleteBtn.addEventListener("click", function () {
      const confirmed = confirm(`Do you want to delete this product?`);

      if (confirmed) {
        fetch(Url, {
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmU1YzdjMjM5YzAwMTUyZjRiNmMiLCJpYXQiOjE3MTgzNTM1MDAsImV4cCI6MTcxOTU2MzEwMH0.Ul5Z5XSctSrVk3sccrRlw8D-nGKudZsIeUtacK2eHuk",
          },
        })
          .then(resp => {
            if (resp.ok) {
              return resp.json();
            }
          })
          .then(deletedProduct => {
            alert("You have deleted " + deletedProduct.name);
            window.location.assign("/home.html");
          })
          .catch(err => console.log(err));
      }
    });
    fetch(Url, {
      method: methods,
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjZiZmU1YzdjMjM5YzAwMTUyZjRiNmMiLCJpYXQiOjE3MTgzNTM1MDAsImV4cCI6MTcxOTU2MzEwMH0.Ul5Z5XSctSrVk3sccrRlw8D-nGKudZsIeUtacK2eHuk",
      },
    })
      .then(resp => resp.json())
      .then(currProduct => {
        const { name, description, brand, imageUrl, price } = currProduct;
        console.log(currProduct);
        inputName.value = name;
        inputDescription.value = description;
        inputBrand.value = brand;
        inputImage.value = imageUrl;
        inputPrice.value = price;
      });
  } else {
    tipo.innerText = "Insert a Product";
    saveBtn.classList.add("bg-info");
  }
});
