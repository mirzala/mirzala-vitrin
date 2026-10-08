var currentSelectedBrand = null;

document.addEventListener("DOMContentLoaded", function() {
  var brandSlider = document.getElementById("brand-slider");
  var activeBrandTitle = document.getElementById("active-brand-title");
  var activeBrandDesc = document.getElementById("active-brand-desc");

  function updateActiveBrand(b) {
    currentSelectedBrand = b;
    activeBrandTitle.textContent = b.name;
    activeBrandDesc.textContent = b.description;
  }

  AppAPI.fetchBrands(function(brands) {
    if (brands.length === 0) return;

    brands.forEach(function(b, index) {
      var pill = document.createElement("div");
      pill.className = "brand-pill";
      pill.innerHTML = "<span>" + b.name + "</span>";
      
      pill.addEventListener("click", function() {
        document.querySelectorAll(".brand-pill").forEach(function(p) { p.classList.remove("active"); });
        pill.classList.add("active");
        updateActiveBrand(b);
      });

      brandSlider.appendChild(pill);

      // İlk markayı varsayılan seç
      if (index === 0) {
        pill.classList.add("active");
        updateActiveBrand(b);
      }
    });
  });
});
