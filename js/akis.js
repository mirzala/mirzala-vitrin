document.addEventListener("DOMContentLoaded", function() {
  var btnLoadFeed = document.getElementById("btn-load-feed");
  var btnShareBrand = document.getElementById("btn-share-brand");
  var btnCloseFeed = document.getElementById("btn-close-feed");
  var immersiveOverlay = document.getElementById("immersive-feed-overlay");
  var feed = document.getElementById("feed");

  // Paylaş Butonu İşlevi
  btnShareBrand.addEventListener("click", function() {
    if (!window.currentSelectedBrand) return;
    
    var shareUrl = window.location.href;
    var shareText = window.currentSelectedBrand.name + " ürün akışını keşfet!";

    if (navigator.share) {
      navigator.share({ title: window.currentSelectedBrand.name, text: shareText, url: shareUrl })
        .catch(function(err) { console.log("Paylaşım iptal", err); });
    } else {
      navigator.clipboard.writeText(shareUrl).then(function() {
        alert("Bağlantı kopyalandı!");
      });
    }
  });

  // Akışı Aç ve Ürünleri Bas
  btnLoadFeed.addEventListener("click", function() {
    if (!window.currentSelectedBrand) return;

    feed.innerHTML = "<p style='text-align:center; padding-top:50vh; color:#94a3b8;'>Ürünler yükleniyor...</p>";
    immersiveOverlay.classList.remove("hidden");

    AppAPI.fetchProducts(window.currentSelectedBrand.jsonFile, function(products) {
      feed.innerHTML = "";

      products.forEach(function(p) {
        var card = document.createElement("section");
        card.className = "card";
        card.id = p.id;

        card.innerHTML =
          '<div class="card-img"><img loading="lazy" alt=""></div>' +
          '<div class="card-body">' +
            '<h2 class="card-title"></h2>' +
            '<p class="card-desc"></p>' +
            '<a class="card-cta" target="_blank" rel="sponsored noopener">Ürünü İncele (Git)</a>' +
          '</div>';

        card.querySelector("img").src = p.image;
        card.querySelector("img").alt = p.title;
        card.querySelector(".card-title").textContent = p.title;
        card.querySelector(".card-desc").textContent = p.description;
        card.querySelector(".card-cta").href = p.url;

        feed.appendChild(card);
      });

      feed.scrollTop = 0;
    });
  });

  // Kapatma
  btnCloseFeed.addEventListener("click", function() {
    immersiveOverlay.classList.add("hidden");
  });

  // Dikey Kaydırma ve Ok Tuşları
  function go(direction) {
    feed.scrollBy({ top: direction * feed.clientHeight, behavior: "smooth" });
  }

  document.getElementById("btn-up").addEventListener("click", function() { go(-1); });
  document.getElementById("btn-down").addEventListener("click", function() { go(1); });

  document.addEventListener("keydown", function(e) {
    if (immersiveOverlay.classList.contains("hidden")) return;
    if (e.key === "ArrowDown") { e.preventDefault(); go(1); }
    if (e.key === "ArrowUp")   { e.preventDefault(); go(-1); }
    if (e.key === "Escape")    { immersiveOverlay.classList.add("hidden"); }
  });
});
