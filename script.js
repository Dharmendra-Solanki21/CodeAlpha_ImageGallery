// Sample images and categories
const images = [
    { src: 'assets/nature1.jpg', caption: 'Forest', category: 'nature' },
    { src: 'assets/nature2.jpg', caption: 'Mountain', category: 'nature' },
    { src: 'assets/city1.jpg', caption: 'City Lights', category: 'city' },
    { src: 'assets/city2.jpg', caption: 'Skyscraper', category: 'city' },
    { src: 'assets/people1.jpg', caption: 'Portrait', category: 'people' },
    { src: 'assets/people2.jpg', caption: 'Friends', category: 'people' },
];

const gallery = document.getElementById('gallery');
const filterNav = document.getElementById('filter-nav');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');
const prevBtn = document.querySelector('.lightbox .prev');
const nextBtn = document.querySelector('.lightbox .next');

let currentIndex = 0;
let filteredImages = images;

function renderGallery(imgs) {
    gallery.innerHTML = '';
    imgs.forEach((img, idx) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <img src="${img.src}" alt="${img.caption}">
            <div class="caption">${img.caption}</div>
        `;
        item.addEventListener('click', () => openLightbox(idx));
        gallery.appendChild(item);
    });
}

function openLightbox(idx) {
    currentIndex = idx;
    lightbox.classList.add('active');
    updateLightbox();
}

function closeLightbox() {
    lightbox.classList.remove('active');
}

function updateLightbox() {
    const img = filteredImages[currentIndex];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.caption;
}

function showPrev() {
    currentIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    updateLightbox();
}

function showNext() {
    currentIndex = (currentIndex + 1) % filteredImages.length;
    updateLightbox();
}

closeBtn.addEventListener('click', closeLightbox);
prevBtn.addEventListener('click', showPrev);
nextBtn.addEventListener('click', showNext);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
});

filterNav.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return;
    document.querySelectorAll('#filter-nav button').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    const filter = e.target.getAttribute('data-filter');
    if (filter === 'all') {
        filteredImages = images;
    } else {
        filteredImages = images.filter(img => img.category === filter);
    }
    renderGallery(filteredImages);
});

// Initial render
renderGallery(images);
