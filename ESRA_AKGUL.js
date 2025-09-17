 if(window.location.pathname !== "/")
     console.log("wrong page")
 else
 {

function getData(url) {
  fetch(url)
    .then((respose) => respose.json())
    .then((data) =>
      data.forEach((item) => {
        const card = `
          <div class="carousel-item">
            <img src="${item.img}" alt="Product Image"/>
            <p><strong>${item.brand}</strong> - ${item.name}</p>
            <p>${item.price} TL</p>
          </div>
        `;

        document.querySelector('.carousel-container').innerHTML += card;
      })
    );
}

const carouselBar = document.createElement('div');
const title = document.createElement("h2");
title.textContent = "Beğenebileceğinizi düşündüklerimiz";
carouselBar.appendChild(title);

carouselBar.id = 'ebebek-carousel';

carouselBar.innerHTML = `
  <h2>Beğenebileceğinizi düşündüklerimiz</h2>
  <div class="carousel-container"></div>
`;

document.body.appendChild(carouselBar);

getData(
  'https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json'
);

}
