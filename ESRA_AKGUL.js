if(window.location.pathname !== "/")
  console.log("wrong page")
else
{

function getData(url) {
  fetch(url)
    .then((respose) => respose.json())
    .then((data) => {
      data.forEach((item) => {
        let priceHTML;
        if (item.price === item.original_price) {
          priceHTML = `<span class="new-price">${item.price} TL</span>`;
        } else {
            let discount = ((item.original_price - item.price)/item.original_price)*100;
            if(discount < 0)
            {
                let temp;
                temp = item.original_price;
                item.original_price = item.price;
                item.price = temp;
                discount = -discount;
            }
          priceHTML = `
            <span class="old-price">${item.original_price} TL</span>
            <span class="new-price">${item.price} TL</span>
            <span class="discount">%${discount.toFixed(0)}</span>
          `;
        }

        const productCard = document.createElement("div");
        productCard.className = "carousel-item";

        productCard.innerHTML = `
          <img src="${item.img}" alt="Product Image"/>
          <p><strong>${item.brand}</strong> - ${item.name}</p>
          <div class="price">${priceHTML}</div>
        `;

        document.querySelector(".carousel-container").appendChild(productCard);

        productCard.addEventListener("click", () => {
          window.open(item.url, "_blank");
        });
      });
    });
}


const carouselBar = document.createElement('div');

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