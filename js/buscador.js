/**
 * PARKIA — LÓGICA DEL MAPA Y BUSCADOR INTERACTIVO
 * Maneja Leaflet, pines con precios, filtros, panel lateral y datos de búsqueda.
 */

document.addEventListener('DOMContentLoaded', function () {
  // =========================================================================
  // 1. DATOS SIMULADOS DE COCHERAS EN CABA
  // =========================================================================
  const parkingSpots = [
    {
      id: 1,
      name: "Garage Plaza San Martín",
      address: "San Martín 932, Retiro, CABA",
      neighborhood: "Retiro",
      lat: -34.5955,
      lng: -58.3768,
      price: 2500,
      fraction: 1250,
      stay: 18000,
      rating: 4.8,
      reviews: 124,
      is24hs: true,
      isCovered: true,
      acceptsMP: true,
      hasCharger: false,
      available: 8,
      capacity: 35,
      img: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      name: "Estacionamiento Recoleta Mall",
      address: "Vicente López 2050, Recoleta, CABA",
      neighborhood: "Recoleta",
      lat: -34.5882,
      lng: -58.3934,
      price: 2800,
      fraction: 1400,
      stay: 21000,
      rating: 4.9,
      reviews: 210,
      is24hs: true,
      isCovered: true,
      acceptsMP: true,
      hasCharger: true,
      available: 15,
      capacity: 50,
      img: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      name: "Park Palermo Soho",
      address: "Honduras 4820, Palermo, CABA",
      neighborhood: "Palermo",
      lat: -34.5891,
      lng: -58.4285,
      price: 2200,
      fraction: 1100,
      stay: 16500,
      rating: 4.7,
      reviews: 89,
      is24hs: false,
      isCovered: true,
      acceptsMP: true,
      hasCharger: false,
      available: 5,
      capacity: 25,
      img: "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      name: "Cochera Santa Fe & Callao",
      address: "Av. Santa Fe 1740, Recoleta, CABA",
      neighborhood: "Recoleta",
      lat: -34.5962,
      lng: -58.3920,
      price: 2400,
      fraction: 1200,
      stay: 17000,
      rating: 4.6,
      reviews: 142,
      is24hs: true,
      isCovered: true,
      acceptsMP: true,
      hasCharger: false,
      available: 12,
      capacity: 40,
      img: "https://images.unsplash.com/photo-1621929747188-0b4dc28498d2?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 5,
      name: "Garage Obelisco Centro",
      address: "Lavalle 750, Microcentro, CABA",
      neighborhood: "Microcentro",
      lat: -34.6042,
      lng: -58.3789,
      price: 2000,
      fraction: 1000,
      stay: 15000,
      rating: 4.5,
      reviews: 310,
      is24hs: true,
      isCovered: false,
      acceptsMP: true,
      hasCharger: false,
      available: 22,
      capacity: 60,
      img: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 6,
      name: "Estacionamiento Belgrano R",
      address: "Echeverría 2850, Belgrano, CABA",
      neighborhood: "Belgrano",
      lat: -34.5670,
      lng: -58.4580,
      price: 2300,
      fraction: 1150,
      stay: 17500,
      rating: 4.8,
      reviews: 95,
      is24hs: false,
      isCovered: true,
      acceptsMP: false,
      hasCharger: true,
      available: 7,
      capacity: 30,
      img: "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 7,
      name: "Parking Puerto Madero Dique 4",
      address: "Juana Manso 550, Puerto Madero, CABA",
      neighborhood: "Puerto Madero",
      lat: -34.6025,
      lng: -58.3638,
      price: 3200,
      fraction: 1600,
      stay: 25000,
      rating: 4.9,
      reviews: 180,
      is24hs: true,
      isCovered: true,
      acceptsMP: true,
      hasCharger: true,
      available: 18,
      capacity: 55,
      img: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=600&q=80"
    }
  ];

  // =========================================================================
  // 2. LEER PARÁMETROS DE LA URL
  // =========================================================================
  const urlParams = new URLSearchParams(window.location.search);
  const paramQuery = urlParams.get('q') || '';
  const paramFecha = urlParams.get('fecha') || '';
  const paramDesde = urlParams.get('desde') || '';
  const paramHasta = urlParams.get('hasta') || '';
  const paramVehiculo = urlParams.get('vehiculo') || 'Auto';

  const searchInput = document.getElementById('searchInput');
  const labelFilterTime = document.getElementById('labelFilterTime');
  const labelFilterVeh = document.getElementById('labelFilterVeh');

  if (searchInput && paramQuery) {
    searchInput.value = paramQuery;
  }
  if (labelFilterTime && paramDesde && paramHasta) {
    labelFilterTime.textContent = `${paramDesde} - ${paramHasta}`;
  }
  if (labelFilterVeh && paramVehiculo) {
    labelFilterVeh.textContent = `${paramVehiculo} ▾`;
  }

  // =========================================================================
  // 3. INICIALIZAR MAPA CON LEAFLET
  // =========================================================================
  // Determinar centro según la búsqueda inicial
  let centerLat = -34.5980;
  let centerLng = -38.3900;
  let zoomLevel = 14;

  const queryLower = paramQuery.toLowerCase();
  if (queryLower.includes('palermo')) {
    centerLat = -34.5891; centerLng = -58.4285; zoomLevel = 14;
  } else if (queryLower.includes('recoleta')) {
    centerLat = -34.5882; centerLng = -58.3934; zoomLevel = 15;
  } else if (queryLower.includes('belgrano')) {
    centerLat = -34.5670; centerLng = -58.4580; zoomLevel = 14;
  } else if (queryLower.includes('puerto madero')) {
    centerLat = -34.6025; centerLng = -58.3638; zoomLevel = 15;
  } else if (queryLower.includes('centro') || queryLower.includes('microcentro') || queryLower.includes('obelisco')) {
    centerLat = -34.6042; centerLng = -58.3789; zoomLevel = 15;
  } else {
    // Por defecto CABA centro-norte
    centerLat = -34.5950; centerLng = -58.3920; zoomLevel = 13.5;
  }

  const map = L.map('map', {
    zoomControl: true
  }).setView([centerLat, centerLng], zoomLevel);

  // Capa base limpia y profesional CARTO Voyager
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
    maxZoom: 19
  }).addTo(map);

  // =========================================================================
  // 4. RENDERIZADO DE MARCADORES CON PINES DE PRECIOS
  // =========================================================================
  let markersLayer = L.layerGroup().addTo(map);
  let currentSelectedSpot = parkingSpots[0];

  function formatPrice(num) {
    return '$' + num.toLocaleString('es-AR');
  }

  function renderMarkers(spotsList) {
    markersLayer.clearLayers();

    spotsList.forEach(spot => {
      const isSelected = spot.id === currentSelectedSpot.id;
      const customIcon = L.divIcon({
        className: 'custom-pin-wrapper',
        html: `
          <div class="custom-price-pin ${isSelected ? 'selected' : ''}" data-id="${spot.id}">
            <span class="pin-dot-live"></span>
            ${formatPrice(spot.price)}
          </div>
        `,
        iconSize: [80, 32],
        iconAnchor: [40, 32]
      });

      const marker = L.marker([spot.lat, spot.lng], { icon: customIcon });

      marker.on('click', () => {
        selectSpot(spot);
      });

      markersLayer.addLayer(marker);
    });
  }

  // =========================================================================
  // 5. SELECCIÓN DE COCHERA Y APERTURA DE SIDE SHEET
  // =========================================================================
  const sideSheet = document.getElementById('sideSheet');
  const btnCloseSheet = document.getElementById('btnCloseSheet');
  const miniSpotCard = document.getElementById('miniSpotCard');

  function selectSpot(spot) {
    currentSelectedSpot = spot;

    // Actualizar marcadores activos en el mapa
    document.querySelectorAll('.custom-price-pin').forEach(pin => {
      const pinId = parseInt(pin.getAttribute('data-id'));
      if (pinId === spot.id) {
        pin.classList.add('selected');
      } else {
        pin.classList.remove('selected');
      }
    });

    // Actualizar Mini Tarjeta Flotante
    const miniImg = document.getElementById('miniImg');
    const miniTitle = document.getElementById('miniTitle');
    const miniMeta = document.getElementById('miniMeta');
    const miniPrice = document.getElementById('miniPrice');

    if (miniImg) miniImg.src = spot.img;
    if (miniTitle) miniTitle.textContent = spot.name;
    if (miniMeta) miniMeta.textContent = `★ ${spot.rating} (${spot.reviews}) · ${spot.neighborhood}`;
    if (miniPrice) miniPrice.textContent = `${formatPrice(spot.price)} / hora`;

    // Actualizar Side Sheet
    const sheetImg = document.getElementById('sheetImg');
    const sheetTitle = document.getElementById('sheetTitle');
    const sheetRating = document.getElementById('sheetRating');
    const sheetReviews = document.getElementById('sheetReviews');
    const sheetAddress = document.getElementById('sheetAddress');
    const sheetFraction = document.getElementById('sheetFraction');
    const sheetPrice = document.getElementById('sheetPrice');
    const sheetStay = document.getElementById('sheetStay');
    const sheetCapacityFill = document.getElementById('sheetCapacityFill');
    const sheetCapacityText = document.getElementById('sheetCapacityText');
    const btnGoToBook = document.getElementById('btnGoToBook');

    if (sheetImg) sheetImg.src = spot.img;
    if (sheetTitle) sheetTitle.textContent = spot.name;
    if (sheetRating) sheetRating.textContent = spot.rating;
    if (sheetReviews) sheetReviews.textContent = `(${spot.reviews} reseñas)`;
    if (sheetAddress) sheetAddress.textContent = `${spot.address} · ${spot.neighborhood}`;
    if (sheetFraction) sheetFraction.textContent = formatPrice(spot.fraction);
    if (sheetPrice) sheetPrice.textContent = formatPrice(spot.price);
    if (sheetStay) sheetStay.textContent = formatPrice(spot.stay);

    const percent = Math.min(100, Math.round(((spot.capacity - spot.available) / spot.capacity) * 100));
    if (sheetCapacityFill) sheetCapacityFill.style.width = `${percent}%`;
    if (sheetCapacityText) {
      sheetCapacityText.textContent = `¡${spot.available} lugares disponibles de ${spot.capacity}!`;
    }

    if (btnGoToBook) {
      btnGoToBook.href = `reserva.html?id=${spot.id}&name=${encodeURIComponent(spot.name)}&price=${spot.price}`;
    }

    // Abrir Side Sheet
    if (sideSheet) {
      sideSheet.classList.remove('hidden');
    }

    // Centrar mapa suavemente en el marcador
    map.panTo([spot.lat, spot.lng]);
  }

  // Cerrar Side Sheet
  if (btnCloseSheet) {
    btnCloseSheet.addEventListener('click', () => {
      sideSheet.classList.add('hidden');
    });
  }

  // Clic en la mini tarjeta abre el panel lateral
  if (miniSpotCard) {
    miniSpotCard.addEventListener('click', () => {
      selectSpot(currentSelectedSpot);
    });
  }

  // =========================================================================
  // 6. FILTROS RÁPIDOS (CHIPS)
  // =========================================================================
  const filterPills = document.querySelectorAll('.filter-pill');

  filterPills.forEach(pill => {
    pill.addEventListener('click', function () {
      filterPills.forEach(p => p.classList.remove('active'));
      this.classList.add('active');

      const filterType = this.getAttribute('data-filter');
      let filtered = parkingSpots;

      if (filterType === '24hs') {
        filtered = parkingSpots.filter(s => s.is24hs);
      } else if (filterType === 'techado') {
        filtered = parkingSpots.filter(s => s.isCovered);
      } else if (filterType === 'mp') {
        filtered = parkingSpots.filter(s => s.acceptsMP);
      } else if (filterType === 'cheap') {
        filtered = parkingSpots.filter(s => s.price < 2500);
      } else if (filterType === 'charge') {
        filtered = parkingSpots.filter(s => s.hasCharger);
      }

      renderMarkers(filtered);

      if (filtered.length > 0) {
        selectSpot(filtered[0]);
      }
    });
  });

  // =========================================================================
  // 7. EVENTOS DE BÚSQUEDA
  // =========================================================================
  function performSearch() {
    const q = searchInput ? searchInput.value.trim().toLowerCase() : '';
    if (!q) {
      renderMarkers(parkingSpots);
      return;
    }

    const filtered = parkingSpots.filter(s => 
      s.name.toLowerCase().includes(q) ||
      s.address.toLowerCase().includes(q) ||
      s.neighborhood.toLowerCase().includes(q)
    );

    if (filtered.length > 0) {
      renderMarkers(filtered);
      selectSpot(filtered[0]);
      map.flyTo([filtered[0].lat, filtered[0].lng], 14, { duration: 1 });
    } else {
      alert(`No encontramos cocheras en "${q}". Probá con Palermo, Recoleta, Retiro o Belgrano.`);
    }
  }

  const btnSearchSubmit = document.getElementById('btnSearchSubmit');
  if (btnSearchSubmit) {
    btnSearchSubmit.addEventListener('click', performSearch);
  }

  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        performSearch();
      }
    });
  }

  // Inicializar marcadores y seleccionar la primera cochera
  renderMarkers(parkingSpots);
  const initialMatch = parkingSpots.find(s => 
    s.neighborhood.toLowerCase().includes(queryLower) || 
    s.address.toLowerCase().includes(queryLower)
  );
  selectSpot(initialMatch || parkingSpots[0]);
});
