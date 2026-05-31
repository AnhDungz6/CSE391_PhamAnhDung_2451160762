// State variables
let currentPage = 1;
const photosLimit = 20;
let isLoading = false;
let allPhotos = [];

// DOM Elements
const galleryGrid = document.getElementById('gallery-grid');
const loadTrigger = document.getElementById('load-trigger');
const lightboxModal = document.getElementById('lightbox-modal');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxAuthor = document.getElementById('lightbox-author');
const lightboxDownloadLink = document.getElementById('lightbox-download-link');
const lightboxCloseBtn = document.getElementById('lightbox-close-btn');

// Lazy Loading Image Observer
const lazyImageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            // Swap src
            img.src = img.dataset.src;
            img.onload = () => {
                img.classList.remove('lazy');
            };
            // Stop observing this element
            observer.unobserve(img);
        }
    });
});

// Fetch photos from Lorem Picsum API
async function fetchPhotos(page) {
    isLoading = true;
    loadTrigger.style.visibility = 'visible';
    
    const apiUrl = `https://picsum.photos/v2/list?page=${page}&limit=${photosLimit}`;
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Lỗi tải ảnh (Status ${response.status})`);
        }
        
        const photos = await response.json();
        
        if (photos.length === 0) {
            // No more photos
            loadTrigger.innerHTML = '<span>🎉 Đã khám phá hết kho ảnh!</span>';
            observer.disconnect();
            return;
        }
        
        renderPhotos(photos);
        currentPage++;
    } catch (error) {
        console.error("Gallery Fetch Error:", error);
        const errorMsg = document.createElement('div');
        errorMsg.className = 'load-error-msg';
        errorMsg.style.color = '#ef4444';
        errorMsg.style.padding = '20px';
        errorMsg.style.textAlign = 'center';
        errorMsg.textContent = 'Lỗi kết nối tải ảnh. Thử lại sau.';
        galleryGrid.appendChild(errorMsg);
    } finally {
        isLoading = false;
    }
}

// Render photo cards inside the gallery grid
function renderPhotos(photos) {
    photos.forEach(photo => {
        // Cache photo metadata locally
        allPhotos.push(photo);
        
        // Optimised thumbnail URL (400x300 for grid item)
        const thumbnailUrl = `https://picsum.photos/id/${photo.id}/400/300`;
        
        const card = document.createElement('div');
        card.className = 'gallery-item';
        card.setAttribute('data-id', photo.id);
        
        // Use a tiny inline transparent SVG placeholder for lazy loading
        const svgPlaceholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 3'%3E%3C/svg%3E";
        
        card.innerHTML = `
            <img class="gallery-img lazy" src="${svgPlaceholder}" data-src="${thumbnailUrl}" alt="Photo by ${photo.author}">
            <div class="gallery-overlay">
                <span class="photo-author">${photo.author}</span>
                <span class="photo-meta">Chỉ số: ${photo.width} x ${photo.height}</span>
            </div>
        `;
        
        // Click Event - Open Lightbox
        card.addEventListener('click', () => {
            openLightbox(photo);
        });
        
        galleryGrid.appendChild(card);
        
        // Attach image element to Lazy Loader Observer
        const img = card.querySelector('.gallery-img');
        lazyImageObserver.observe(img);
    });
}

// Infinite Scroll Loading Logic
function loadMorePhotos() {
    if (isLoading) return;
    fetchPhotos(currentPage);
}

// Infinite Scroll IntersectionObserver (as requested in prompt)
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        loadMorePhotos();
    }
});
observer.observe(document.querySelector("#load-trigger"));

// Lightbox Logic
function openLightbox(photo) {
    // Show loading text/indicator on caption if image takes time to load
    lightboxAuthor.textContent = `Tác giả: ${photo.author}`;
    lightboxDownloadLink.href = photo.download_url;
    
    // Use medium sized image (1000x750) for fast lightbox load
    const lightboxUrl = `https://picsum.photos/id/${photo.id}/1000/750`;
    lightboxImg.src = lightboxUrl;
    
    lightboxModal.classList.add('active');
}

function closeLightbox() {
    lightboxModal.classList.remove('active');
    // Clear image src to avoid flashing previous image on next open
    lightboxImg.src = '';
}

// Lightbox Events
lightboxCloseBtn.addEventListener('click', closeLightbox);
lightboxModal.addEventListener('click', (e) => {
    // Close if clicked background overlay instead of image or caption details
    if (e.target === lightboxModal) {
        closeLightbox();
    }
});

// Close Lightbox on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
        closeLightbox();
    }
});
