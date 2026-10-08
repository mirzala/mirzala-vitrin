// ELEMENT SARMALLARI SEÇİCİLERİ
var brandSlider = document.getElementById("brand-slider");
var activeBrandTitle = document.getElementById("active-brand-title");
var activeBrandDesc = document.getElementById("active-brand-desc");
var btnLoadFeed = document.getElementById("btn-load-feed");
var btnShareBrand = document.getElementById("btn-share-brand");
var btnCloseFeed = document.getElementById("btn-close-feed");
var immersiveOverlay = document.getElementById("immersive-feed-overlay");
var feed = document.getElementById("feed");

var selectedBrandData = null;

// 1. MARKA LİSTESİNİ ÇEKME VE VARSAYILAN SEÇİM MANTIĞI
fetch("data/markalar.json")
  .then(function (res) { return res.json(); })
  .then(function (brands) {
    if (brands.length === 0) return;

    brands.forEach(function (b, index) {
      var pill = document.createElement("div");
      pill.className = "brand-pill";
      pill.innerHTML = "<span>" + b.name + "</span>";
      
      pill.addEventListener("click", function () {
        document.querySelectorAll(".brand-pill").forEach(function(p) { p.classList.remove("active"); });
        pill.classList.add("active");
        setActiveBrand(b);
      });

      brandSlider.appendChild(pill);

      // İLK MARKAYI OTOMATİK SEÇİLİ GETİR
      if (index === 0) {
        pill.classList.add("active");
        setActiveBrand(b);
      }
    });
  })
  .catch(function(err) { console.error("Markalar yüklenemedi:", err); });

function setActiveBrand(b) {
  selectedBrandData = b;
  activeBrandTitle.textContent = b.name;
  activeBrandDesc.textContent = b.description;
}

// 2. PAYLAŞ BUTONU İŞLEVİ (İleride burayı kolayca özelleştirebilirsiniz)
btnShareBrand.addEventListener("click", function () {
  if (!selectedBrandData) return;
  
  var shareUrl = window.location.href;
  var shareText = selectedBrandData.name + " ürün akışını keşfet!";

  if (navigator.share) {
    navigator.share({
      title: selectedBrandData.name,
      text: shareText,
      url: shareUrl,
    }).catch(function(err) { console.log("Paylaşım iptal edildi", err); });
  } else {
    // Tarayıcı desteklemiyorsa panoya kopyala
    navigator.clipboard.writeText(shareUrl).then(function() {
      alert("Sayfa bağlantısı kopyalandı!");
    });
  }
});

// 3. TAM EKRAN AKIŞI AÇMA VE ÜRÜNLERİ YÜKLEME
btnLoadFeed.addEventListener("click", function () {
  if (!selectedBrandData) return;

  var jsonFilePath = "data/" + selectedBrandData.jsonFile + ".json";
  feed.innerHTML = "<p style='text-align:center; padding-top:50vh; color:#94a3b8;'>Ürünler yükleniyor...</p>";
  
  immersiveOverlay.classList.remove("hidden");

  fetch(jsonFilePath)
    .then(function (response) {
      if (!response.ok) throw new Error("Ürünler yüklenemedi.");
      return response.json();
    })
    .then(function (products) {
      feed.innerHTML = "";

      products.forEach(function (p) {
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
    })
    .catch(function (error) {
      console.error(error);
      feed.innerHTML = "<p style='text-align:center; padding-top:50vh; color:#ef4444;'>Ürünler yüklenirken bir hata oluştu.</p>";
    });
});

// 4. TAM EKRANI KAPATMA VE KLAVYE KONTROLLERİ
btnCloseFeed.addEventListener("click", function () {
  immersiveOverlay.classList.add("hidden");
});

function go(direction) {
  feed.scrollBy({ top: direction * feed.clientHeight, behavior: "smooth" });
}
document.getElementById("btn-up").addEventListener("click", function () { go(-1); });
document.getElementById("btn-down").addEventListener("click", function () { go(1); });

document.addEventListener("keydown", function (e) {
  if (immersiveOverlay.classList.contains("hidden")) return;
  if (e.key === "ArrowDown") { e.preventDefault(); go(1); }
  if (e.key === "ArrowUp")   { e.preventDefault(); go(-1); }
  if (e.key === "Escape")    { immersiveOverlay.classList.add("hidden"); }
});
