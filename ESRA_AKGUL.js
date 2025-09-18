(() => {
  if (window.location.pathname !== "/" && window.location.pathname !== "/index.html") {
    return;
  }

  const DATA_URL = "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json";

  let productList, prevBtn, nextBtn;

  const init = () => {
    buildHTML();
    buildCSS();
    setEvents();
    loadProducts(DATA_URL);
  };

  const buildHTML = () => {
    const showcase = document.createElement("div");
    showcase.className = "productShowcase";
    showcase.innerHTML = `
      <h2 class="title">Beğenebileceğinizi düşündüklerimiz</h2>
      <div class="productList"></div>
      <button class="navBtn prev"></button>
      <button class="navBtn next"></button>
    `;

    const banner = document.querySelector(".hero.banner");
    if (banner) {
      banner.parentNode.insertBefore(showcase, banner.nextSibling);
    }

    productList = showcase.querySelector(".productList");
    prevBtn = showcase.querySelector(".prev");
    nextBtn = showcase.querySelector(".next");
  };

  const buildCSS = () => {
    if (document.getElementById("custom-carousel-styles")) {
      return;
    }

    const css = document.createElement("style");
    css.id = "custom-carousel-styles";
    css.innerHTML = `
* { box-sizing: border-box; }

.productShowcase {
  padding: 15px;
  margin: 0 auto;
  max-width: 1320px;
  background: white;
  position: relative;
}

.productShowcase .title {
  color: #2B2F33;
  font-size: 24px;
  font-weight: 600;
  margin: 0 0 20px 0;
  font-family: Quicksand-SemiBold, Quicksand, system-ui, sans-serif;
}

.productList {
  display: flex;
  gap: 18px;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  padding: 0;
  margin: 0;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.productCard {
  scroll-snap-align: start;
  flex-shrink: 0;
  width: 243.06px;
  height: 383.09px;
  background: white;
  border: 1px solid #f1f1f1;
  border-radius: 8px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  transition: border 0.2s;
}

.productCard:hover {
  border-color: #e0e0e0;
}

.productImageContainer {
  position: relative;
  margin: 10px;
}

.productCard img {
  display: block;
  width: 100%;
  height: 203px;
  object-fit: contain;
  background: white;
  margin: 0;
  padding: 0;
}

.productInfo {
  padding: 0 10px;
  margin: 8px 0 6px 0;
  color: #2B2F33;
  font-size: 12px;
  line-height: 1.35;
  font-family: Quicksand-SemiBold, Quicksand, system-ui, sans-serif;
}

.productInfo .brand {
  font-weight: 600;
  color: #2B2F33;
  font-size: 12px;
  display: inline;
}

.productInfo .name {
  font-weight: normal;
  color: #2B2F33;
  font-size: 12px;
  display: inline;
}

.ratingSection {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 10px;
  margin: 6px 0;
}

.starRating {
  color: #ff9500;
  font-size: 14px;
}

.reviewText {
  color: #999;
  font-size: 12px;
}

.priceSection {
  padding: 0 10px 13px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.oldPrice {
  color: #A2B1BC;
  font-size: 12px;
  font-weight: 600;
  margin: 0 8px 0 0;
  text-decoration: line-through;
  display: inline-block;
}

.discountBadge {
  background: #00A365;
  color: #fff;
  border-radius: 16px;
  padding: 0 4px;
  font-size: 12px;
  font-weight: 600;
  display: inline-block;
}

.currentPrice {
  color: #00A365;
  font-size: 20px;
  font-weight: 600;
}

.currentPrice .decimal {
  font-size: 12px;
}

.normalPrice {
  color: #2B2F33;
  font-size: 20px;
  font-weight: 600;
}

.normalPrice .decimal {
  font-size: 12px;
}

.priceRow {
  display: flex;
  align-items: center;
  gap: 8px;
}

.wishlistBtn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  cursor: pointer;
  z-index: 2;
}

.wishlistBtn::before {
  content: "";
  display: inline-block;
  width: 15px;
  height: 15px;
  background-image: url("https://cdn06.e-bebek.com/assets/toys/svg/heart-outline.svg");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50%;
}

.wishlistBtn:hover::before,
.wishlistBtn.active::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ff6b35'%3E%3Cpath d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/%3E%3C/svg%3E");
}

.cartBtn {
  position: absolute;
  right: 12px;
  bottom: 12px;
  width: 48px;
  height: 48px;
  border: none;
  background: none;
  cursor: pointer;
  z-index: 2;
}

.cartBtn::before {
  content: "";
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 4px;
  border-radius: 100%;
  background: #fff;
  box-shadow: 0 6px 2px 0 #b0b0b003, 0 2px 9px 0 #b0b0b014, 0 2px 4px 0 #b0b0b024, 0 0 1px 0 #b0b0b03d, 0 0 1px 0 #b0b0b047;
  background-image: url("https://cdn06.e-bebek.com/assets/toys/svg/plus-blue.svg");
  background-repeat: no-repeat;
  background-size: 14px 14px;
  background-position: 50%;
  transition: all 0.2s ease;
}

.cartBtn:hover::before {
  background-color: #2E7BE6;
  background-image: url("https://cdn06.e-bebek.com/assets/toys/svg/plus-white.svg");
}

.navBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  cursor: pointer;
  box-shadow: 0 6px 2px 0 #b0b0b003, 0 2px 9px 0 #b0b0b014, 0 2px 4px 0 #b0b0b024, 0 0 1px 0 #b0b0b03d, 0 0 1px 0 #b0b0b047;
  padding: 1px 6px;
  z-index: 3;
}

.navBtn.prev {
  left: -50px;
}

.navBtn.next {
  right: -50px;
}

.navBtn::before {
  content: "";
  width: 14px;
  height: 14px;
  display: inline-block;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50%;
}

.navBtn.prev::before {
  background-image: url("https://cdn06.e-bebek.com/assets/toys/svg/arrow-left.svg");
}

.navBtn.next::before {
  background-image: url("https://cdn06.e-bebek.com/assets/toys/svg/arrow-right.svg");
}

@media (min-width: 1200px) {
  .productCard { width: 243.06px; height: 383.09px; }
  .productCard img { height: 203px; }
}

@media (max-width: 1199px) {
  .productCard { width: 220px; height: 360px; }
  .productCard img { height: 190px; }
}

@media (max-width: 992px) {
  .productCard { width: 200px; height: 340px; }
  .productCard img { height: 180px; }
}

@media (max-width: 768px) {
  .productList { gap: 10px; }
  .productCard { width: 180px; height: 320px; }
  .productCard img { height: 160px; }
  .navBtn.prev { left: 4px; }
  .navBtn.next { right: 4px; }
}

@media (max-width: 600px) {
  .productCard { width: 75vw; height: 340px; }
  .productCard img { height: 180px; }
  .navBtn.prev { left: 2px; }
  .navBtn.next { right: 2px; }
}
    `;
    document.head.appendChild(css);
  };

  const setEvents = () => {
    if (!productList || !prevBtn || !nextBtn)
      return;

    prevBtn.addEventListener("click", () => { productList.scrollBy({ left: -250, behavior: "smooth" }); });
    nextBtn.addEventListener("click", () => { productList.scrollBy({ left: 250, behavior: "smooth" }); });
  };

  const priceValue = (price) => {
    const amount = price.toString();
    if (amount.includes(".")) {
      const p = amount.split(".");
      return p[0] + ',<span class="decimal">' + p[1] + " TL</span>";
    }
    return (amount + " TL");
  };

  const priceCheck = (item) => {
    if (item.price === item.original_price) {
      return '<span class="normalPrice">' + priceValue(item.price) + "</span>";
    }
    let discount = ((item.original_price - item.price) / item.original_price) * 100;
    if (discount < 0) {
      [item.original_price, item.price] = [item.price, item.original_price];
      discount = -discount;
    }
    return (
      '<div class="priceRow">' +
        '<span class="oldPrice">' + priceValue(item.original_price) + "</span>" +
        '<span class="discountBadge">%' + discount.toFixed(0) + "</span>" +
      "</div>" +
      '<span class="currentPrice">' + priceValue(item.price) + "</span>"
    );
  };

  const getFavorites = () => {
    let arr = [];
    try {
      const raw = localStorage.getItem("eb_favorites");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          arr = parsed;
        }
      }
    } catch (e) {}
    return arr;
  };

  const saveFavorites = (arr) => {
    try {
      localStorage.setItem("eb_favorites", JSON.stringify(arr));
    } catch (e) {}
  };

  const isFavorite = (id) => {
    const arr = getFavorites();
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === id)
        return true;
    }
    return false;
  };

  const toggleFavorite = (id) => {
    const arr = getFavorites();
    let added = false;
    if (isFavorite(id)) {
      const next = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== id)
          next.push(arr[i]);

      }
      saveFavorites(next);
      console.log("Favorilerden çıkarıldı (id:", id, ")");
    } else {
      arr.push(id);
      saveFavorites(arr);
      console.log("Favorilere eklendi (id:", id, ")");
      added = true;
    }
    return added;
  };

  const loadProducts = (url) => {
    let cached = null;
    try {
      const raw = localStorage.getItem("eb_products");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          cached = parsed;
        }
      }
    } catch (e) {}
    if (cached)
    {
      renderProducts(cached);
      return;
    }
    fetch(url)
      .then((response) => response.json())
      .then((products) => {
        try {
          localStorage.setItem("eb_products", JSON.stringify(products));
        } catch (e) {}
        renderProducts(products);
      })
      .catch((err) => console.error("Error:", err));
  };

  const renderProducts = (products) => {
    if (!productList)
      return;

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const card = document.createElement("div");
      card.className = "productCard";
      card.setAttribute("data-id", String(product.id));

      const rating = Math.floor(Math.random() * 5) + 1;
      const reviews = Math.floor(Math.random() * 200) + 1;

      card.innerHTML =
        '<div class="productImageContainer">' +
          '<img src="' + product.img + '" alt="Product Image"/>' +
        "</div>" +
        '<div class="productInfo">' +
          '<span class="brand">' + product.brand + " - </span>" +
          '<span class="name">' + product.name + "</span>" +
        "</div>" +
        '<div class="ratingSection">' +
          '<div class="starRating">' + "★".repeat(rating) + "☆".repeat(5 - rating) + "</div>" +
          '<span class="reviewText">(' + reviews + ")</span>" +
        "</div>" +
        '<div class="priceSection">' + priceCheck(product) + "</div>" +
        '<button class="cartBtn"></button>' +
        '<button class="wishlistBtn"></button>';

      card.addEventListener("click", () => window.open(product.url, "_blank"));

      const wish = card.querySelector(".wishlistBtn");
      if (wish) {
        if (isFavorite(product.id)) {
          wish.classList.add("active");
        }
        wish.addEventListener("click", (e) => {
          e.stopPropagation();
          const added = toggleFavorite(product.id);
          if (added) {
            wish.classList.add("active");
          } else {
            wish.classList.remove("active");
          }
        });
      }

      const cart = card.querySelector(".cartBtn");
      if (cart) {
        cart.addEventListener("click", (e) => {
          e.stopPropagation();
        });
      }

      productList.appendChild(card);
    }
  };

  init();
})();