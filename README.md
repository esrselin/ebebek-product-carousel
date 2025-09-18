# E-Bebek Carousel Product

Bu proje, **e-bebek** sitesine benzer şekilde carousel bileşeni oluşturmaktadır.  
Amaç, kullanıcıya API üzerinden gelen ürünleri şık bir şekilde listelemek, ürün detaylarını göstermek ve kullanıcıların favori ürünlerini tarayıcı **localStorage** üzerinde saklamaktır.  


![Carousel Ekran Görüntüsü](./ebebek-carousel.PNG)


## Özellikler

* API’den ürünleri **fetch** ile çekme  
* Çekilen ürünleri **localStorage** içine kaydedip tekrar yüklendiğinde cache üzerinden okuma  
* Ürün kartları (resim, marka, isim, fiyat, indirim, değerlendirme)  
* Sağ/sol yön butonlarıyla kaydırılabilir ürün listesi  
* Responsive (mobil uyumlu) tasarım  
* **Favori ekleme / çıkarma** özelliği (kalp ikonuna tıklayınca aktif/pasif)  
* Favoriler de **localStorage** üzerinde tutulur, sayfa yenilendiğinde korunur  
* Sepet butonu (simülasyon amaçlı, tıklanabilir ama işlevsel değil)  


## Kullanılan Teknolojiler

* **Vanilla JavaScript (ES6+)**  
  * `fetch()` API  
  * `localStorage`  
  * Event listeners  

* **HTML5**  
  * Dinamik DOM manipülasyonu  

* **CSS3**  
  * Responsive tasarım (`@media queries`)  
  * Flexbox  
  * Scroll-snap ile kaydırma deneyimi  

* **JSON**  
  * Ürün verisi kaynağı  

## Proje Yapısı

* **IIFE (Immediately Invoked Function Expression):**  
  Kod `( () => { ... } )();` yapısında kapsüllenmiştir. Bu sayede global scope kirletilmez.  

* **Ana Fonksiyonlar:**  
  * `init()` : Başlangıç noktasıdır.  
  * `buildHTML()` : Carousel HTML iskeletini oluşturur.  
  * `buildCSS()` : CSS kurallarını `<style>` etiketi ile DOM’a ekler.  
  * `setEvents()` : İleri/geri butonları için event tanımları.  
  * `loadProducts()` : Önce cache, yoksa API’den ürün çeker.  
  * `renderProducts()` : Gelen ürünleri kart halinde basar.  
  * `priceValue()` / `priceCheck()` : Fiyat formatlama ve indirim hesaplama.  
  * `getFavorites()` / `saveFavorites()` : Favorileri localStorage’da tutar.  
  * `toggleFavorite()` : Favori ekleme/çıkarma.  
  * `isFavorite()` : Ürün favorilerde mi değil mi kontrol eder.  


## Nasıl Çalıştırılır?

1. Denemek için [e-bebek](https://www.e-bebek.com/) sitesini açıp, tarayıcı konsoluna bu kodu yapıştırabilirsin.  

2. Kendi projen içinde kullanmak istersen kodu `carousel.js` dosyasına kaydet ve `index.html` dosyanda `</body>` etiketinden hemen önce şu satırı ekle:  

   ```html
   <script src="carousel.js"></script>
