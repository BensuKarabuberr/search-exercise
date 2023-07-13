const formWrapper = document.querySelector(".formWrapper");
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const buttonWrappper = document.querySelector(".buttonWrapper");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const imgListWrapper = document.querySelector(".imageList-wrapper");
//search kısmının dinamik bir şekilde çalışması ;

runEventListeners();

function runEventListeners() {
  form.addEventListener("submit", search);
  clearButton.addEventListener("click", beClear); // click olduğunda beClear fonksiyonunu çalıştır demek aslında
}
//clear button kısmı

function beClear() {
  searchInput.value = ""; // search kısmına bir şey yazdığında yazılanı clear buttonu ile silmek için yazılan kod
  imgListWrapper.innerHTML = ""; // clear butonu ile resimleri kaldırma.
}

function search(e) {
  const girilenValue = searchInput.value.trim();

  fetch(`https://api.unsplash.com/search/photos?query=${girilenValue}`, {
    method: "GET",
    headers: {
      Authorization: "Client-ID TOViCTIx_wIc2_iWiUswXr8cJseRIPVck1M2EPftGPQ",
    },
  })
    .then((rest) => rest.json())
    .then((data) => {
      Array.from(data.results).forEach((image) => {
        //console.log(image.urls.small);
        addImageToUI(image.urls.small);
      });
    })
    .catch((err) => console.log(err));

  e.preventDefault();
}

function addImageToUI(url) {
  const div = document.createElement("div");
  div.className = "img-card";

  const img = document.createElement("img");
  img.setAttribute("src", url);
  img.height = "400";
  img.width = "400";

  div.append(img); //fotoğrafları div'in içine koyma
  imgListWrapper.append(div); // imgListWrapper div'inin içine de yukarıdaki divi yerleştirdik.
}
