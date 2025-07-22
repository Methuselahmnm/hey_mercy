document.addEventListener('DOMContentLoaded', function() {
    // Initialize loading screen
    initLoadingScreen();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize music player
    initMusicPlayer();
    
    // Initialize countdown timers
    initCountdowns();
    
    // Initialize love messages carousel
    initLoveMessages();
    
    // Initialize gallery functionality
    initGallery();
    
    // Initialize heart button
    initHeartButton();
});

function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.getElementById('progress-bar');
    const quotes = document.querySelectorAll('.quote');
    const sparkles = document.querySelectorAll('.sparkle');
    
    if (!loadingScreen) return;
    
    // Animate sparkles
    if (sparkles.length > 0) {
        sparkles.forEach((sparkle, index) => {
            sparkle.style.animation = `sparkle ${2 + index * 0.3}s ease infinite ${index * 0.2}s`;
        });
    }
    
    // Rotate romantic quotes
    let currentQuote = 0;
    if (quotes.length > 0) {
        setInterval(() => {
            quotes[currentQuote].classList.remove('active');
            currentQuote = (currentQuote + 1) % quotes.length;
            quotes[currentQuote].classList.add('active');
        }, 3000);
    }
    
    // Simulate loading progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
        }
        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    }, 200);
    
    // Hide loading screen when everything is loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.visibility = 'hidden';
                document.body.style.overflow = 'auto';
            }
        }, 500);
    });
}

function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navContainer = document.getElementById('nav-container');
    
    if (!mobileMenuBtn || !navContainer) return;
    
    mobileMenuBtn.addEventListener('click', function() {
        const isActive = navContainer.classList.toggle('active');
        this.setAttribute('aria-expanded', isActive);
        this.innerHTML = isActive ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (navContainer.classList.contains('active')) {
                navContainer.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

function initMusicPlayer() {
    const musicPlayer = document.querySelector('.music-player');
    if (!musicPlayer) return;
    
    const audio = new Audio();
    let currentSong = 0;
    let isPlaying = false;
    
    const songs = [
        {
            src: "media/Frank_Ocean_-_Pink___White(256k).mp3",
            title: "Pink + White",
            artist: "Frank Ocean",
            cover: "gallery/blond.jpg"
        },
        {
            src: "media/Joe_Cocker_-_You_Are_So_Beautiful__Lyric_Video_(256k).mp3",
            title: "You Are So Beautiful",
            artist: "Joe Cocker",
            cover: "gallery/joe cocker.jpg"
        },
        {
            src: "media/yung_kai_-_blue__Lyrics_(256k).mp3",
            title: "Blue",
            artist: "Yung Kai",
            cover: "gallery/blue.jpg"
        }
    ];
    
    const albumCover = document.getElementById('album-cover');
    const songTitle = document.getElementById('song-title');
    const songArtist = document.getElementById('song-artist');
    const progress = document.getElementById('progress');
    const currentTimeEl = document.getElementById('current-time');
    const durationEl = document.getElementById('duration');
    const playBtn = document.getElementById('play-btn');
    const playIcon = document.getElementById('play-icon');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const playlistItems = document.querySelectorAll('.playlist-item');
    
    // Load song
    function loadSong(songIndex) {
        const song = songs[songIndex];
        audio.src = song.src;
        songTitle.textContent = song.title;
        songArtist.textContent = song.artist;
        albumCover.src = song.cover;
        
        // Update active playlist item
        playlistItems.forEach(item => item.classList.remove('active'));
        playlistItems[songIndex].classList.add('active');
    }
    
    // Play song
    function playSong() {
        isPlaying = true;
        playIcon.classList.replace('fa-play', 'fa-pause');
        audio.play();
        albumCover.style.animationPlayState = 'running';
    }
    
    // Pause song
    function pauseSong() {
        isPlaying = false;
        playIcon.classList.replace('fa-pause', 'fa-play');
        audio.pause();
        albumCover.style.animationPlayState = 'paused';
    }
    
    // Update progress bar
    function updateProgress(e) {
        if (isPlaying) {
            const { duration, currentTime } = e.srcElement;
            const progressPercent = (currentTime / duration) * 100;
            progress.style.width = `${progressPercent}%`;
            
            // Calculate display for duration
            const durationMinutes = Math.floor(duration / 60);
            let durationSeconds = Math.floor(duration % 60);
            if (durationSeconds < 10) {
                durationSeconds = `0${durationSeconds}`;
            }
            
            // Calculate display for current time
            const currentMinutes = Math.floor(currentTime / 60);
            let currentSeconds = Math.floor(currentTime % 60);
            if (currentSeconds < 10) {
                currentSeconds = `0${currentSeconds}`;
            }
            
            // Update time display
            if (durationSeconds) {
                durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
            }
            currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
        }
    }
    
    // Set progress bar
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    }
    
    // Next song
    function nextSong() {
        currentSong++;
        if (currentSong > songs.length - 1) {
            currentSong = 0;
        }
        loadSong(currentSong);
        if (isPlaying) {
            playSong();
        }
    }
    
    // Previous song
    function prevSong() {
        currentSong--;
        if (currentSong < 0) {
            currentSong = songs.length - 1;
        }
        loadSong(currentSong);
        if (isPlaying) {
            playSong();
        }
    }
    
    // Event listeners
    playBtn.addEventListener('click', () => {
        isPlaying ? pauseSong() : playSong();
    });
    
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);
    
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', nextSong);
    
    progress.parentElement.addEventListener('click', setProgress);
    
    // Click on playlist item
    playlistItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentSong = index;
            loadSong(currentSong);
            playSong();
        });
    });
    
    // Show music player
    musicPlayer.classList.add('show');
    
    // Load first song
    loadSong(0);
}

function initCountdowns() {
    function updateCountdowns() {
        const now = new Date();
        
        document.querySelectorAll('.countdown-timer').forEach((timer, index) => {
            const targetDateStr = timer.getAttribute('data-date');
            if (!targetDateStr) return;
            
            const targetDate = new Date(targetDateStr);
            const diff = targetDate - now;
            
            // Get elements for this timer
            const daysEl = timer.querySelector('.time-unit:nth-child(1) .number');
            const hoursEl = timer.querySelector('.time-unit:nth-child(2) .number');
            const minutesEl = timer.querySelector('.time-unit:nth-child(3) .number');
            const secondsEl = timer.querySelector('.time-unit:nth-child(4) .number');
            
            if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
            
            if (diff <= 0) {
                daysEl.textContent = '00';
                hoursEl.textContent = '00';
                minutesEl.textContent = '00';
                secondsEl.textContent = '00';
                return;
            }
            
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            daysEl.textContent = days.toString().padStart(2, '0');
            hoursEl.textContent = hours.toString().padStart(2, '0');
            minutesEl.textContent = minutes.toString().padStart(2, '0');
            secondsEl.textContent = seconds.toString().padStart(2, '0');
        });
    }

    // Initialize and update countdowns
    updateCountdowns();
    setInterval(updateCountdowns, 1000);
}

function initLoveMessages() {
    const featuredMessage = document.querySelector('.featured-message .message-text');
    const messageDate = document.querySelector('.message-date');
    const thumbnails = document.querySelectorAll('.message-thumbnail');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const composeBtn = document.querySelector('.compose-btn');
    
    if (!featuredMessage || !messageDate || thumbnails.length === 0) return;
    
    const messages = [
        {
            text: "Every moment with you feels like a beautiful dream I never want to wake up from.",
            date: "Today",
            preview: "My Dearest Mercy..."
        },
        {
            text: "Your smile brightens my darkest days and gives me strength when I need it most.",
            date: "Yesterday",
            preview: "Your smile..."
        },
        {
            text: "At night when I look at the stars, I think of how you shine brighter than all of them combined.",
            date: "2 days ago",
            preview: "At night..."
        },
        {
            text: "Morning thoughts of you make getting out of bed the easiest part of my day.",
            date: "3 days ago",
            preview: "Morning thoughts..."
        },
        {
            text: "Our song plays and suddenly the whole world disappears except for you and me.",
            date: "Last week",
            preview: "Our song..."
        }
    ];
    
    let currentIndex = 0;
    
    // Update featured message
    function updateFeaturedMessage(index) {
        featuredMessage.textContent = messages[index].text;
        messageDate.textContent = messages[index].date;
        
        // Update active thumbnail
        document.querySelector('.message-thumbnail.active')?.classList.remove('active');
        thumbnails[index].classList.add('active');
    }
    
    // Thumbnail click event
    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            currentIndex = index;
            updateFeaturedMessage(currentIndex);
        });
    });
    
    // Carousel navigation
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + messages.length) % messages.length;
            updateFeaturedMessage(currentIndex);
        });
        
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % messages.length;
            updateFeaturedMessage(currentIndex);
        });
    }
    
    // Compose new message
    if (composeBtn) {
        composeBtn.addEventListener('click', () => {
            const newMessage = {
                text: generateAIMessage(),
                date: "Just now",
                preview: "New note..."
            };
            
            messages.unshift(newMessage);
            currentIndex = 0;
            updateFeaturedMessage(currentIndex);
            
            // Show confetti effect
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }
        });
    }
    
    // Initialize first message
    updateFeaturedMessage(currentIndex);
}

function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const overlay = document.getElementById('overlay');
    const expandedImg = document.getElementById('expandedImg');
    const expandedCaption = document.getElementById('expandedCaption');
    
    if (!galleryItems.length || !overlay || !expandedImg || !expandedCaption) return;
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const caption = this.querySelector('.gallery-caption');
            
            if (img && caption) {
                expandedImg.src = img.src;
                expandedCaption.textContent = caption.textContent;
                overlay.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });
}

function initHeartButton() {
    const heartButton = document.querySelector('.heart-button');
    if (!heartButton) return;
    
    heartButton.addEventListener('click', function() {
        this.innerHTML = '<i class="fas fa-heart"></i> Yes! I Love You!';
        this.style.background = 'linear-gradient(to right, #8a2be2, #da70d6)';
        
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 }
            });
        }
    });
}

function generateAIMessage() {
    const adjectives = ['beautiful', 'amazing', 'incredible', 'wonderful', 'stunning'];
    const nouns = ['smile', 'eyes', 'heart', 'soul', 'laughter'];
    const verbs = ['brightens', 'illuminates', 'transforms', 'enchants', 'captivates'];
    
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
    const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
    
    return `Your ${randomAdjective} ${randomNoun} ${randomVerb} my world every single day. I'm so lucky to have you.`;
}

function closeImage() {
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}