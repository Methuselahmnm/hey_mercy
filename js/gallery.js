// Gallery JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initGallery();
});

function initGallery() {
    loadGalleryPhotos();
    setupGalleryFilters();
    setupViewOptions();
    createFloatingHearts();
}

const galleryPhotos = [
    {
        src: 'gallery/dlila1.jpg',
        title: 'Dlila Date Night',
        description: 'Our first special date at Dlila Restaurant',
        category: 'dates',
        date: 'June 2025',
        loves: 15,
        comments: []
    },
    {
        src: 'gallery/Dlila.jpg',
        title: 'Beautiful Evening',
        description: 'The night I realized you are my everything',
        category: 'dates',
        date: 'June 2025',
        loves: 12,
        comments: []
    },
    {
        src: 'gallery/mandahill.jpg',
        title: 'Movie Night',
        description: 'Cozy moments watching movies together',
        category: 'dates',
        date: 'June 2025',
        loves: 10,
        comments: []
    },
    {
        src: 'gallery/a4.jpeg',
        title: 'Exploring Together',
        description: 'Adventures hand in hand',
        category: 'dates',
        date: 'June 2025',
        loves: 8,
        comments: []
    },
    {
        src: 'gallery/a7.jpeg',
        title: "Victoria's Wedding",
        description: 'Celebrating love with friends and family',
        category: 'wedding',
        date: '2025',
        loves: 20,
        comments: []
    },
    {
        src: 'gallery/Vic 2.jpg',
        title: 'Wedding Joy',
        description: 'Sharing special moments',
        category: 'wedding',
        date: '2025',
        loves: 18,
        comments: []
    },
    {
        src: 'gallery/favorite.jpg',
        title: 'My Favorite',
        description: 'This smile brightens my world',
        category: 'special',
        date: '2025',
        loves: 25,
        comments: []
    },
    {
        src: 'gallery/a9.jpeg',
        title: 'Eish Moment',
        description: 'Funny and cute moments we share',
        category: 'special',
        date: '2025',
        loves: 7,
        comments: []
    },
    {
        src: 'gallery/a3.jpeg',
        title: 'Her Smile',
        description: 'The most beautiful smile in the world',
        category: 'special',
        date: '2025',
        loves: 22,
        comments: []
    },
    {
        src: 'gallery/Glowing.jpg',
        title: 'Beauty Unlimited',
        description: 'Beauty that knows no bounds',
        category: 'special',
        date: '2025',
        loves: 30,
        comments: []
    },
    {
        src: 'gallery/geez.jpg',
        title: 'Shining Bright',
        description: 'As bright as the sun',
        category: 'special',
        date: '2025',
        loves: 14,
        comments: []
    },
    {
        src: 'gallery/wow.jpg',
        title: 'My Baby',
        description: 'My everything',
        category: 'special',
        date: '2025',
        loves: 28,
        comments: []
    },
    {
        src: 'gallery/Glowing1.jpg',
        title: 'Love & Sunshine',
        description: 'Love, laughter, and a little sunshine',
        category: 'special',
        date: '2025',
        loves: 16,
        comments: []
    },
    {
        src: 'gallery/vic_3.jpg',
        title: 'Powered by Love',
        description: 'Powered by love & sunshine',
        category: 'wedding',
        date: '2025',
        loves: 11,
        comments: []
    },
    {
        src: 'gallery/vic_4.jpg',
        title: 'She\'s Glowing',
        description: 'Radiant beauty',
        category: 'wedding',
        date: '2025',
        loves: 19,
        comments: []
    },
    {
        src: 'gallery/vic_5.jpg',
        title: 'Sheeesh',
        description: 'Absolutely stunning',
        category: 'wedding',
        date: '2025',
        loves: 13,
        comments: []
    },
    {
        src: 'gallery/belini5.jpg',
        title: 'Belini Moments',
        description: 'Beautiful memories at Belini',
        category: 'dates',
        date: '2025',
        loves: 9,
        comments: []
    },
    {
        src: 'gallery/belini1.jpg',
        title: 'Belini Date',
        description: 'Special moments together',
        category: 'dates',
        date: '2025',
        loves: 10,
        comments: []
    },
    {
        src: 'gallery/belini3.jpg',
        title: 'Belini Smiles',
        description: 'Happiness captured',
        category: 'dates',
        date: '2025',
        loves: 8,
        comments: []
    },
    {
        src: 'gallery/black.jpg',
        title: 'Elegant Beauty',
        description: 'Stunning in black',
        category: 'special',
        date: '2025',
        loves: 21,
        comments: []
    },
    {
        src: 'gallery/belini6.jpg',
        title: 'Beautiful Memories',
        description: 'Cherished moments',
        category: 'dates',
        date: '2025',
        loves: 7,
        comments: []
    },
    {
        src: 'gallery/belini7.jpg',
        title: 'Lasting Impressions',
        description: 'Memories to last a lifetime',
        category: 'dates',
        date: '2025',
        loves: 11,
        comments: []
    }
];

let currentPhotoIndex = 0;
let currentFilter = 'all';
let currentView = 'grid';

function loadGalleryPhotos() {
    const container = document.getElementById('galleryContainer');
    const countElement = document.getElementById('photoCount');
    
    container.innerHTML = '';
    countElement.textContent = galleryPhotos.length;
    
    galleryPhotos.forEach((photo, index) => {
        if (currentFilter !== 'all' && photo.category !== currentFilter) return;
        
        const photoElement = createPhotoElement(photo, index);
        container.appendChild(photoElement);
    });
}

function createPhotoElement(photo, index) {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.dataset.index = index;
    
    div.innerHTML = `
        <div class="photo-container">
            <img src="${photo.src}" alt="${photo.title}" loading="lazy">
            <div class="photo-overlay">
                <div class="photo-info">
                    <h4>${photo.title}</h4>
                    <p>${photo.description}</p>
                    <div class="photo-stats">
                        <span class="loves"><i class="fas fa-heart"></i> ${photo.loves}</span>
                        <span class="date">${photo.date}</span>
                    </div>
                </div>
                <div class="photo-actions">
                    <button class="action-btn" onclick="loveGalleryPhoto(${index})">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="action-btn" onclick="shareGalleryPhoto(${index})">
                        <i class="fas fa-share"></i>
                    </button>
                </div>
            </div>
        </div>
    `;
    
    div.addEventListener('click', (e) => {
        if (!e.target.closest('.photo-actions')) {
            openPhotoModal(index);
        }
    });
    
    return div;
}

function setupGalleryFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Filter gallery
            currentFilter = this.dataset.filter;
            loadGalleryPhotos();
            
            // Animation effect
            animateGalleryUpdate();
        });
    });
}

function setupViewOptions() {
    // View options are handled by onclick attributes
}

function changeView(viewType) {
    const container = document.getElementById('galleryContainer');
    
    // Remove all view classes
    container.classList.remove('grid-view', 'masonry-view', 'carousel-view');
    // Add new view class
    container.classList.add(`${viewType}-view`);
    currentView = viewType;
    
    // Update view buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Reload photos for new layout
    loadGalleryPhotos();
}

function animateGalleryUpdate() {
    const items = document.querySelectorAll('.gallery-item');
    
    items.forEach((item, i) => {
        item.style.animation = 'none';
        setTimeout(() => {
            item.style.animation = `fadeInUp 0.5s ease ${i * 0.1}s forwards`;
        }, 10);
    });
}

function openPhotoModal(index) {
    currentPhotoIndex = index;
    const photo = galleryPhotos[index];
    const modal = document.getElementById('photoModal');
    
    // Set modal content
    document.getElementById('modalImage').src = photo.src;
    document.getElementById('modalTitle').textContent = photo.title;
    document.getElementById('modalDescription').textContent = photo.description;
    document.getElementById('modalDate').textContent = photo.date;
    document.getElementById('loveCount').textContent = photo.loves;
    
    // Load comments
    loadComments(photo.comments);
    
    // Show modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    
    // Animation
    modal.style.animation = 'fadeIn 0.3s ease';
}

function closeModal() {
    const modal = document.getElementById('photoModal');
    modal.style.animation = 'fadeOut 0.3s ease';
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

function prevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
    openPhotoModal(currentPhotoIndex);
}

function nextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % galleryPhotos.length;
    openPhotoModal(currentPhotoIndex);
}

function lovePhoto() {
    const photo = galleryPhotos[currentPhotoIndex];
    photo.loves++;
    
    // Update modal
    document.getElementById('loveCount').textContent = photo.loves;
    
    // Update gallery item
    const galleryItem = document.querySelector(`.gallery-item[data-index="${currentPhotoIndex}"]`);
    if (galleryItem) {
        const loveCount = galleryItem.querySelector('.loves');
        loveCount.innerHTML = `<i class="fas fa-heart"></i> ${photo.loves}`;
    }
    
    // Animation
    createHearts(3);
    
    // Save to localStorage
    saveGalleryData();
}

function loveGalleryPhoto(index) {
    const photo = galleryPhotos[index];
    photo.loves++;
    
    // Update gallery item
    const galleryItem = document.querySelector(`.gallery-item[data-index="${index}"]`);
    if (galleryItem) {
        const loveCount = galleryItem.querySelector('.loves');
        loveCount.innerHTML = `<i class="fas fa-heart"></i> ${photo.loves}`;
        
        // Animation
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤️';
        heart.style.cssText = `
            position: absolute;
            font-size: 24px;
            pointer-events: none;
            animation: floatUp 1s ease-out forwards;
        `;
        galleryItem.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 1000);
    }
    
    // Save to localStorage
    saveGalleryData();
}

function addPhotoLove() {
    // Add love to all photos
    galleryPhotos.forEach((photo, index) => {
        photo.loves += 5;
        
        // Update gallery items
        const galleryItem = document.querySelector(`.gallery-item[data-index="${index}"]`);
        if (galleryItem) {
            const loveCount = galleryItem.querySelector('.loves');
            loveCount.innerHTML = `<i class="fas fa-heart"></i> ${photo.loves}`;
        }
    });
    
    // Celebration
    createHearts(20);
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
    
    // Save to localStorage
    saveGalleryData();
}

function loadComments(comments) {
    const commentsList = document.querySelector('.comments-list');
    commentsList.innerHTML = '';
    
    if (comments.length === 0) {
        commentsList.innerHTML = '<p class="no-comments">No comments yet. Be the first!</p>';
        return;
    }
    
    comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        commentDiv.innerHTML = `
            <p class="comment-text">${comment.text}</p>
            <span class="comment-date">${comment.date}</span>
        `;
        commentsList.appendChild(commentDiv);
    });
}

function addComment() {
    const input = document.getElementById('commentInput');
    const text = input.value.trim();
    
    if (text) {
        const photo = galleryPhotos[currentPhotoIndex];
        const comment = {
            text: text,
            date: new Date().toLocaleString(),
            author: 'Mercy'
        };
        
        photo.comments.push(comment);
        
        // Reload comments
        loadComments(photo.comments);
        
        // Clear input
        input.value = '';
        
        // Save to localStorage
        saveGalleryData();
        
        // Show success
        createHearts(2);
    }
}

function postComment() {
    addComment();
}

function sharePhoto() {
    const photo = galleryPhotos[currentPhotoIndex];
    const shareText = `Check out this beautiful memory: ${photo.title}\n${photo.description}`;
    
    if (navigator.share) {
        navigator.share({
            title: photo.title,
            text: shareText,
            url: window.location.href
        });
    } else {
        // Fallback: Copy to clipboard
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Share text copied to clipboard! 📋');
        });
    }
}

function shareGalleryPhoto(index) {
    const photo = galleryPhotos[index];
    const shareText = `Check out this beautiful memory: ${photo.title}\n${photo.description}`;
    
    if (navigator.share) {
        navigator.share({
            title: photo.title,
            text: shareText,
            url: window.location.href
        });
    } else {
        navigator.clipboard.writeText(shareText).then(() => {
            alert('Share text copied to clipboard! 📋');
        });
    }
}

function createCollage() {
    alert('Collage feature coming soon! This will create a beautiful collage of our memories. 🎨');
    
    // Simple collage effect for now
    const items = document.querySelectorAll('.gallery-item');
    items.forEach((item, i) => {
        setTimeout(() => {
            item.style.transform = `rotate(${(Math.random() * 10 - 5)}deg)`;
            item.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
        }, i * 100);
    });
    
    setTimeout(() => {
        items.forEach(item => {
            item.style.transform = '';
            item.style.boxShadow = '';
        });
    }, 2000);
}

function downloadMemories() {
    alert('Download feature coming soon! This will allow you to download our memories. 💾');
    
    // Create a simple download link for now
    const link = document.createElement('a');
    link.href = 'gallery/favorite.jpg';
    link.download = 'Our-Memory.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function printGallery() {
    window.print();
}

function turnPage() {
    const leftPage = document.querySelector('.left-page');
    const rightPage = document.querySelector('.right-page');
    
    // Flip animation
    leftPage.style.transform = 'rotateY(-180deg)';
    rightPage.style.transform = 'rotateY(0deg)';
    
    // Change content after animation
    setTimeout(() => {
        leftPage.innerHTML = `
            <h3>Chapter 3: Future Dreams</h3>
            <p>All the beautiful things we will experience together.</p>
            <div class="page-photos">
                <img src="gallery/geez.jpg" alt="Future">
                <img src="gallery/wow.jpg" alt="Dreams">
            </div>
        `;
        
        rightPage.innerHTML = `
            <h3>Chapter 4: Forever Love</h3>
            <p>A lifetime of happiness awaits us.</p>
            <div class="page-photos">
                <img src="gallery/Glowing1.jpg" alt="Forever">
                <img src="gallery/vic_3.jpg" alt="Happiness">
            </div>
        `;
        
        // Reset transform for next flip
        setTimeout(() => {
            leftPage.style.transform = '';
            rightPage.style.transform = '';
        }, 100);
    }, 600);
}

function saveGalleryData() {
    localStorage.setItem('galleryPhotos', JSON.stringify(galleryPhotos));
}

function loadGalleryData() {
    const saved = localStorage.getItem('galleryPhotos');
    if (saved) {
        const loaded = JSON.parse(saved);
        // Merge loaded data with existing photos
        loaded.forEach((loadedPhoto, index) => {
            if (galleryPhotos[index]) {
                galleryPhotos[index].loves = loadedPhoto.loves || galleryPhotos[index].loves;
                galleryPhotos[index].comments = loadedPhoto.comments || galleryPhotos[index].comments;
            }
        });
    }
}

function createFloatingHearts() {
    // Create floating hearts in background
    const heartsContainer = document.querySelector('.floating-hearts');
    if (!heartsContainer) return;
    
    for (let i = 0; i < 15; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart-bg';
        heart.innerHTML = '❤️';
        heart.style.cssText = `
            position: absolute;
            font-size: ${20 + Math.random() * 20}px;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${0.2 + Math.random() * 0.3};
            animation: floatHeart ${10 + Math.random() * 20}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        heartsContainer.appendChild(heart);
    }
}

function createHearts(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart-particle';
            heart.innerHTML = '❤️';
            heart.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}vw;
                top: 100vh;
                font-size: ${20 + Math.random() * 20}px;
                pointer-events: none;
                z-index: 9999;
                animation: floatUp ${1 + Math.random() * 2}s ease-out forwards;
            `;
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 2000);
        }, i * 100);
    }
}

// Load saved data on start
loadGalleryData();

// Add CSS animations
const galleryStyle = document.createElement('style');
galleryStyle.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes floatUp {
        to {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes floatHeart {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.2;
        }
        50% {
            opacity: 0.5;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .gallery-header {
        text-align: center;
        padding: 100px 20px 50px;
        background: linear-gradient(135deg, rgba(255, 107, 139, 0.1), rgba(138, 43, 226, 0.1));
        border-radius: 0 0 30px 30px;
        margin-bottom: 40px;
    }
    
    .header-content h1 {
        font-size: 3rem;
        background: linear-gradient(to right, #ff6b8b, #8a2be2);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        margin-bottom: 20px;
    }
    
    .gallery-stats {
        display: flex;
        justify-content: center;
        gap: 40px;
        margin-top: 30px;
    }
    
    .stat {
        text-align: center;
    }
    
    .stat i {
        font-size: 2rem;
        color: #ff6b8b;
        margin-bottom: 10px;
    }
    
    .stat span {
        display: block;
        font-size: 2rem;
        font-weight: bold;
        color: white;
    }
    
    .interactive-gallery {
        padding: 20px;
        max-width: 1400px;
        margin: 0 auto;
    }
    
    .gallery-controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30px;
        flex-wrap: wrap;
        gap: 20px;
    }
    
    .filter-buttons {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
    }
    
    .filter-btn {
        padding: 10px 20px;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        border-radius: 25px;
        color: white;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .filter-btn:hover,
    .filter-btn.active {
        background: linear-gradient(to right, #ff6b8b, #8a2be2);
    }
    
    .view-options {
        display: flex;
        gap: 10px;
    }
    
    .view-btn {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        border: none;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .view-btn:hover,
    .view-btn.active {
        background: linear-gradient(to right, #ff6b8b, #8a2be2);
    }
    
    .gallery-container {
        transition: all 0.3s ease;
    }
    
    .grid-view {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 20px;
    }
    
    .masonry-view {
        column-count: 3;
        column-gap: 20px;
    }
    
    .masonry-view .gallery-item {
        break-inside: avoid;
        margin-bottom: 20px;
    }
    
    .carousel-view {
        display: flex;
        overflow-x: auto;
        gap: 20px;
        padding: 20px 0;
        scroll-snap-type: x mandatory;
    }
    
    .carousel-view .gallery-item {
        min-width: 300px;
        scroll-snap-align: start;
    }
    
    .gallery-item {
        position: relative;
        border-radius: 15px;
        overflow: hidden;
        cursor: pointer;
        animation: fadeInUp 0.5s ease;
    }
    
    .photo-container {
        position: relative;
        aspect-ratio: 1/1;
        overflow: hidden;
    }
    
    .photo-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
    }
    
    .gallery-item:hover img {
        transform: scale(1.1);
    }
    
    .photo-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
        padding: 20px;
        transform: translateY(100%);
        transition: transform 0.3s ease;
    }
    
    .gallery-item:hover .photo-overlay {
        transform: translateY(0);
    }
    
    .photo-info h4 {
        color: white;
        margin-bottom: 5px;
        font-size: 1.1rem;
    }
    
    .photo-info p {
        color: rgba(255, 255, 255, 0.8);
        font-size: 0.9rem;
        margin-bottom: 10px;
    }
    
    .photo-stats {
        display: flex;
        justify-content: space-between;
        color: rgba(255, 255, 255, 0.6);
        font-size: 0.8rem;
    }
    
    .photo-actions {
        position: absolute;
        top: 20px;
        right: 20px;
        display: flex;
        gap: 10px;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .gallery-item:hover .photo-actions {
        opacity: 1;
    }
    
    .action-btn {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(10px);
    }
    
    .gallery-actions {
        display: flex;
        justify-content: center;
        gap: 20px;
        margin-top: 40px;
        flex-wrap: wrap;
    }
    
    .gallery-actions .action-btn {
        padding: 12px 25px;
        border-radius: 25px;
        background: linear-gradient(to right, #ff6b8b, #8a2be2);
        font-weight: 600;
        width: auto;
    }
    
    .photo-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.95);
        display: none;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        padding: 20px;
    }
    
    .modal-content {
        max-width: 1000px;
        width: 100%;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(20px);
        border-radius: 20px;
        overflow: hidden;
        position: relative;
    }
    
    .close-modal {
        position: absolute;
        top: 20px;
        right: 20px;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        z-index: 10;
    }
    
    .modal-body {
        display: grid;
        grid-template-columns: 2fr 1fr;
        min-height: 70vh;
    }
    
    .modal-body img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        padding: 40px;
    }
    
    .modal-info {
        padding: 40px;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        flex-direction: column;
    }
    
    .modal-info h3 {
        font-size: 2rem;
        margin-bottom: 10px;
        color: #ff6b8b;
    }
    
    .modal-info p {
        color: rgba(255, 255, 255, 0.8);
        margin-bottom: 20px;
        line-height: 1.6;
    }
    
    .modal-date {
        color: #8a2be2;
        font-weight: 600;
        margin-bottom: 30px;
    }
    
    .modal-actions {
        display: flex;
        gap: 10px;
        margin-bottom: 30px;
    }
    
    .modal-actions button {
        padding: 10px 20px;
        border-radius: 25px;
        border: none;
        color: white;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
    }
    
    .love-btn {
        background: #ff6b8b;
    }
    
    .comment-btn {
        background: #8a2be2;
    }
    
    .share-btn {
        background: #00d4ff;
    }
    
    .comments-section h4 {
        color: white;
        margin-bottom: 15px;
    }
    
    .comment {
        background: rgba(255, 255, 255, 0.1);
        padding: 10px;
        border-radius: 10px;
        margin-bottom: 10px;
    }
    
    .comment-text {
        color: white;
        margin-bottom: 5px;
    }
    
    .comment-date {
        color: rgba(255, 255, 255, 0.6);
        font-size: 0.8rem;
    }
    
    .add-comment {
        display: flex;
        gap: 10px;
        margin-top: 10px;
    }
    
    .add-comment input {
        flex: 1;
        padding: 10px;
        border-radius: 20px;
        border: none;
        background: rgba(255, 255, 255, 0.1);
        color: white;
    }
    
    .add-comment button {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: #ff6b8b;
        border: none;
        color: white;
        cursor: pointer;
    }
    
    .modal-navigation {
        position: absolute;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        gap: 20px;
    }
    
    .nav-btn {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .memory-book {
        padding: 80px 20px;
        text-align: center;
    }
    
    .book-container {
        display: flex;
        justify-content: center;
        gap: 0;
        perspective: 1000px;
        margin: 40px auto;
        max-width: 800px;
    }
    
    .book-page {
        width: 400px;
        height: 500px;
        background: linear-gradient(135deg, #fffaf0, #ffe4e1);
        padding: 40px;
        border-radius: 5px 20px 20px 5px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        transform-style: preserve-3d;
        transition: transform 0.8s ease;
        color: #333;
    }
    
    .right-page {
        border-radius: 20px 5px 5px 20px;
        transform: rotateY(180deg);
    }
    
    .book-page h3 {
        color: #8a2be2;
        margin-bottom: 20px;
        font-size: 1.5rem;
    }
    
    .book-page p {
        color: #666;
        line-height: 1.6;
        margin-bottom: 30px;
    }
    
    .page-photos {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 10px;
    }
    
    .page-photos img {
        width: 100%;
        height: 150px;
        object-fit: cover;
        border-radius: 10px;
    }
    
    .turn-page {
        padding: 15px 30px;
        background: linear-gradient(to right, #ff6b8b, #8a2be2);
        border: none;
        border-radius: 25px;
        color: white;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        margin: 0 auto;
        margin-top: 30px;
    }
    
    .love-quote {
        text-align: center;
        margin-bottom: 30px;
    }
    
    .love-quote p:first-child {
        font-size: 1.2rem;
        font-style: italic;
        color: rgba(255, 255, 255, 0.9);
        margin-bottom: 10px;
    }
    
    .signature {
        color: #ff6b8b;
        font-weight: 600;
    }
    
    .footer-links {
        display: flex;
        justify-content: center;
        gap: 30px;
        flex-wrap: wrap;
    }
    
    .footer-links a {
        color: rgba(255, 255, 255, 0.8);
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: color 0.3s ease;
    }
    
    .footer-links a:hover {
        color: #ff6b8b;
    }
    
    @media (max-width: 768px) {
        .gallery-stats {
            flex-direction: column;
            gap: 20px;
        }
        
        .gallery-controls {
            flex-direction: column;
            align-items: stretch;
        }
        
        .filter-buttons {
            justify-content: center;
        }
        
        .view-options {
            justify-content: center;
        }
        
        .grid-view,
        .masonry-view {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        }
        
        .masonry-view {
            column-count: 2;
        }
        
        .modal-body {
            grid-template-columns: 1fr;
            max-height: 90vh;
            overflow-y: auto;
        }
        
        .modal-body img {
            max-height: 50vh;
        }
        
        .book-container {
            flex-direction: column;
            align-items: center;
            gap: 20px;
        }
        
        .book-page {
            width: 100%;
            max-width: 400px;
        }
    }
    
    @media (max-width: 480px) {
        .header-content h1 {
            font-size: 2rem;
        }
        
        .grid-view,
        .masonry-view {
            grid-template-columns: 1fr;
        }
        
        .masonry-view {
            column-count: 1;
        }
        
        .gallery-actions {
            flex-direction: column;
            align-items: center;
        }
        
        .modal-actions {
            flex-direction: column;
        }
    }
`;

document.head.appendChild(galleryStyle);