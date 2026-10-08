<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Marka Vitrini ve Tam Ekran Akış</title>
    <link rel="stylesheet" href="vitrin-stil.css">
</head>
<body>

    <!-- ÜST KISIM: Yatay Kaydırılabilir Marka Slider'ı -->
    <header class="brand-showcase">
        <div class="showcase-header">
            <h2>Marka Keşfi</h2>
            <span class="subtitle">Özel Seçki ve İş Ortaklıkları</span>
        </div>
        <div id="brand-slider" class="brand-slider"></div>
    </header>

    <!-- ORTA KISIM: Marka Hakkında ve Buton Alanı -->
    <section id="brand-info-card" class="brand-info-card">
        <div class="info-glass-panel">
            <span class="badge">Seçilen Marka</span>
            <h1 id="active-brand-title">Yükleniyor...</h1>
            <p id="active-brand-desc">Marka detayları yükleniyor...</p>
            <button id="btn-load-feed" class="btn-immersive">
                <span>Ürün Akışını Başlat</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 13l5 5 5-5M7 6l5 5 5-5"/></svg>
            </button>
        </div>
    </section>

    <!-- ALT KISIM: Tam Ekran Ürün Akış Modalı -->
    <div id="immersive-feed-overlay" class="immersive-overlay hidden">
        <div class="immersive-modal">
            <button id="btn-close-feed" class="close-btn" title="Kapat">&times;</button>
            <button id="btn-up" class="nav-btn up" aria-label="Yukarı">▲</button>
            <div id="feed" class="feed-container"></div>
            <button id="btn-down" class="nav-btn down" aria-label="Aşağı">▼</button>
        </div>
    </div>

    <!-- Tek Parça Çalışan Motor Dosyası -->
    <script src="vitrin-motor.js"></script>
</body>
</html>
