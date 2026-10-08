var AppAPI = {
  fetchBrands: function(callback) {
    fetch("data/markalar.json")
      .then(function(res) { return res.json(); })
      .then(function(data) { callback(data); })
      .catch(function(err) { console.error("Markalar yüklenemedi:", err); });
  },

  fetchProducts: function(jsonFileName, callback) {
    fetch("data/" + jsonFileName + ".json")
      .then(function(res) { return res.json(); })
      .then(function(data) { callback(data); })
      .catch(function(err) { console.error("Ürünler yüklenemedi:", err); });
  }
};
