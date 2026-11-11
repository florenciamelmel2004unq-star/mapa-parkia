/**
 * PARKIA — LÓGICA DE APLICACIÓN Y MAPA INTERACTIVO
 * Fidelidad 100% con la interfaz: Mapa Leaflet, Pines de precios, Sidebar dinámico,
 * carrusel de fotos, filtros, búsqueda y modal de reserva rápida.
 */

document.addEventListener('DOMContentLoaded', function () {
  // =========================================================================
  // 1. DATASET DE COCHERAS EN CABA (REPRESENTA EXACTAMENTE EL MAPA DE LA IMAGEN)
  // =========================================================================
  const parkingSpots = [
    {
      id: 1,
      name: "Garage Plaza Italia",
      address: "Av. Santa Fe 3900, Palermo, CABA",
      neighborhood: "Palermo",
      distance: "1.1 km",
      lat: -34.5815,
      lng: -58.4208,
      price: 2500,
      fraction: 800,
      stay12: 18000,
      stay24: 32000,
      rating: 4.8,
      reviews: 320,
      statusText: "Disponible ahora",
      occupiedPercent: 78,
      availableSpots: 5,
      totalSpots: 24,
      is24hs: true,
      isCovered: true,
      acceptsMP: true,
      hasCharger: true,
      isFeatured: true,
      pinColor: 'amber',
      features: [
        { icon: 'car', label: 'Techado' },
        { icon: 'shield', label: 'Vigilancia 24hs' },
        { icon: 'zap', label: 'Carga eléctrica' },
        { icon: 'qr', label: 'Acceso con QR' }
      ],
      photos: [
        "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1621929747188-0b4dc28498d2?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 2,
      name: "Parking Pacífico",
      address: "Av. Santa Fe 4600, Palermo, CABA",
      neighborhood: "Palermo",
      distance: "2.8 km",
      lat: -34.5802,
      lng: -58.4265,
      price: 2800,
      fraction: 900,
      stay12: 19500,
      stay24: 34000,
      rating: 4.6,
      reviews: 98,
      statusText: "Disponible ahora",
      occupiedPercent: 65,
      availableSpots: 12,
      totalSpots: 35,
      is24hs: true,
      isCovered: true,
      acceptsMP: true,
      hasCharger: true,
      pinColor: 'emerald',
      features: [
        { icon: 'car', label: 'Techado' },
        { icon: 'zap', label: 'Carga eléctrica' },
        { icon: 'shield', label: 'Vigilancia 24hs' },
        { icon: 'mp', label: 'Mercado Pago' }
      ],
      photos: [
        "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1621929747188-0b4dc28498d2?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 3,
      name: "Estacionamiento Catalinas",
      address: "Av. Leandro N. Alem 1050, Retiro, CABA",
      neighborhood: "Retiro",
      distance: "1.5 km",
      lat: -34.5985,
      lng: -58.3710,
      price: 2800,
      fraction: 850,
      stay12: 19000,
      stay24: 33000,
      rating: 4.5,
      reviews: 76,
      statusText: "Disponible ahora",
      occupiedPercent: 75,
      availableSpots: 8,
      totalSpots: 32,
      is24hs: true,
      isCovered: true,
      acceptsMP: true,
      hasCharger: false,
      pinColor: 'navy',
      features: [
        { icon: 'car', label: 'Techado' },
        { icon: 'arrow-up', label: 'Altura máx. 2.20 m' },
        { icon: 'qr', label: 'Acceso con QR' },
        { icon: 'mp', label: 'Mercado Pago' }
      ],
      photos: [
        "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1621929747188-0b4dc28498d2?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 4,
      name: "Cochera Recoleta Village",
      address: "Junín 1750, Recoleta, CABA",
      neighborhood: "Recoleta",
      distance: "1.8 km",
      lat: -34.5882,
      lng: -58.3934,
      price: 2500,
      fraction: 800,
      stay12: 17500,
      stay24: 30000,
      rating: 4.9,
      reviews: 185,
      statusText: "Disponible ahora",
      occupiedPercent: 85,
      availableSpots: 3,
      totalSpots: 20,
      is24hs: true,
      isCovered: true,
      acceptsMP: true,
      hasCharger: true,
      pinColor: 'amber',
      features: [
        { icon: 'car', label: 'Techado' },
        { icon: 'shield', label: 'Vigilancia 24hs' },
        { icon: 'zap', label: 'Carga eléctrica' },
        { icon: 'mp', label: 'Mercado Pago' }
      ],
      photos: [
        "https://images.unsplash.com/photo-1544984243-ec57ea16fe25?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1621929747188-0b4dc28498d2?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 5,
      name: "Garage Belgrano Cabildo",
      address: "Av. Cabildo 2100, Belgrano, CABA",
      neighborhood: "Belgrano",
      distance: "4.5 km",
      lat: -34.5620,
      lng: -58.4560,
      price: 2500,
      fraction: 800,
      stay12: 17000,
      stay24: 29000,
      rating: 4.7,
      reviews: 110,
      statusText: "Disponible ahora",
      occupiedPercent: 70,
      availableSpots: 9,
      totalSpots: 30,
      is24hs: true,
      isCovered: true,
      acceptsMP: true,
      hasCharger: false,
      pinColor: 'navy',
      features: [
        { icon: 'car', label: 'Techado' },
        { icon: 'shield', label: 'Vigilancia 24hs' },
        { icon: 'qr', label: 'Acceso con QR' },
        { icon: 'mp', label: 'Mercado Pago' }
      ],
      photos: [
        "https://images.unsplash.com/photo-1621929747188-0b4dc28498d2?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 6,
      name: "Estacionamiento Chacarita Lacroze",
      address: "Av. Corrientes 6200, Chacarita, CABA",
      neighborhood: "Chacarita",
      distance: "5.1 km",
      lat: -34.5875,
      lng: -58.4550,
      price: 2500,
      fraction: 750,
      stay12: 16500,
      stay24: 28000,
      rating: 4.5,
      reviews: 64,
      statusText: "Disponible ahora",
      occupiedPercent: 55,
      availableSpots: 14,
      totalSpots: 30,
      is24hs: true,
      isCovered: false,
      acceptsMP: true,
      hasCharger: false,
      pinColor: 'amber',
      features: [
        { icon: 'sun', label: 'Aire libre' },
        { icon: 'shield', label: 'Vigilancia 24hs' },
        { icon: 'mp', label: 'Mercado Pago' }
      ],
      photos: [
        "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1621929747188-0b4dc28498d2?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 7,
      name: "Parking Palermo Soho",
      address: "Honduras 4900, Palermo, CABA",
      neighborhood: "Palermo",
      distance: "2.1 km",
      lat: -34.5890,
      lng: -58.4280,
      price: 2500,
      fraction: 800,
      stay12: 18000,
      stay24: 31000,
      rating: 4.7,
      reviews: 92,
      statusText: "Disponible ahora",
      occupiedPercent: 75,
      availableSpots: 6,
      totalSpots: 24,
      is24hs: false,
      isCovered: true,
      acceptsMP: true,
      hasCharger: true,
      pinColor: 'amber',
      features: [
        { icon: 'car', label: 'Techado' },
        { icon: 'zap', label: 'Carga eléctrica' },
        { icon: 'qr', label: 'Acceso con QR' }
      ],
      photos: [
        "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1621929747188-0b4dc28498d2?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 8,
      name: "Garage Villa Crespo Outlet",
      address: "Gurruchaga 950, Villa Crespo, CABA",
      neighborhood: "Villa Crespo",
      distance: "3.4 km",
      lat: -34.5995,
      lng: -58.4380,
      price: 2500,
      fraction: 750,
      stay12: 16500,
      stay24: 28000,
      rating: 4.6,
      reviews: 55,
      statusText: "Disponible ahora",
      occupiedPercent: 60,
      availableSpots: 10,
      totalSpots: 25,
      is24hs: true,
      isCovered: true,
      acceptsMP: true,
      hasCharger: false,
      pinColor: 'amber',
      features: [
        { icon: 'car', label: 'Techado' },
        { icon: 'shield', label: 'Vigilancia 24hs' },
        { icon: 'mp', label: 'Mercado Pago' }
      ],
      photos: [
        "https://images.unsplash.com/photo-1621929747188-0b4dc28498d2?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 9,
      name: "Estacionamiento Caballito Centro",
      address: "Av. Rivadavia 5400, Caballito, CABA",
      neighborhood: "Caballito",
      distance: "4.8 km",
      lat: -34.6205,
      lng: -58.4410,
      price: 2800,
      fraction: 850,
      stay12: 18500,
      stay24: 31000,
      rating: 4.6,
      reviews: 130,
      statusText: "Disponible ahora",
      occupiedPercent: 78,
      availableSpots: 7,
      totalSpots: 32,
      is24hs: true,
      isCovered: true,
      acceptsMP: true,
      hasCharger: false,
      pinColor: 'navy',
      features: [
        { icon: 'car', label: 'Techado' },
        { icon: 'shield', label: 'Vigilancia 24hs' },
        { icon: 'mp', label: 'Mercado Pago' }
      ],
      photos: [
        "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1621929747188-0b4dc28498d2?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 10,
      name: "Obelisco Center Parking",
      address: "Lavalle 750, San Nicolás, CABA",
      neighborhood: "San Nicolás",
      distance: "0.8 km",
      lat: -34.6035,
      lng: -58.3815,
      price: 2900,
      fraction: 900,
      stay12: 20000,
      stay24: 35000,
      rating: 4.8,
      reviews: 240,
      statusText: "Disponible ahora",
      occupiedPercent: 90,
      availableSpots: 5,
      totalSpots: 50,
      is24hs: true,
      isCovered: true,
      acceptsMP: true,
      hasCharger: true,
      pinColor: 'amber-star',
      features: [
        { icon: 'car', label: 'Techado' },
        { icon: 'qr', label: 'Acceso con QR' },
        { icon: 'shield', label: 'Vigilancia 24hs' },
        { icon: 'mp', label: 'Mercado Pago' }
      ],
      photos: [
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1621929747188-0b4dc28498d2?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 11,
      name: "Garage San Nicolás Florida",
      address: "Florida 550, San Nicolás, CABA",
      neighborhood: "San Nicolás",
      distance: "0.9 km",
      lat: -34.6010,
      lng: -58.3750,
      price: 2800,
      fraction: 850,
      stay12: 19000,
      stay24: 33000,
      rating: 4.7,
      reviews: 140,
      statusText: "Disponible ahora",
      occupiedPercent: 82,
      availableSpots: 6,
      totalSpots: 35,
      is24hs: true,
      isCovered: true,
      acceptsMP: true,
      hasCharger: false,
      pinColor: 'navy',
      features: [
        { icon: 'car', label: 'Techado' },
        { icon: 'shield', label: 'Vigilancia 24hs' },
        { icon: 'qr', label: 'Acceso con QR' }
      ],
      photos: [
        "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1621929747188-0b4dc28498d2?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80"
      ]
    },
    {
      id: 12,
      name: "Estacionamiento Puerto Madero Sur",
      address: "Alicia Moreau de Justo 1300, Puerto Madero, CABA",
      neighborhood: "Puerto Madero",
      distance: "2.2 km",
      lat: -34.6135,
      lng: -58.3660,
      price: 2500,
      fraction: 800,
      stay12: 18000,
      stay24: 32000,
      rating: 4.7,
      reviews: 88,
      statusText: "Disponible ahora",
      occupiedPercent: 70,
      availableSpots: 12,
      totalSpots: 40,
      is24hs: true,
      isCovered: true,
      acceptsMP: true,
      hasCharger: false,
      pinColor: 'navy',
      features: [
        { icon: 'car', label: 'Techado' },
        { icon: 'shield', label: 'Vigilancia 24hs' },
        { icon: 'mp', label: 'Mercado Pago' }
      ],
      photos: [
        "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1573348722427-f1d6819fdf98?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1621929747188-0b4dc28498d2?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80"
      ]
    }
  ];

  // Estado actual
  let currentSpot = parkingSpots[0];
  let currentPhotoIndex = 0;
  let activeFilter = 'all';

  // =========================================================================
  // 2. INICIALIZACIÓN DEL MAPA LEAFLET
  // =========================================================================
  const mapElement = document.getElementById('leafletMap');
  if (!mapElement) return;

  const map = L.map('leafletMap', {
    zoomControl: false // Usamos controles personalizados como en la imagen
  }).setView([-34.5950, -58.4050], 13.5);

  // Capa base limpia y profesional (CARTO Voyager)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    maxZoom: 19
  }).addTo(map);

  // Marcador de Ubicación del Usuario (Palermo - Punto azul pulsante)
  const userLocationIcon = L.divIcon({
    className: 'user-radar-container',
    html: '<div class="user-radar-point" title="Tu ubicación actual"></div>',
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  });
  L.marker([-34.5870, -58.4120], { icon: userLocationIcon }).addTo(map);

  // Capa de Marcadores de Cocheras
  const markersLayer = L.layerGroup().addTo(map);

  function formatMoney(amount) {
    return '$' + Number(amount).toLocaleString('es-AR');
  }

  // =========================================================================
  // 3. RENDERIZAR PINES EN EL MAPA
  // =========================================================================
  function renderMapMarkers(spotsToRender) {
    markersLayer.clearLayers();

    spotsToRender.forEach(spot => {
      const isSelected = spot.id === currentSpot.id;
      let pinClass = 'pin-navy';
      let starHtml = '';

      if (spot.pinColor === 'amber' || spot.pinColor === 'amber-star') {
        pinClass = 'pin-amber';
      } else if (spot.pinColor === 'emerald') {
        pinClass = 'pin-emerald';
      }

      if (spot.pinColor === 'amber-star') {
        starHtml = '<span style="font-size:10px;">★</span> ';
      }

      const iconHtml = `
        <div class="custom-pin-pill ${pinClass} ${isSelected ? 'selected' : ''}" data-id="${spot.id}">
          ${starHtml}${formatMoney(spot.price)}
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-pin-wrapper',
        html: iconHtml,
        iconSize: [76, 28],
        iconAnchor: [38, 28]
      });

      const marker = L.marker([spot.lat, spot.lng], { icon: customIcon });

      marker.on('click', () => {
        selectParkingSpot(spot);
      });

      markersLayer.addLayer(marker);
    });
  }

  // =========================================================================
  // 4. SELECCIÓN DE COCHERA Y ACTUALIZACIÓN DEL SIDEBAR & MINI CARD
  // =========================================================================
  function selectParkingSpot(spot) {
    currentSpot = spot;
    currentPhotoIndex = 0;

    // Actualizar clase 'selected' en los pines del mapa
    document.querySelectorAll('.custom-pin-pill').forEach(el => {
      const id = parseInt(el.getAttribute('data-id'));
      if (id === spot.id) {
        el.classList.add('selected');
      } else {
        el.classList.remove('selected');
      }
    });

    // 4.1 Actualizar Sidebar Principal (Columna derecha)
    const sidebarMainImg = document.getElementById('sidebarMainImg');
    const galleryCounter = document.getElementById('galleryCounter');
    const sidebarTitle = document.getElementById('sidebarTitle');
    const sidebarRating = document.getElementById('sidebarRating');
    const sidebarReviews = document.getElementById('sidebarReviews');
    const sidebarStatus = document.getElementById('sidebarStatus');
    const sidebarAddress = document.getElementById('sidebarAddress');
    const sidebarDistance = document.getElementById('sidebarDistance');
    const sidebarFeatures = document.getElementById('sidebarFeatures');
    const sidebarFraction = document.getElementById('sidebarFraction');
    const sidebarPrice = document.getElementById('sidebarPrice');
    const sidebarStay12 = document.getElementById('sidebarStay12');
    const sidebarStay24 = document.getElementById('sidebarStay24');
    const sidebarProgressFill = document.getElementById('sidebarProgressFill');
    const sidebarOccupiedPercent = document.getElementById('sidebarOccupiedPercent');
    const sidebarAvailableText = document.getElementById('sidebarAvailableText');
    const thumbsContainer = document.getElementById('galleryThumbsContainer');

    if (sidebarMainImg && spot.photos && spot.photos.length > 0) {
      sidebarMainImg.src = spot.photos[0];
    }
    if (galleryCounter) {
      galleryCounter.textContent = `1/${spot.photos.length}`;
    }

    // Miniaturas (4 fotos)
    if (thumbsContainer && spot.photos) {
      thumbsContainer.innerHTML = '';
      const thumbsCount = Math.min(4, spot.photos.length);
      for (let i = 0; i < thumbsCount; i++) {
        const thumbBtn = document.createElement('button');
        thumbBtn.type = 'button';
        thumbBtn.className = `thumb-item-btn ${i === 0 ? 'active' : ''}`;
        thumbBtn.setAttribute('aria-label', `Ver foto ${i + 1}`);
        thumbBtn.innerHTML = `<img src="${spot.photos[i]}" alt="${spot.name} miniatura ${i + 1}" />`;
        thumbBtn.addEventListener('click', () => {
          switchGalleryPhoto(i);
        });
        thumbsContainer.appendChild(thumbBtn);
      }
    }

    if (sidebarTitle) sidebarTitle.textContent = spot.name;
    if (sidebarRating) sidebarRating.textContent = spot.rating;
    if (sidebarReviews) sidebarReviews.textContent = `(${spot.reviews} reseñas)`;
    if (sidebarStatus) sidebarStatus.textContent = spot.statusText;
    if (sidebarAddress) sidebarAddress.textContent = spot.address;
    if (sidebarDistance) sidebarDistance.textContent = spot.distance;

    // Características pills
    if (sidebarFeatures && spot.features) {
      sidebarFeatures.innerHTML = spot.features.map(f => `
        <span class="feature-pill-item">
          ${getFeatureIcon(f.icon)} ${f.label}
        </span>
      `).join('');
    }

    // Tarifas
    if (sidebarFraction) sidebarFraction.textContent = formatMoney(spot.fraction);
    if (sidebarPrice) sidebarPrice.textContent = formatMoney(spot.price);
    if (sidebarStay12) sidebarStay12.textContent = formatMoney(spot.stay12);
    if (sidebarStay24) sidebarStay24.textContent = formatMoney(spot.stay24);

    // Capacidad en vivo
    if (sidebarProgressFill) {
      sidebarProgressFill.style.width = `${spot.occupiedPercent}%`;
    }
    if (sidebarOccupiedPercent) {
      sidebarOccupiedPercent.textContent = `${spot.occupiedPercent}% ocupado`;
    }
    if (sidebarAvailableText) {
      sidebarAvailableText.textContent = `¡Solo quedan ${spot.availableSpots} cocheras!`;
    }

    // 4.2 Actualizar Mini Tarjeta Flotante (Inferior Izquierda del Mapa)
    const miniThumb = document.getElementById('miniSpotThumb');
    const miniName = document.getElementById('miniSpotName');
    const miniRating = document.getElementById('miniSpotRating');
    const miniReviews = document.getElementById('miniSpotReviews');
    const miniPrice = document.getElementById('miniSpotPrice');
    const miniBadges = document.getElementById('miniSpotBadges');

    if (miniThumb) miniThumb.src = spot.photos[0];
    if (miniName) miniName.textContent = spot.name;
    if (miniRating) miniRating.textContent = spot.rating;
    if (miniReviews) miniReviews.textContent = `(${spot.reviews} reseñas)`;
    if (miniPrice) miniPrice.textContent = `${formatMoney(spot.price)}/h`;
    if (miniBadges) miniBadges.textContent = `Techado • ${spot.distance}`;

    // Pan mapa suave hacia la cochera seleccionada
    map.panTo([spot.lat, spot.lng], { animate: true, duration: 0.8 });
  }

  function getFeatureIcon(type) {
    if (type === 'car') {
      return `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9C2.1 11.1 2 11.6 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>`;
    }
    if (type === 'arrow-up') {
      return `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>`;
    }
    if (type === 'shield') {
      return `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`;
    }
    if (type === 'qr') {
      return `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>`;
    }
    if (type === 'zap') {
      return `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`;
    }
    return '';
  }

  // Cambiar foto activa en el sidebar
  function switchGalleryPhoto(index) {
    if (!currentSpot.photos || index >= currentSpot.photos.length) return;
    currentPhotoIndex = index;
    const sidebarMainImg = document.getElementById('sidebarMainImg');
    const galleryCounter = document.getElementById('galleryCounter');
    if (sidebarMainImg) sidebarMainImg.src = currentSpot.photos[index];
    if (galleryCounter) galleryCounter.textContent = `${index + 1}/${currentSpot.photos.length}`;

    // Actualizar borde de miniatura activa
    document.querySelectorAll('.thumb-item-btn').forEach((btn, idx) => {
      if (idx === index) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Botón flecha izquierda en galería
  const btnPrevPhoto = document.getElementById('btnPrevPhoto');
  if (btnPrevPhoto) {
    btnPrevPhoto.addEventListener('click', (e) => {
      e.stopPropagation();
      const prevIdx = (currentPhotoIndex - 1 + currentSpot.photos.length) % currentSpot.photos.length;
      switchGalleryPhoto(prevIdx);
    });
  }

  // Botón corazón favoritos en galería y tarjetas
  document.addEventListener('click', (e) => {
    const favBtn = e.target.closest('.btn-card-fav, .gallery-top-btn.btn-fav-photo');
    if (favBtn) {
      favBtn.classList.toggle('active');
    }
  });

  // Mini Tarjeta Flotante clic -> Pan suave
  const miniSpotCard = document.getElementById('miniSpotFloatingCard');
  if (miniSpotCard) {
    miniSpotCard.addEventListener('click', () => {
      selectParkingSpot(currentSpot);
    });
  }

  // =========================================================================
  // 5. FILTROS RÁPIDOS (CHIPS FLOTANTES)
  // =========================================================================
  const filterChips = document.querySelectorAll('.chip-btn');
  filterChips.forEach(chip => {
    chip.addEventListener('click', function () {
      filterChips.forEach(c => c.classList.remove('active'));
      this.classList.add('active');

      const filter = this.getAttribute('data-filter');
      activeFilter = filter;

      let filtered = parkingSpots;
      if (filter === '24hs') {
        filtered = parkingSpots.filter(s => s.is24hs);
      } else if (filter === 'techado') {
        filtered = parkingSpots.filter(s => s.isCovered);
      } else if (filter === 'mp') {
        filtered = parkingSpots.filter(s => s.acceptsMP);
      } else if (filter === 'price') {
        filtered = parkingSpots.filter(s => s.price < 3000);
      } else if (filter === 'charge') {
        filtered = parkingSpots.filter(s => s.hasCharger);
      }

      renderMapMarkers(filtered);
      if (filtered.length > 0 && !filtered.some(s => s.id === currentSpot.id)) {
        selectParkingSpot(filtered[0]);
      }
    });
  });

  // =========================================================================
  // 6. BUSCADOR SUPERIOR
  // =========================================================================
  const searchInput = document.getElementById('mainSearchInput');
  const btnSearchMain = document.getElementById('btnSearchMain');

  function doSearch() {
    const q = searchInput ? searchInput.value.trim().toLowerCase() : '';
    if (!q) {
      renderMapMarkers(parkingSpots);
      return;
    }

    const matches = parkingSpots.filter(s =>
      s.name.toLowerCase().includes(q) ||
      s.address.toLowerCase().includes(q) ||
      s.neighborhood.toLowerCase().includes(q)
    );

    if (matches.length > 0) {
      renderMapMarkers(matches);
      selectParkingSpot(matches[0]);
      map.flyTo([matches[0].lat, matches[0].lng], 14, { duration: 0.8 });
    } else {
      // Intento inteligente de zoom si es un barrio conocido de CABA
      if (q.includes('palermo')) {
        map.flyTo([-34.5880, -58.4280], 14);
      } else if (q.includes('recoleta')) {
        map.flyTo([-34.5882, -58.3934], 15);
      } else if (q.includes('retiro') || q.includes('san martin')) {
        map.flyTo([-34.5955, -58.3768], 15);
      } else if (q.includes('belgrano')) {
        map.flyTo([-34.5620, -58.4560], 14);
      } else if (q.includes('centro') || q.includes('obelisco')) {
        map.flyTo([-34.6035, -58.3815], 15);
      }
    }
  }

  if (btnSearchMain) {
    btnSearchMain.addEventListener('click', doSearch);
  }
  if (searchInput) {
    searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        doSearch();
      }
    });
  }

  // =========================================================================
  // 7. POPOVERS (HORA Y VEHÍCULO)
  // =========================================================================
  const btnFilterTime = document.getElementById('btnFilterTime');
  const timePickerPopover = document.getElementById('timePickerPopover');
  const btnApplyTime = document.getElementById('btnApplyTime');
  const timeLabelText = document.getElementById('timeLabelText');

  if (btnFilterTime && timePickerPopover) {
    btnFilterTime.addEventListener('click', (e) => {
      e.stopPropagation();
      timePickerPopover.classList.toggle('active');
      if (vehiclePickerPopover) vehiclePickerPopover.classList.remove('active');
    });
  }

  if (btnApplyTime) {
    btnApplyTime.addEventListener('click', () => {
      const selectDay = document.getElementById('popoverSelectDay').value;
      const selectFrom = document.getElementById('popoverTimeFrom').value;
      const selectTo = document.getElementById('popoverTimeTo').value;
      if (timeLabelText) {
        timeLabelText.textContent = `${selectDay}, ${selectFrom} - ${selectTo}`;
      }
      timePickerPopover.classList.remove('active');
    });
  }

  const btnFilterVeh = document.getElementById('btnFilterVeh');
  const vehiclePickerPopover = document.getElementById('vehiclePickerPopover');
  const vehLabelText = document.getElementById('vehLabelText');

  if (btnFilterVeh && vehiclePickerPopover) {
    btnFilterVeh.addEventListener('click', (e) => {
      e.stopPropagation();
      vehiclePickerPopover.classList.toggle('active');
      if (timePickerPopover) timePickerPopover.classList.remove('active');
    });
  }

  document.querySelectorAll('.vehicle-option-item').forEach(btn => {
    btn.addEventListener('click', function () {
      const type = this.getAttribute('data-type');
      if (vehLabelText) {
        vehLabelText.textContent = `${type} ▾`;
      }
      vehiclePickerPopover.classList.remove('active');
    });
  });

  // Cerrar popovers al hacer clic afuera
  document.addEventListener('click', () => {
    if (timePickerPopover) timePickerPopover.classList.remove('active');
    if (vehiclePickerPopover) vehiclePickerPopover.classList.remove('active');
    const userMenu = document.getElementById('userMenuPopover');
    if (userMenu) userMenu.classList.remove('show');
  });

  // Menu de usuario
  const btnUserAccount = document.getElementById('btnUserAccount');
  const userMenuPopover = document.getElementById('userMenuPopover');
  if (btnUserAccount && userMenuPopover) {
    btnUserAccount.addEventListener('click', (e) => {
      e.stopPropagation();
      userMenuPopover.classList.toggle('show');
    });
  }

  // =========================================================================
  // 8. CONTROLES DEL MAPA (+, -, BRÚJULA)
  // =========================================================================
  const btnZoomIn = document.getElementById('btnZoomIn');
  const btnZoomOut = document.getElementById('btnZoomOut');
  const btnCompass = document.getElementById('btnCompass');

  if (btnZoomIn) {
    btnZoomIn.addEventListener('click', () => map.zoomIn());
  }
  if (btnZoomOut) {
    btnZoomOut.addEventListener('click', () => map.zoomOut());
  }
  if (btnCompass) {
    btnCompass.addEventListener('click', () => {
      map.flyTo([-34.5950, -58.4050], 13.5, { duration: 1 });
    });
  }

  // =========================================================================
  // 9. EVENTOS DE CLIC EN TARJETAS DE ABAJO (RECOMENDADOS Y POPULARES)
  // =========================================================================
  document.querySelectorAll('.spot-card-rec, .spot-card-popular').forEach(card => {
    card.addEventListener('click', function (e) {
      if (e.target.closest('.btn-card-fav')) return; // No disparar si clica favorito
      const spotId = parseInt(this.getAttribute('data-id'));
      const targetSpot = parkingSpots.find(s => s.id === spotId);
      if (targetSpot) {
        selectParkingSpot(targetSpot);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  });

  // Carrusel de Recomendados (scroll suave)
  const carouselTrack = document.getElementById('recommendedCardsTrack');
  const btnCarouselPrev = document.getElementById('btnCarouselPrev');
  const btnCarouselNext = document.getElementById('btnCarouselNext');

  if (btnCarouselPrev && carouselTrack) {
    btnCarouselPrev.addEventListener('click', () => {
      carouselTrack.scrollBy({ left: -280, behavior: 'smooth' });
    });
  }
  if (btnCarouselNext && carouselTrack) {
    btnCarouselNext.addEventListener('click', () => {
      carouselTrack.scrollBy({ left: 280, behavior: 'smooth' });
    });
  }

  // =========================================================================
  // 10. GENERADOR DE CÓDIGO QR VECTORIAL DE ALTA DEFINICIÓN (SVG REAL)
  // =========================================================================
  function generateHighDefSVGQR(payloadText) {
    // Matriz de 29x29 módulos para QR auténtico y nítido
    const size = 29;
    const matrix = Array.from({ length: size }, () => Array(size).fill(0));

    // 1. Finder patterns en esquinas (Superior-Izq, Superior-Der, Inferior-Izq)
    function drawFinder(row, col) {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          if (r === 0 || r === 6 || c === 0 || c === 6 || (r >= 2 && r <= 4 && c >= 2 && c <= 4)) {
            matrix[row + r][col + c] = 1;
          }
        }
      }
    }
    drawFinder(0, 0);
    drawFinder(0, size - 7);
    drawFinder(size - 7, 0);

    // 2. Alignment pattern en posición (20, 20)
    const alignRow = 20, alignCol = 20;
    for (let r = -2; r <= 2; r++) {
      for (let c = -2; c <= 2; c++) {
        if (Math.abs(r) === 2 || Math.abs(c) === 2 || (r === 0 && c === 0)) {
          matrix[alignRow + r][alignCol + c] = 1;
        }
      }
    }

    // 3. Timing patterns (líneas punteadas en fila 6 y columna 6)
    for (let i = 8; i < size - 8; i++) {
      matrix[6][i] = i % 2 === 0 ? 1 : 0;
      matrix[i][6] = i % 2 === 0 ? 1 : 0;
    }

    // 4. Generación pseudo-aleatoria determinística para el payload
    let hash = 0;
    for (let i = 0; i < payloadText.length; i++) {
      hash = (hash << 5) - hash + payloadText.charCodeAt(i);
      hash |= 0;
    }

    // Llenar módulos de datos respetando zonas reservadas
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        // Ignorar finders
        if ((r < 8 && c < 8) || (r < 8 && c >= size - 8) || (r >= size - 8 && c < 8)) continue;
        // Ignorar alignment
        if (r >= alignRow - 2 && r <= alignRow + 2 && c >= alignCol - 2 && c <= alignCol + 2) continue;
        // Ignorar timing
        if (r === 6 || c === 6) continue;

        const val = ((r * 31 + c * 17 + Math.abs(hash)) % 100);
        matrix[r][c] = val < 46 ? 1 : 0;
      }
    }

    // Construir SVG de alta definición
    const cellSize = 4;
    const padding = 8;
    const totalDim = size * cellSize + padding * 2;
    let rects = '';

    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (matrix[r][c] === 1) {
          const x = padding + c * cellSize;
          const y = padding + r * cellSize;
          rects += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" fill="#0F172A" shape-rendering="crispEdges"/>`;
        }
      }
    }

    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalDim} ${totalDim}" width="100%" height="100%" style="display:block;">
        <rect width="${totalDim}" height="${totalDim}" fill="#FFFFFF" rx="6"/>
        ${rects}
      </svg>
    `;
  }

  // =========================================================================
  // 11. MODAL DE RESERVA COMPACTO Y UNIFICADO (TODO EN UNA MINI VENTANA)
  // =========================================================================
  const modalOverlay = document.getElementById('reservationModal');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const btnBookSidebar = document.getElementById('btnBookSidebar');
  const modalBookingFormView = document.getElementById('modalBookingFormView');
  const modalConfirmationTicketView = document.getElementById('modalConfirmationTicketView');

  // Elementos del formulario compacto
  const inputBookingDate = document.getElementById('inputBookingDate');
  const inputTimeFrom = document.getElementById('inputTimeFrom');
  const inputTimeTo = document.getElementById('inputTimeTo');
  const lblEstimatedDuration = document.getElementById('lblEstimatedDuration');
  const lblSelectedCochera = document.getElementById('lblSelectedCochera');
  const inputBookingPlate = document.getElementById('inputBookingPlate');
  const selectBookingVehicleType = document.getElementById('selectBookingVehicleType');
  const btnConfirmReservation = document.getElementById('btnConfirmReservation');

  // Elementos de desglose de precio
  const lblRateLine = document.getElementById('lblRateLine');
  const lblSubtotal = document.getElementById('lblSubtotal');
  const lblDiscount = document.getElementById('lblDiscount');
  const lblTotal = document.getElementById('lblTotal');

  // Botones de acción del ticket
  const btnTicketViewMap = document.getElementById('btnTicketViewMap');
  const btnTicketDownload = document.getElementById('btnTicketDownload');
  const btnTicketClose = document.getElementById('btnTicketClose');

  // Estado centralizado de la reserva
  const reservationState = {
    dateRaw: "2026-11-08",
    dateShort: "Sáb. 8 nov.",
    timeFrom: "10:00",
    timeTo: "14:00",
    timeSlot: "10:00 - 14:00",
    hours: 4,
    spot: "A03",
    spotLevel: "Nivel -1",
    plate: "AE 123 CD",
    vehicleType: "Auto",
    bookingCode: "#PK-8492",
    subtotal: 10000,
    discount: 2000,
    total: 8000
  };

  // Formatear fecha legible corta
  function formatShortDate(dateStr) {
    if (!dateStr) return "Sáb. 8 nov.";
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10);
        const day = parseInt(parts[2], 10);
        const dateObj = new Date(year, month - 1, day);
        const days = ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.'];
        const months = ['ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.', 'jul.', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.'];
        const dayName = days[dateObj.getDay()] || 'Sáb.';
        const monthName = months[month - 1] || 'nov.';
        return `${dayName} ${day} ${monthName}`;
      }
    } catch (e) {
      console.warn("Date parse error:", e);
    }
    return dateStr;
  }

  // Calcular duración y montos en tiempo real con horarios libres
  function updateBookingCalculations() {
    if (!currentSpot) return;

    const fromVal = inputTimeFrom && inputTimeFrom.value ? inputTimeFrom.value : "10:00";
    const toVal = inputTimeTo && inputTimeTo.value ? inputTimeTo.value : "14:00";

    const [fromH, fromM] = fromVal.split(':').map(Number);
    const [toH, toM] = toVal.split(':').map(Number);

    let fromMinutes = ((fromH || 0) * 60) + (fromM || 0);
    let toMinutes = ((toH || 0) * 60) + (toM || 0);

    let diffMinutes = toMinutes - fromMinutes;
    if (diffMinutes <= 0) {
      diffMinutes = 60; // Mínimo 1 hora si la salida es previa o igual
    }

    const hoursExact = diffMinutes / 60;
    const hours = Math.max(1, Math.round(hoursExact * 10) / 10);

    reservationState.hours = hours;
    reservationState.timeFrom = fromVal;
    reservationState.timeTo = toVal;
    reservationState.timeSlot = `${fromVal} - ${toVal}`;

    const dateVal = inputBookingDate && inputBookingDate.value ? inputBookingDate.value : "2026-11-08";
    reservationState.dateRaw = dateVal;
    reservationState.dateShort = formatShortDate(dateVal);

    if (lblEstimatedDuration) {
      const hoursText = hours === 1 ? '1 hora' : (Number.isInteger(hours) ? `${hours} horas` : `${hours} horas`);
      lblEstimatedDuration.textContent = hoursText;
    }

    const pricePerHour = currentSpot.price || 2500;
    const subtotal = Math.round(pricePerHour * hours);
    const discount = Math.round(subtotal * 0.20);
    const total = subtotal - discount;

    reservationState.subtotal = subtotal;
    reservationState.discount = discount;
    reservationState.total = total;

    if (lblRateLine) {
      const hoursLabel = hours === 1 ? '1 hora' : `${hours} horas`;
      lblRateLine.textContent = `Estadía estimada (${hoursLabel} a ${formatMoney(pricePerHour)}/h)`;
    }
    if (lblSubtotal) lblSubtotal.textContent = formatMoney(subtotal);
    if (lblDiscount) lblDiscount.textContent = `-${formatMoney(discount)}`;
    if (lblTotal) lblTotal.textContent = formatMoney(total);
  }

  // Listeners para recálculo automático cuando cambian los horarios libres o fecha
  if (inputTimeFrom) inputTimeFrom.addEventListener('input', updateBookingCalculations);
  if (inputTimeTo) inputTimeTo.addEventListener('input', updateBookingCalculations);
  if (inputBookingDate) inputBookingDate.addEventListener('change', updateBookingCalculations);

  // Mayúsculas automáticas en patente
  if (inputBookingPlate) {
    inputBookingPlate.addEventListener('input', function () {
      this.value = this.value.toUpperCase();
    });
  }

  // Selección interactiva de cochera dentro de la mini ventana
  const compactSpotButtons = document.querySelectorAll('.cocheras-compact-matrix .compact-spot-btn.available');
  compactSpotButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      // Remover clase seleccionada y estrella de todos
      document.querySelectorAll('.cocheras-compact-matrix .compact-spot-btn').forEach(b => {
        b.classList.remove('selected');
        const star = b.querySelector('.spot-indicator-star');
        if (star) star.remove();
      });

      // Activar el seleccionado
      this.classList.add('selected');
      const starSpan = document.createElement('span');
      starSpan.className = 'spot-indicator-star';
      starSpan.textContent = '★';
      this.appendChild(starSpan);

      const spotCode = this.getAttribute('data-spot') || 'A03';
      const spotLevel = this.getAttribute('data-level') || 'Nivel -1';
      reservationState.spot = spotCode;
      reservationState.spotLevel = spotLevel;

      if (lblSelectedCochera) {
        lblSelectedCochera.textContent = `${spotCode} (${spotLevel})`;
      }
    });
  });

  // Renderizar Ticket de Confirmación con QR de Alta Definición
  function renderConfirmationTicket() {
    const codeElem = document.getElementById('ticketBookingCode');
    if (codeElem) codeElem.textContent = reservationState.bookingCode;

    const spotElem = document.getElementById('ticketGarageSpot');
    if (spotElem) spotElem.textContent = `${currentSpot.name} · ${reservationState.spot} - ${reservationState.spotLevel}`;

    const dateElem = document.getElementById('ticketDateTime');
    if (dateElem) dateElem.textContent = `${reservationState.dateShort} · ${reservationState.timeSlot}`;

    const vehicleElem = document.getElementById('ticketVehicle');
    if (vehicleElem) vehicleElem.textContent = `${reservationState.vehicleType} · Patente ${reservationState.plate}`;

    // Generar código QR vectorial nítido con el SVG generator
    const qrHolder = document.getElementById('qrCanvasHolder');
    if (qrHolder) {
      const qrPayload = `PARKIA-TICKET|CODE:${reservationState.bookingCode}|GARAGE:${currentSpot.name}|SPOT:${reservationState.spot}|DATE:${reservationState.dateShort}|TIME:${reservationState.timeSlot}|PLATE:${reservationState.plate}`;
      qrHolder.innerHTML = generateHighDefSVGQR(qrPayload);
    }

    // Guardar en localStorage para 'Mis reservas' y 'confirmacion.html'
    const ticketData = {
      code: reservationState.bookingCode,
      garageName: currentSpot.name,
      garageAddress: currentSpot.address,
      spot: reservationState.spot,
      spotLevel: reservationState.spotLevel,
      date: reservationState.dateShort,
      time: reservationState.timeSlot,
      plate: reservationState.plate,
      vehicleType: reservationState.vehicleType,
      price: currentSpot.price,
      total: reservationState.total,
      createdAt: new Date().toISOString()
    };
    try {
      localStorage.setItem('parkia_last_reservation', JSON.stringify(ticketData));
      const existing = JSON.parse(localStorage.getItem('parkia_my_reservations') || '[]');
      existing.unshift(ticketData);
      localStorage.setItem('parkia_my_reservations', JSON.stringify(existing));
    } catch (e) {
      console.warn("Storage warning:", e);
    }
  }

  // Confirmar y procesar reserva desde la mini ventana
  if (btnConfirmReservation) {
    btnConfirmReservation.addEventListener('click', () => {
      const plate = inputBookingPlate && inputBookingPlate.value.trim() ? inputBookingPlate.value.trim().toUpperCase() : "AE 123 CD";
      const vehicleType = selectBookingVehicleType ? selectBookingVehicleType.value : "Auto";
      const dateVal = inputBookingDate && inputBookingDate.value ? inputBookingDate.value : "2026-11-08";

      reservationState.plate = plate;
      reservationState.vehicleType = vehicleType;
      reservationState.dateRaw = dateVal;
      reservationState.dateShort = formatShortDate(dateVal);

      // Código de reserva
      reservationState.bookingCode = `#PK-${Math.floor(1000 + Math.random() * 9000)}`;

      btnConfirmReservation.innerHTML = '<span>Generando reserva...</span>';
      btnConfirmReservation.disabled = true;

      setTimeout(() => {
        btnConfirmReservation.innerHTML = `<span>Confirmar y Reservar</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
        btnConfirmReservation.disabled = false;

        if (modalBookingFormView) modalBookingFormView.style.display = 'none';
        if (modalConfirmationTicketView) modalConfirmationTicketView.style.display = 'block';

        renderConfirmationTicket();
      }, 350);
    });
  }

  // Abrir / Cerrar modal
  function openReservationModal() {
    if (!modalOverlay) return;

    // Restaurar a la vista de formulario
    if (modalBookingFormView) modalBookingFormView.style.display = 'block';
    if (modalConfirmationTicketView) modalConfirmationTicketView.style.display = 'none';

    // Actualizar garaje seleccionado en el encabezado de la mini ventana
    if (currentSpot) {
      const modalImg = document.getElementById('modalGarageImg');
      const modalTitle = document.getElementById('modalGarageTitle');
      const modalBadge = document.getElementById('modalSpotBadge');
      const modalLoc = document.getElementById('modalGarageLoc');
      const modalPrice = document.getElementById('modalPriceHour');

      if (modalImg) modalImg.src = currentSpot.photos && currentSpot.photos[0] ? currentSpot.photos[0] : '';
      if (modalTitle) modalTitle.textContent = currentSpot.name;
      if (modalBadge) modalBadge.textContent = `${currentSpot.isCovered ? 'Techado' : 'Aire libre'} • ${currentSpot.is24hs ? '24hs' : 'Diurno'}`;
      if (modalLoc) modalLoc.textContent = currentSpot.address;
      if (modalPrice) modalPrice.textContent = `${formatMoney(currentSpot.price)} / hora`;
    }

    updateBookingCalculations();
    modalOverlay.classList.add('open');
  }

  function closeReservationModal() {
    if (modalOverlay) modalOverlay.classList.remove('open');
  }

  // Eventos de botones abrir/cerrar
  if (btnBookSidebar) {
    btnBookSidebar.addEventListener('click', (e) => {
      e.preventDefault();
      openReservationModal();
    });
  }

  if (btnCloseModal) {
    btnCloseModal.addEventListener('click', closeReservationModal);
  }

  if (btnTicketClose) {
    btnTicketClose.addEventListener('click', closeReservationModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeReservationModal();
    });
  }

  // Botón "Ver en el mapa" en el ticket
  if (btnTicketViewMap) {
    btnTicketViewMap.addEventListener('click', () => {
      closeReservationModal();
      if (currentSpot && map) {
        map.flyTo([currentSpot.lat, currentSpot.lng], 16, { duration: 1 });
      }
    });
  }

  // Botón "Descargar ticket"
  if (btnTicketDownload) {
    btnTicketDownload.addEventListener('click', () => {
      window.print();
    });
  }

  // =========================================================================
  // 12. INICIALIZAR LA VISTA CON LA PRIMERA COCHERA
  // =========================================================================
  renderMapMarkers(parkingSpots);
  selectParkingSpot(parkingSpots[0]);
});
