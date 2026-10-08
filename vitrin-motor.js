var brandSlider = document.getElementById("brand-slider");
var brandInfoCard = document.getElementById("brand-info-card");
var activeBrandTitle = document.getElementById("active-brand-title");
var activeBrandDesc = document.getElementById("active-brand-desc");
var btnLoadFeed = document.getElementById("btn-load-feed");
var feed = document.getElementById("feed");

var selectedBrandData = null;

// 1. Marka listesini JSON'dan çek ve slider'ı doldur
fetch("data/markalar.json")
  .then(function (res) { return res.json(); })
  .then(function (brands) {
    brands.forEach(function (b) {
      var pill = document.createElement("div");
      pill.className = "brand-pill";
      pill.innerHTML = "<span>" + b.name + "</span>";
      
      pill.addEventListener("click", function () {
        document.querySelectorAll(".brand-pill").forEach(function(p) { p.classList.remove("active"); });
        pill.classList.add("active");

        selectedBrandData = b;

        activeBrandTitle.textContent = b.name;
        activeBrandDesc.textContent = b.description;
        brandInfoCard.classList.remove("hidden");
      });

      brandSlider.appendChild(pill);
    });
  })
  .catch(function(err) { console.error("Markalar yüklenemedi:", err); });

// 2. "Ürünleri Gör" butonuna basıldığında o markanın JSON'unu çek ve akışı güncelle
btnLoadFeed.addEventListener("click", function () {
  if (!selectedBrandData) return;

  var jsonFilePath = "data/" + selectedBrandData.jsonFile + ".json";
  
  feed.innerHTML = "<p class='welcome-placeholder'>Ürünler yükleniyor...</p>";

  fetch(jsonFilePath)
    .then(function (response) {
      if (!response.ok) throw new Error("Ürün JSON dosyası bulunamadı.");
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
            '<a class="card-cta" target="_blank" rel="sponsored noopener">Ürünü incele</a>' +
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
      feed.innerHTML = "<p class='welcome-placeholder'>Bu markaya ait ürünler yüklenirken bir hata oluştu.</p>";
    });
});

// Kaydırma ve Klavye Ok Tuşları
function go(direction) {
  feed.scrollBy({ top: direction * feed.clientHeight, behavior: "smooth" });
}
document.getElementById("btn-up").addEventListener("click", function () { go(-1); });
document.getElementById("btn-down").addEventListener("click", function () { go(1); });

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowDown") { e.preventDefault(); go(1); }
  if (e.key === "ArrowUp")   { e.preventDefault(); go(-1); }
});
