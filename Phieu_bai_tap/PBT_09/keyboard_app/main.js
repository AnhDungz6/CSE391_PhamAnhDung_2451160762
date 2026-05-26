// App Images Dataset
const IMAGES = [
  { id: 1, title: 'Bình Minh Sơn Đỉnh', category: 'Thiên Nhiên', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80', desc: 'Dãy núi tráng lệ lúc bình minh với sương mù bao quanh' },
  { id: 2, title: 'Rừng Xanh Đại Ngàn', category: 'Phong Cảnh', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop&q=80', desc: 'Những tia nắng ban mai xuyên qua tán cây cổ thụ xanh mát' },
  { id: 3, title: 'Bãi Biển Hoàng Hôn', category: 'Biển Cả', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80', desc: 'Bờ cát vàng và làn sóng êm đềm dưới ánh hoàng hôn rực rỡ' },
  { id: 4, title: 'Sa Mạc Cát Vàng', category: 'Hoang Mạc', url: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=800&auto=format&fit=crop&q=80', desc: 'Đồi cát uốn lượn trải dài bất bất tận dưới ánh nắng mặt trời' },
  { id: 5, title: 'Cực Quang Huyền Diệu', category: 'Thiên Văn', url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&auto=format&fit=crop&q=80', desc: 'Ánh sáng xanh cực quang lung linh vẽ đường cong quyến rũ trên bầu trời đêm bắc cực' },
  { id: 6, title: 'Vũ Trụ Vô Tận', category: 'Không Gian', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=80', desc: 'Hình ảnh tinh vân rực rỡ sắc màu xanh tím giữa không gian vũ trụ bao la' },
  { id: 7, title: 'Thành Phố Tương Lai', category: 'Cyberpunk', url: 'https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?w=800&auto=format&fit=crop&q=80', desc: 'Nhà cao tầng hiện đại chiếu ánh sáng neon rực rỡ phản chiếu xuống mặt đường mưa' },
  { id: 8, title: 'Rừng Lá Đỏ Mùa Thu', category: 'Mùa Trong Năm', url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80', desc: 'Con đường trải đầy lá phong màu vàng cam rực rỡ trong thời tiết thu se lạnh' },
  { id: 9, title: 'Đỉnh Núi Tuyết Trắng', category: 'Mùa Đông', url: 'https://images.unsplash.com/photo-1486496146582-9ffcd0b2b2b7?w=800&auto=format&fit=crop&q=80', desc: 'Đỉnh núi phủ tuyết trắng xóa hùng vĩ dưới bầu trời xanh thẳm của vùng lạnh giá' }
];

// App State
let currentIndex = 0;
let isModalOpen = false;
let isPaletteOpen = false;
let isSlideshowPlaying = false;
let slideshowTimer = null;
let progressTimer = null;
const SLIDESHOW_DURATION = 3000; // 3 seconds
let slideshowStartTime = 0;
let slideshowRemainingTime = SLIDESHOW_DURATION;
let activeCommandIndex = -1;
let lastFocusedElement = null;

// Commands list for Ctrl+K palette
const COMMANDS = [
  { id: 'play_slideshow', name: 'Play Slideshow', desc: 'Phát slideshow tự động', kbd: 'Space', action: startSlideshow },
  { id: 'pause_slideshow', name: 'Pause Slideshow', desc: 'Tạm dừng slideshow', kbd: 'Space', action: pauseSlideshow },
  { id: 'next_image', name: 'Next Image', desc: 'Chuyển sang hình ảnh tiếp theo', kbd: '→', action: nextImage },
  { id: 'prev_image', name: 'Previous Image', desc: 'Quay lại hình ảnh phía trước', kbd: '←', action: prevImage },
  { id: 'theme_toggle', name: 'Toggle Light/Dark Theme', desc: 'Đổi chủ đề sáng / tối', kbd: 'Ctrl+T', action: toggleTheme },
  { id: 'close_overlays', name: 'Close Overlay', desc: 'Đóng Modal hoặc Command Palette', kbd: 'Esc', action: closeAllOverlays },
  { id: 'goto_1', name: 'Go to Image 1', desc: 'Xem ảnh: Bình Minh Sơn Đỉnh', kbd: '1', action: () => openImage(0) },
  { id: 'goto_2', name: 'Go to Image 2', desc: 'Xem ảnh: Rừng Xanh Đại Ngàn', kbd: '2', action: () => openImage(1) },
  { id: 'goto_3', name: 'Go to Image 3', desc: 'Xem ảnh: Bãi Biển Hoàng Hôn', kbd: '3', action: () => openImage(2) },
  { id: 'goto_4', name: 'Go to Image 4', desc: 'Xem ảnh: Sa Mạc Cát Vàng', kbd: '4', action: () => openImage(3) },
  { id: 'goto_5', name: 'Go to Image 5', desc: 'Xem ảnh: Cực Quang Huyền Diệu', kbd: '5', action: () => openImage(4) },
  { id: 'goto_6', name: 'Go to Image 6', desc: 'Xem ảnh: Vũ Trụ Vô Tận', kbd: '6', action: () => openImage(5) },
  { id: 'goto_7', name: 'Go to Image 7', desc: 'Xem ảnh: Thành Phố Tương Lai', kbd: '7', action: () => openImage(6) },
  { id: 'goto_8', name: 'Go to Image 8', desc: 'Xem ảnh: Rừng Lá Đỏ Mùa Thu', kbd: '8', action: () => openImage(7) },
  { id: 'goto_9', name: 'Go to Image 9', desc: 'Xem ảnh: Đỉnh Núi Tuyết Trắng', kbd: '9', action: () => openImage(8) }
];

let filteredCommandsList = [...COMMANDS];

// DOM Elements
const galleryGrid = document.getElementById('galleryGrid');
const galleryModal = document.getElementById('galleryModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalCounter = document.getElementById('modalCounter');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalPrevBtn = document.getElementById('modalPrevBtn');
const modalNextBtn = document.getElementById('modalNextBtn');
const modalPlayBtn = document.getElementById('modalPlayBtn');
const progressFill = document.getElementById('progressFill');

const commandPalette = document.getElementById('commandPalette');
const paletteInput = document.getElementById('paletteInput');
const paletteList = document.getElementById('paletteList');
const openPaletteBtn = document.getElementById('openPaletteBtn');

const toastContainer = document.getElementById('toastContainer');
const srAnnouncer = document.getElementById('sr-announcer');

// Initialize Gallery Cards
function initGallery() {
  galleryGrid.innerHTML = '';
  IMAGES.forEach((img, index) => {
    const card = document.createElement('button');
    card.className = 'gallery-card';
    card.setAttribute('type', 'button');
    card.setAttribute('aria-label', `Xem hình ảnh ${index + 1}: ${img.title}. Nhấn phím số ${index + 1} làm phím tắt.`);
    card.setAttribute('data-index', index);
    
    card.innerHTML = `
      <span class="hotkey-badge" aria-hidden="true">${index + 1}</span>
      <div class="image-container">
        <img class="gallery-image" src="${img.url}" alt="${img.desc}" loading="lazy">
      </div>
      <div class="card-overlay">
        <span class="card-category">${img.category}</span>
        <h3 class="card-title">${img.title}</h3>
      </div>
    `;
    
    card.addEventListener('click', () => {
      openImage(index);
    });
    
    galleryGrid.appendChild(card);
  });
}

// Open Modal Lightbox
function openImage(index) {
  if (index < 0 || index >= IMAGES.length) return;
  
  if (!isModalOpen) {
    lastFocusedElement = document.activeElement;
    isModalOpen = true;
    galleryModal.classList.add('active');
    galleryModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  
  currentIndex = index;
  updateModalContent();
  closePalette();
  
  // Announcement for Screen Readers
  announceToScreenReader(`Đang hiển thị ảnh ${currentIndex + 1} trên ${IMAGES.length}: ${IMAGES[currentIndex].title}. ${IMAGES[currentIndex].desc}`);
  
  // Set Focus to modal container or close button for accessibility
  setTimeout(() => {
    modalCloseBtn.focus();
  }, 100);
}

// Update Image content in Modal
function updateModalContent() {
  const img = IMAGES[currentIndex];
  
  // Smooth transition effect
  modalImage.classList.add('changing');
  
  setTimeout(() => {
    modalImage.src = img.url;
    modalImage.alt = img.desc;
    modalTitle.textContent = img.title;
    modalCounter.textContent = `${currentIndex + 1} / ${IMAGES.length}`;
    modalImage.classList.remove('changing');
  }, 150);
  
  // Update disabled state for nav buttons
  modalPrevBtn.disabled = false;
  modalNextBtn.disabled = false;
  
  // Update active state in parent grid (optional visual aid)
  const cards = document.querySelectorAll('.gallery-card');
  cards.forEach((card, idx) => {
    if (idx === currentIndex) {
      card.classList.add('active-highlight');
    } else {
      card.classList.remove('active-highlight');
    }
  });

  if (isSlideshowPlaying) {
    resetSlideshowTimer();
  }
}

// Close Modal Lightbox
function closeModal() {
  if (!isModalOpen) return;
  
  isModalOpen = false;
  galleryModal.classList.remove('active');
  galleryModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  
  pauseSlideshow();
  announceToScreenReader('Đã đóng chế độ xem ảnh');
  
  // Restore focus for user convenience
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

// Navigate Previous Image
function prevImage() {
  if (!isModalOpen) {
    openImage(IMAGES.length - 1);
  } else {
    let nextIdx = currentIndex - 1;
    if (nextIdx < 0) nextIdx = IMAGES.length - 1;
    openImage(nextIdx);
  }
}

// Navigate Next Image
function nextImage() {
  if (!isModalOpen) {
    openImage(0);
  } else {
    let nextIdx = currentIndex + 1;
    if (nextIdx >= IMAGES.length) nextIdx = 0;
    openImage(nextIdx);
  }
}

// Toggle Slideshow
function toggleSlideshow() {
  if (isSlideshowPlaying) {
    pauseSlideshow();
  } else {
    if (!isModalOpen) {
      openImage(0);
    }
    startSlideshow();
  }
}

// Start Slideshow
function startSlideshow() {
  if (isSlideshowPlaying) return;
  
  isSlideshowPlaying = true;
  modalPlayBtn.classList.add('active');
  
  // Toggle Play / Pause icons
  modalPlayBtn.querySelector('.icon-play').classList.add('hidden');
  modalPlayBtn.querySelector('.icon-pause').classList.remove('hidden');
  modalPlayBtn.setAttribute('aria-label', 'Tạm dừng slideshow tự động (Phím tắt: Space)');
  
  showToast('Đã bắt đầu Slideshow tự động', 'info');
  announceToScreenReader('Bắt đầu trình chiếu ảnh tự động');
  
  resetSlideshowTimer();
}

// Pause Slideshow
function pauseSlideshow() {
  if (!isSlideshowPlaying) return;
  
  isSlideshowPlaying = false;
  modalPlayBtn.classList.remove('active');
  
  // Toggle Play / Pause icons
  modalPlayBtn.querySelector('.icon-play').classList.remove('hidden');
  modalPlayBtn.querySelector('.icon-pause').classList.add('hidden');
  modalPlayBtn.setAttribute('aria-label', 'Bắt đầu chạy slideshow tự động (Phím tắt: Space)');
  
  clearTimeout(slideshowTimer);
  clearInterval(progressTimer);
  progressFill.style.width = '0%';
  
  showToast('Đã dừng Slideshow tự động', 'info');
  announceToScreenReader('Đã tạm dừng trình chiếu ảnh tự động');
}

// Reset Slideshow Tick & Progress bar
function resetSlideshowTimer() {
  clearTimeout(slideshowTimer);
  clearInterval(progressTimer);
  
  const startTime = Date.now();
  progressFill.style.width = '0%';
  
  progressTimer = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const percentage = Math.min((elapsed / SLIDESHOW_DURATION) * 100, 100);
    progressFill.style.width = `${percentage}%`;
    
    if (elapsed >= SLIDESHOW_DURATION) {
      clearInterval(progressTimer);
    }
  }, 50);
  
  slideshowTimer = setTimeout(() => {
    nextImage();
  }, SLIDESHOW_DURATION);
}

// Theme Management (Light/Dark Mode)
function toggleTheme() {
  document.body.classList.toggle('light-theme');
  const isLight = document.body.classList.contains('light-theme');
  showToast(`Đã chuyển sang giao diện ${isLight ? 'Sáng' : 'Tối'}`, 'info');
  announceToScreenReader(`Đã chuyển sang giao diện ${isLight ? 'sáng' : 'tối'}`);
}

// Helper: Announce action dynamically to Screen Readers
function announceToScreenReader(message) {
  srAnnouncer.textContent = '';
  setTimeout(() => {
    srAnnouncer.textContent = message;
  }, 50);
}

// Helper: Show Toast notification message
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span>${message}</span>
  `;
  
  toastContainer.appendChild(toast);
  
  // Animate slide-in
  setTimeout(() => {
    toast.classList.add('show');
  }, 50);
  
  // Remove after timeout
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 2500);
}

// ==========================================
// COMMAND PALETTE LOGIC
// ==========================================

function openPalette() {
  if (isPaletteOpen) return;
  
  lastFocusedElement = document.activeElement;
  isPaletteOpen = true;
  commandPalette.classList.add('active');
  commandPalette.setAttribute('aria-hidden', 'false');
  paletteInput.value = '';
  activeCommandIndex = -1;
  
  renderCommands(COMMANDS);
  
  // Set Focus to Input field
  setTimeout(() => {
    paletteInput.focus();
  }, 100);
  
  announceToScreenReader('Đã mở Command Palette. Hãy nhập lệnh tìm kiếm.');
}

function closePalette() {
  if (!isPaletteOpen) return;
  
  isPaletteOpen = false;
  commandPalette.classList.remove('active');
  commandPalette.setAttribute('aria-hidden', 'true');
  
  announceToScreenReader('Đã đóng Command Palette');
  
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

function renderCommands(commands) {
  paletteList.innerHTML = '';
  filteredCommandsList = commands;
  
  if (commands.length === 0) {
    paletteList.innerHTML = `<li class="palette-no-results">Không tìm thấy lệnh nào phù hợp</li>`;
    return;
  }
  
  commands.forEach((cmd, idx) => {
    const li = document.createElement('li');
    li.className = 'palette-item';
    li.setAttribute('role', 'option');
    li.setAttribute('id', `palette-opt-${idx}`);
    li.setAttribute('aria-selected', idx === activeCommandIndex ? 'true' : 'false');
    
    if (idx === activeCommandIndex) {
      li.classList.add('selected');
    }
    
    li.innerHTML = `
      <div class="palette-item-left">
        <span class="palette-item-icon">
          <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" stroke-width="2" fill="none"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </span>
        <div>
          <span class="palette-item-name">${cmd.name}</span>
          <span class="palette-item-desc">${cmd.desc}</span>
        </div>
      </div>
      <kbd class="palette-item-kbd">${cmd.kbd}</kbd>
    `;
    
    li.addEventListener('click', () => {
      executeCommand(cmd);
    });
    
    paletteList.appendChild(li);
  });
}

function filterCommands(query) {
  const cleanQuery = query.toLowerCase().trim();
  if (!cleanQuery) {
    renderCommands(COMMANDS);
    return;
  }
  
  const results = COMMANDS.filter(cmd => 
    cmd.name.toLowerCase().includes(cleanQuery) || 
    cmd.desc.toLowerCase().includes(cleanQuery)
  );
  
  activeCommandIndex = results.length > 0 ? 0 : -1;
  renderCommands(results);
}

function selectCommandIndex(index) {
  const items = paletteList.querySelectorAll('.palette-item');
  if (items.length === 0) return;
  
  // Reset old selection
  if (activeCommandIndex >= 0 && activeCommandIndex < items.length) {
    items[activeCommandIndex].classList.remove('selected');
    items[activeCommandIndex].setAttribute('aria-selected', 'false');
  }
  
  // Set new index with wrapping
  if (index >= items.length) {
    activeCommandIndex = 0;
  } else if (index < 0) {
    activeCommandIndex = items.length - 1;
  } else {
    activeCommandIndex = index;
  }
  
  const activeItem = items[activeCommandIndex];
  activeItem.classList.add('selected');
  activeItem.setAttribute('aria-selected', 'true');
  
  // Ensure the element is visible in scroll area
  activeItem.scrollIntoView({ block: 'nearest' });
  
  // Screen Reader Live announcement
  const cmd = filteredCommandsList[activeCommandIndex];
  announceToScreenReader(`Lệnh đang chọn: ${cmd.name}. ${cmd.desc}`);
}

function executeCommand(cmd) {
  if (!cmd) return;
  cmd.action();
  closePalette();
  showToast(`Đã chạy lệnh: ${cmd.name}`, 'success');
}

function closeAllOverlays() {
  if (isPaletteOpen) {
    closePalette();
  } else if (isModalOpen) {
    closeModal();
  }
}

// ==========================================
// ACCESSIBILITY FOCUS TRAP
// ==========================================
function trapFocus(e, containerElement) {
  if (e.key !== 'Tab') return;
  
  const focusables = containerElement.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (focusables.length === 0) return;
  
  const firstEl = focusables[0];
  const lastEl = focusables[focusables.length - 1];
  
  if (e.shiftKey) { // Tab backwards
    if (document.activeElement === firstEl) {
      lastEl.focus();
      e.preventDefault();
    }
  } else { // Tab forwards
    if (document.activeElement === lastEl) {
      firstEl.focus();
      e.preventDefault();
    }
  }
}

// ==========================================
// KEYBOARD SHORTCUTS HANDLERS
// ==========================================

// Global keyboard events listener
document.addEventListener('keydown', (e) => {
  const activeEl = document.activeElement;
  const isTyping = activeEl && (activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA' || activeEl.isContentEditable);
  
  // 1. ESCAPE key: closes active overlays
  if (e.key === 'Escape') {
    if (isPaletteOpen) {
      closePalette();
      e.preventDefault();
    } else if (isModalOpen) {
      closeModal();
      e.preventDefault();
    }
  }
  
  // 2. Ctrl + K: Toggle Command Palette
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    if (isPaletteOpen) {
      closePalette();
    } else {
      openPalette();
    }
    return;
  }

  // 3. Ctrl + T: Toggle Light/Dark Theme (Custom shortcut helper)
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 't') {
    e.preventDefault();
    toggleTheme();
    return;
  }

  // Handle keys while Command Palette is OPEN
  if (isPaletteOpen) {
    // Trap focus inside palette container
    if (e.key === 'Tab') {
      trapFocus(e, commandPalette);
    }
    
    // Command selection list navigation
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectCommandIndex(activeCommandIndex + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectCommandIndex(activeCommandIndex - 1);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (activeCommandIndex >= 0 && activeCommandIndex < filteredCommandsList.length) {
        executeCommand(filteredCommandsList[activeCommandIndex]);
      }
    }
    return; // Don't trigger other actions when typing in command palette
  }

  // Handle keys while Gallery Modal is OPEN
  if (isModalOpen) {
    // Trap focus inside modal container
    if (e.key === 'Tab') {
      trapFocus(e, galleryModal);
    }
    
    // Previous/Next slide
    if (e.key === 'ArrowLeft' || e.key === 'Left') {
      e.preventDefault();
      prevImage();
    } else if (e.key === 'ArrowRight' || e.key === 'Right') {
      e.preventDefault();
      nextImage();
    }
    
    // Space play/pause slideshow
    if (e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      toggleSlideshow();
    }
  }

  // 4. Hotkeys 1-9 (jump to image) - Only active when not typing
  if (!isTyping && e.key >= '1' && e.key <= '9') {
    const targetIdx = parseInt(e.key) - 1;
    if (targetIdx >= 0 && targetIdx < IMAGES.length) {
      e.preventDefault();
      openImage(targetIdx);
    }
  }
});

// Event listeners for basic controls
modalCloseBtn.addEventListener('click', closeModal);
modalPrevBtn.addEventListener('click', prevImage);
modalNextBtn.addEventListener('click', nextImage);
modalPlayBtn.addEventListener('click', toggleSlideshow);

openPaletteBtn.addEventListener('click', openPalette);

// Hide palette when clicking overlay background
commandPalette.addEventListener('click', (e) => {
  if (e.target === commandPalette) {
    closePalette();
  }
});

// Hide modal when clicking overlay background
galleryModal.addEventListener('click', (e) => {
  if (e.target === galleryModal) {
    closeModal();
  }
});

// Search input keyup listener inside Command Palette
paletteInput.addEventListener('input', (e) => {
  filterCommands(e.target.value);
});

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
  initGallery();
  
  // Set default body class
  document.body.className = 'dark-theme';
  
  // Screen Reader introduction welcome announcement
  announceToScreenReader('Chào mừng bạn đến với album ảnh hỗ trợ bàn phím. Sử dụng Tab để di chuyển và phím số 1 đến 9 để nhảy nhanh tới ảnh.');
});
