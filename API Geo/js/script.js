const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputCodePostal = document.querySelector(".codepostal")
    getInfosAPI(inputCodePostal);
})

function getInfosAPI(inputCodePostal) {
    const result = document.querySelector(".result");
    fetch("https://geo.api.gouv.fr/communes?codePostal="+inputCodePostal.value+"&fields=nom,code,codesPostaux,population")
    .then((response) => response.json())
    .then((data) => {
        // console.log(data)
        result.innerHTML = "Code INSEE : " + data[0].code + "<br>"
        result.innerHTML += "Nom : " + data[0].nom + "<br>"
        result.innerHTML += "Liste des CP : <ul>"

        data[0].codesPostaux.forEach((codePostal) => {
            result.innerHTML += "<li>" + codePostal + "</li>"
        })
        result.innerHTML += "</ul>"
        result.innerHTML += "Population : " + data[0].population + " habitants<br>"
    })
    .catch((error) => result.innerHTML = error)
}