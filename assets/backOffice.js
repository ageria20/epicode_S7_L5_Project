const saveBtn = document.getElementById("save");
const form = document.querySelector("#createPrduct");
const params = new URLSearchParams(window.location.search);
const productId = params.get("productId");

const Url = productId
  ? "https://striveschool-api.herokuapp.com/api/product/" + productId
  : "https://striveschool-api.herokuapp.com/api/product/";
const methods = productId ? "PUT" : "POST`";

window.addEventListener("DOMContentLoaded", function () {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputName = document.getElementById("floatingName");
    const inputDescription = document.getElementById("floatingDescription");
    const inputBrand = document.getElementById("floatingBrand");
    const inputImage = document.getElementById("floatingImage");
    const inputPrice = document.getElementById("floatingPrice");

    const newProducts = {
      name: inputName.value,
      description: inputDescription.value,
      brand: inputBrand.value,
      imageUrl: inputImage.value,
      price: inputPrice.value,
    };
    console.log(newProducts);

    form.reset();
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
      .then(toBeModify => {
        const {}
      })
      .catch(err => console.log(err));
  });
});
