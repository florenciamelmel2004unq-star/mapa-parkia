/**
 * PARKIA — LÓGICA DE INTERACCIÓN DE LA PÁGINA PRINCIPAL (HOME)
 * Identidad: Modern Mobility
 */

document.addEventListener('DOMContentLoaded', function () {
  // Inicializar iconos de Lucide
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // =========================================================================
  // 1. HEADER: EFECTO SCROLL STICKY & MENÚ MÓVIL
  // =========================================================================
  const header = document.querySelector('.parkia-header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Menú móvil drawer
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileDrawerClose = document.getElementById('mobileDrawerClose');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', function () {
      mobileDrawer.classList.add('open');
    });
    if (mobileDrawerClose) {
      mobileDrawerClose.addEventListener('click', function () {
        mobileDrawer.classList.remove('open');
      });
    }
  }

  // =========================================================================
  // 2. GESTIÓN DE ESTADO DE SESIÓN (MODO INVITADO VS MODO USUARIO AUTENTICADO)
  // =========================================================================
  const guestSection = document.getElementById('headerGuestSection');
  const userSection = document.getElementById('headerUserSection');
  const sessionToggleBtn = document.getElementById('sessionToggleBtn');
  const userMenuTrigger = document.getElementById('userMenuTrigger');
  const userDropdown = document.getElementById('userDropdown');
  const logoutBtn = document.getElementById('logoutBtn');

  // Comprobar si hay un usuario en sesión
  function checkSessionState() {
    const user = JSON.parse(localStorage.getItem('parkia_user') || 'null');
    if (user) {
      guestSection.classList.add('hidden');
      userSection.classList.add('active');
      const nameEl = document.getElementById('userDisplayName');
      const emailEl = document.getElementById('userDisplayEmail');
      const avatarEl = document.getElementById('userAvatarInitials');

      const fullName = user.full_name || (user.first_name ? user.first_name + ' ' + (user.last_name || '') : 'Usuario Parkia');
      if (nameEl) nameEl.textContent = fullName;
      if (emailEl) emailEl.textContent = user.email || 'usuario@parkia.com';
      if (avatarEl) {
        const initials = fullName.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
        avatarEl.textContent = initials || 'US';
      }
      if (sessionToggleBtn) {
        sessionToggleBtn.innerHTML = '<span class="dot" style="background:#10B981;"></span> Conectado: ' + (user.first_name || 'Usuario');
      }
    } else {
      guestSection.classList.remove('hidden');
      userSection.classList.remove('active');
      if (userDropdown) userDropdown.classList.remove('show');
      if (sessionToggleBtn) {
        sessionToggleBtn.innerHTML = '<span class="dot" style="background:#94A3B8;"></span> Vista Invitado (Click p/ simular usuario)';
      }
    }
  }

  // Toggle rápido de sesión para demostración de las 2 versiones del Header
  if (sessionToggleBtn) {
    sessionToggleBtn.addEventListener('click', function () {
      const user = JSON.parse(localStorage.getItem('parkia_user') || 'null');
      if (user) {
        localStorage.removeItem('parkia_user');
      } else {
        localStorage.setItem('parkia_user', JSON.stringify({
          id: 1,
          first_name: 'Santiago',
          last_name: 'Gómez',
          full_name: 'Santiago Gómez',
          email: 'santiago@parkia.com',
          role: 'driver'
        }));
      }
      checkSessionState();
    });
  }

  // Dropdown del avatar de usuario
  if (userMenuTrigger && userDropdown) {
    userMenuTrigger.addEventListener('click', function (e) {
      e.stopPropagation();
      userDropdown.classList.toggle('show');
    });
  }

  // Cerrar sesión
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.removeItem('parkia_user');
      checkSessionState();
    });
  }

  // Cerrar dropdown al hacer click fuera
  document.addEventListener('click', function (e) {
    if (userDropdown && !userDropdown.contains(e.target) && !userMenuTrigger.contains(e.target)) {
      userDropdown.classList.remove('show');
    }
  });

  checkSessionState();

  // =========================================================================
  // 3. BUSCADOR DESTACADO INTERACTIVO (HERO)
  // =========================================================================
  const segmentLocation = document.getElementById('segmentLocation');
  const segmentDateTime = document.getElementById('segmentDateTime');
  const segmentVehicle = document.getElementById('segmentVehicle');

  const popoverLocation = document.getElementById('popoverLocation');
  const popoverDateTime = document.getElementById('popoverDateTime');
  const popoverVehicle = document.getElementById('popoverVehicle');

  const displayLocation = document.getElementById('displayLocation');
  const displayDateTime = document.getElementById('displayDateTime');
  const displayVehicle = document.getElementById('displayVehicle');

  const inputLocation = document.getElementById('inputLocation');
  const inputDate = document.getElementById('inputDate');
  const inputStartTime = document.getElementById('inputStartTime');
  const inputEndTime = document.getElementById('inputEndTime');

  // Inicializar fecha de hoy por defecto en YYYY-MM-DD
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const todayStr = `${yyyy}-${mm}-${dd}`;
  if (inputDate) {
    inputDate.value = todayStr;
    inputDate.min = todayStr;
  }

  function closeAllPopovers() {
    if (popoverLocation) popoverLocation.classList.remove('show');
    if (popoverDateTime) popoverDateTime.classList.remove('show');
    if (popoverVehicle) popoverVehicle.classList.remove('show');

    if (segmentLocation) segmentLocation.classList.remove('active');
    if (segmentDateTime) segmentDateTime.classList.remove('active');
    if (segmentVehicle) segmentVehicle.classList.remove('active');
  }

  // Manejar apertura de popovers
  if (segmentLocation) {
    segmentLocation.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = popoverLocation.classList.contains('show');
      closeAllPopovers();
      if (!isOpen) {
        popoverLocation.classList.add('show');
        segmentLocation.classList.add('active');
        if (inputLocation) inputLocation.focus();
      }
    });
  }

  if (segmentDateTime) {
    segmentDateTime.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = popoverDateTime.classList.contains('show');
      closeAllPopovers();
      if (!isOpen) {
        popoverDateTime.classList.add('show');
        segmentDateTime.classList.add('active');
      }
    });
  }

  if (segmentVehicle) {
    segmentVehicle.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = popoverVehicle.classList.contains('show');
      closeAllPopovers();
      if (!isOpen) {
        popoverVehicle.classList.add('show');
        segmentVehicle.classList.add('active');
      }
    });
  }

  // Prevenir cierre al hacer click dentro del popover
  [popoverLocation, popoverDateTime, popoverVehicle].forEach(pop => {
    if (pop) {
      pop.addEventListener('click', function (e) {
        e.stopPropagation();
      });
    }
  });

  // Cerrar popovers al hacer click fuera
  document.addEventListener('click', function () {
    closeAllPopovers();
  });

  // Selección de Ubicación en el popover
  document.querySelectorAll('.zone-item').forEach(item => {
    item.addEventListener('click', function () {
      const zone = this.getAttribute('data-zone');
      if (displayLocation) {
        displayLocation.innerHTML = `<span class="segment-value">${zone}</span>`;
      }
      if (inputLocation) {
        inputLocation.value = zone;
      }
      closeAllPopovers();
    });
  });

  if (inputLocation) {
    inputLocation.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        const val = this.value.trim();
        if (val && displayLocation) {
          displayLocation.innerHTML = `<span class="segment-value">${val}</span>`;
        }
        closeAllPopovers();
      }
    });
  }

  // Actualización de Fecha y Horario
  function updateDateTimeDisplay() {
    if (!displayDateTime) return;
    const dateVal = inputDate ? inputDate.value : todayStr;
    const startVal = inputStartTime ? inputStartTime.value : '14:00';
    const endVal = inputEndTime ? inputEndTime.value : '18:00';

    let dateLabel = 'Hoy';
    if (dateVal !== todayStr) {
      const parts = dateVal.split('-');
      if (parts.length === 3) {
        dateLabel = `${parts[2]}/${parts[1]}`;
      }
    }

    displayDateTime.innerHTML = `<span class="segment-value">${dateLabel} · ${startVal} - ${endVal}</span>`;
  }

  if (inputDate) inputDate.addEventListener('change', updateDateTimeDisplay);
  if (inputStartTime) inputStartTime.addEventListener('change', updateDateTimeDisplay);
  if (inputEndTime) inputEndTime.addEventListener('change', updateDateTimeDisplay);

  // Chips de duración rápida (sugerencias opcionales)
  document.querySelectorAll('.chip-duration').forEach(chip => {
    chip.addEventListener('click', function () {
      document.querySelectorAll('.chip-duration').forEach(c => c.classList.remove('active'));
      this.classList.add('active');

      const hours = parseInt(this.getAttribute('data-hours'), 10);
      if (inputStartTime && inputEndTime) {
        const [currH, currM] = inputStartTime.value.split(':').map(Number);
        let endH = (currH + hours) % 24;
        let endHStr = String(endH).padStart(2, '0');
        inputEndTime.value = `${endHStr}:${String(currM).padStart(2, '0')}`;
        updateDateTimeDisplay();
      }
    });
  });

  const btnApplyDateTime = document.getElementById('btnApplyDateTime');
  if (btnApplyDateTime) {
    btnApplyDateTime.addEventListener('click', function () {
      updateDateTimeDisplay();
      closeAllPopovers();
    });
  }

  // Selección de Tipo de Vehículo
  document.querySelectorAll('.vehicle-opt').forEach(opt => {
    opt.addEventListener('click', function () {
      document.querySelectorAll('.vehicle-opt').forEach(o => o.classList.remove('selected'));
      this.classList.add('selected');

      const vehicleName = this.getAttribute('data-vehicle');
      if (displayVehicle) {
        displayVehicle.innerHTML = `<span class="segment-value">${vehicleName}</span>`;
      }
      closeAllPopovers();
    });
  });

  // Botón Principal de Búsqueda (Cálculo y Redirección al Buscador)
  const btnHeroSearch = document.getElementById('btnHeroSearch');
  if (btnHeroSearch) {
    btnHeroSearch.addEventListener('click', function () {
      const loc = inputLocation ? inputLocation.value.trim() : '';
      const dateVal = inputDate ? inputDate.value : '';
      const startVal = inputStartTime ? inputStartTime.value : '';
      const endVal = inputEndTime ? inputEndTime.value : '';

      const selectedVeh = document.querySelector('.vehicle-opt.selected');
      const vehVal = selectedVeh ? selectedVeh.getAttribute('data-vehicle') : 'Auto';

      // Redirigir a la vista del buscador con los parámetros preparados (detectando si se corre en subcarpeta)
      const params = new URLSearchParams();
      if (loc) params.set('q', loc);
      if (dateVal) params.set('fecha', dateVal);
      if (startVal) params.set('desde', startVal);
      if (endVal) params.set('hasta', endVal);
      if (vehVal) params.set('vehiculo', vehVal);

      let targetUrl = 'vistas/buscador.html';
      const path = window.location.pathname;
      if (path.includes('Parkia Front') || path.includes('Parkia%20Front')) {
        const folder = path.includes('Parkia%20Front') ? 'Parkia%20Front' : 'Parkia Front';
        targetUrl = `/${folder}/vistas/buscador.html`;
      }

      window.location.href = `${targetUrl}?${params.toString()}`;
    });
  }

  // =========================================================================
  // 4. ESTACIONAMIENTOS RECOMENDADOS: FILTROS POR CHIP
  // =========================================================================
  const filterChips = document.querySelectorAll('.filter-chip');
  const spotCards = document.querySelectorAll('.spot-card');

  filterChips.forEach(chip => {
    chip.addEventListener('click', function () {
      filterChips.forEach(c => c.classList.remove('active'));
      this.classList.add('active');

      const filterType = this.getAttribute('data-filter');

      spotCards.forEach(card => {
        if (filterType === 'all') {
          card.style.display = 'flex';
        } else {
          const tags = card.getAttribute('data-features') || '';
          if (tags.includes(filterType)) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });

  // =========================================================================
  // 5. MODALES: AUTENTICACIÓN (LOGIN / REGISTRO) & PROPIETARIOS (B2B)
  // =========================================================================
  const authModal = document.getElementById('authModal');
  const b2bModal = document.getElementById('b2bModal');
  const b2bHowModal = document.getElementById('b2bHowModal');

  // Triggers para abrir Login y Registro
  const btnOpenLogin = document.getElementById('btnOpenLogin');
  const btnOpenRegister = document.getElementById('btnOpenRegister');
  const btnMobileLogin = document.getElementById('btnMobileLogin');
  const btnMobileRegister = document.getElementById('btnMobileRegister');

  function openAuthModal(tab) {
    if (!authModal) return;
    authModal.classList.add('show');
    switchAuthTab(tab);
  }

  function closeModals() {
    if (authModal) authModal.classList.remove('show');
    if (b2bModal) b2bModal.classList.remove('show');
    if (b2bHowModal) b2bHowModal.classList.remove('show');
  }

  document.querySelectorAll('.modal-close-btn').forEach(btn => {
    btn.addEventListener('click', closeModals);
  });

  [authModal, b2bModal, b2bHowModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', function (e) {
        if (e.target === modal) closeModals();
      });
    }
  });

  if (btnOpenLogin) btnOpenLogin.addEventListener('click', () => openAuthModal('login'));
  if (btnOpenRegister) btnOpenRegister.addEventListener('click', () => openAuthModal('register'));
  if (btnMobileLogin) btnMobileLogin.addEventListener('click', () => {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    openAuthModal('login');
  });
  if (btnMobileRegister) btnMobileRegister.addEventListener('click', () => {
    if (mobileDrawer) mobileDrawer.classList.remove('open');
    openAuthModal('register');
  });

  // Tabs de Login y Registro
  const tabLoginBtn = document.getElementById('tabLoginBtn');
  const tabRegisterBtn = document.getElementById('tabRegisterBtn');
  const formLogin = document.getElementById('formLogin');
  const formRegister = document.getElementById('formRegister');

  function switchAuthTab(tab) {
    if (tab === 'login') {
      if (tabLoginBtn) tabLoginBtn.classList.add('active');
      if (tabRegisterBtn) tabRegisterBtn.classList.remove('active');
      if (formLogin) formLogin.style.display = 'block';
      if (formRegister) formRegister.style.display = 'none';
    } else {
      if (tabLoginBtn) tabLoginBtn.classList.remove('active');
      if (tabRegisterBtn) tabRegisterBtn.classList.add('active');
      if (formLogin) formLogin.style.display = 'none';
      if (formRegister) formRegister.style.display = 'block';
    }
  }

  if (tabLoginBtn) tabLoginBtn.addEventListener('click', () => switchAuthTab('login'));
  if (tabRegisterBtn) tabRegisterBtn.addEventListener('click', () => switchAuthTab('register'));

  // Manejo de envío de login estándar
  if (formLogin) {
    formLogin.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value.trim();
      const password = document.getElementById('loginPassword').value;

      // Intentar login con backend o autenticar localmente
      fetch('http://127.0.0.1:8000/api/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
      })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Credenciales inválidas');
      })
      .then(data => {
        localStorage.setItem('parkia_user', JSON.stringify(data.user));
        localStorage.setItem('parkia_token', data.tokens ? data.tokens.access : '');
        closeModals();
        checkSessionState();
      })
      .catch(() => {
        // Fallback demo local para experiencia fluida si backend no está encendido
        const mockUser = {
          id: 1,
          email: email || 'conductor@parkia.com',
          first_name: email.split('@')[0] || 'Conductor',
          last_name: 'Parkia',
          full_name: email.split('@')[0] || 'Conductor Parkia',
          role: 'driver'
        };
        localStorage.setItem('parkia_user', JSON.stringify(mockUser));
        closeModals();
        checkSessionState();
      });
    });
  }

  // Demo Login Rápido (Conductor / Administrador)
  const btnDemoDriver = document.getElementById('btnDemoDriver');
  const btnDemoAdmin = document.getElementById('btnDemoAdmin');

  if (btnDemoDriver) {
    btnDemoDriver.addEventListener('click', function () {
      const driverUser = {
        id: 1,
        email: 'conductor.demo@parkia.com',
        first_name: 'Santiago',
        last_name: 'Gómez',
        full_name: 'Santiago Gómez',
        role: 'driver'
      };
      localStorage.setItem('parkia_user', JSON.stringify(driverUser));
      closeModals();
      checkSessionState();
    });
  }

  if (btnDemoAdmin) {
    btnDemoAdmin.addEventListener('click', function () {
      const adminUser = {
        id: 2,
        email: 'admin.demo@parkia.com',
        first_name: 'Martina',
        last_name: 'Vázquez',
        full_name: 'Martina Vázquez',
        role: 'admin'
      };
      localStorage.setItem('parkia_user', JSON.stringify(adminUser));
      closeModals();
      checkSessionState();
    });
  }

  // Registro de usuarios
  if (formRegister) {
    formRegister.addEventListener('submit', function (e) {
      e.preventDefault();
      const nombre = document.getElementById('regNombre').value.trim();
      const apellido = document.getElementById('regApellido').value.trim();
      const email = document.getElementById('regEmail').value.trim();

      const newUser = {
        id: Date.now(),
        email: email,
        first_name: nombre,
        last_name: apellido,
        full_name: `${nombre} ${apellido}`,
        role: 'driver'
      };

      localStorage.setItem('parkia_user', JSON.stringify(newUser));
      closeModals();
      checkSessionState();
    });
  }

  // Modales B2B (Propietarios)
  const btnOpenB2B = document.getElementById('btnOpenB2B');
  const btnOpenB2BHow = document.getElementById('btnOpenB2BHow');

  if (btnOpenB2B && b2bModal) {
    btnOpenB2B.addEventListener('click', function (e) {
      e.preventDefault();
      b2bModal.classList.add('show');
    });
  }

  if (btnOpenB2BHow && b2bHowModal) {
    btnOpenB2BHow.addEventListener('click', function (e) {
      e.preventDefault();
      b2bHowModal.classList.add('show');
    });
  }

  const formB2BLead = document.getElementById('formB2BLead');
  if (formB2BLead) {
    formB2BLead.addEventListener('submit', function (e) {
      e.preventDefault();
      const feedback = document.getElementById('b2bSuccessMsg');
      if (feedback) {
        feedback.style.display = 'block';
        formB2BLead.reset();
        setTimeout(closeModals, 2400);
      }
    });
  }
});
