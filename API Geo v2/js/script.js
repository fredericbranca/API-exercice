const inputCodePostal = document.querySelector(".codepostal");

inputCodePostal.addEventListener("focusout", (event) => {
  getInfosAPI(inputCodePostal);
});

function getInfosAPI(inputCodePostal) {
  const result = document.querySelector(".result");
  fetch(
    "https://geo.api.gouv.fr/communes?codePostal=" +
      inputCodePostal.value +
      "&fields=nom"
  )
    .then((response) => response.json())
    .then((data) => {
      result.innerHTML = "<option>Liste des villes</option>";
      data.forEach((data) => {
        result.innerHTML += "<option>" + data.nom + "</option>";
      });
    })
    .catch((error) => (result.innerHTML = error));
}
