// Main JavaScript Functions

// Global variables
let audio = null;
let isPlaying = false;
let currentSong = 0;
let matchedPairs = 0;
let score = 0;
let flippedCards = [];
let gameCards = [];

// Songs data
const songs = [
    {
        src: 'media/Frank_Ocean_-_Pink___White(256k).mp3',
        title: 'Pink + White',
        artist: 'Frank Ocean',
        cover: 'gallery/blond.jpg'
    },
    {
        src: 'media/Joe_Cocker_-_You_Are_So_Beautiful__Lyric_Video_(256k).mp3',
        title: 'You Are So Beautiful',
        artist: 'Joe Cocker',
        cover: 'gallery/joe cocker.jpg'
    },
    {
        src: 'media/yung_kai_-_blue__Lyrics_(256k).mp3',
        title: 'Blue',
        artist: 'Yung Kai',
        cover: 'gallery/blue.jpg'
    }
];

// Direct website loading (no login required)
function unlockWebsite() {
    console.log('Loading website directly...');
    
    const mainContent = document.getElementById('mainContent');
    const preloader = document.getElementById('preloader');
    
    // Hide preloader after 2 seconds
    setTimeout(() => {
        if (preloader) {
            preloader.classList.add('hidden');
        }
        
        // Show main content
        if (mainContent) {
            mainContent.style.display = 'block';
            setTimeout(() => {
                mainContent.classList.add('show');
            }, 50);
        }
        
        // Initialize features
        initMusicPlayer();
        initCountdown();
        initMemoryGame();
        initMobileMenu();
        initSmoothScroll();
        initFloatingHearts();
        initFutureTabs();
        
        // Create floating hearts
        createHearts(20);
        
        // Welcome celebration
        triggerConfetti();
        
        // Welcome message after a delay
        setTimeout(() => {
            alert('Welcome to our love story, Mercy! ❤️\n\nYou are the most beautiful part of my life.\n\nExplore our memories and leave me love notes!');
        }, 1000);
        
    }, 2000);
}

// Create floating hearts
function createHearts(count) {
    let container = document.querySelector('.floating-hearts-bg');
    if (!container) {
        // Create container if it doesn't exist
        container = document.createElement('div');
        container.className = 'floating-hearts-bg';
        document.body.appendChild(container);
    }
    
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = '❤️';
        heart.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}vw;
            top: ${100 + Math.random() * 20}vh;
            font-size: ${15 + Math.random() * 25}px;
            opacity: 0;
            animation: floatUp ${3 + Math.random() * 7}s linear forwards;
            animation-delay: ${Math.random() * 2}s;
            z-index: 9998;
        `;
        
        container.appendChild(heart);
        
        // Remove after animation
        setTimeout(() => {
            if (heart.parentNode === container) {
                container.removeChild(heart);
            }
        }, 10000);
    }
}

// Initialize floating hearts in background
function initFloatingHearts() {
    // Create initial hearts
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createHearts(1);
        }, i * 300);
    }
    
    // Keep creating hearts
    setInterval(() => {
        createHearts(1);
    }, 5000);
}

// Future Plans Tab Switching
function initFutureTabs() {
    const tabs = document.querySelectorAll('.future-tab');
    const categories = document.querySelectorAll('.future-category');
    
    if (tabs.length === 0 || categories.length === 0) return;
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const categoryId = this.dataset.category;
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update active category
            categories.forEach(category => {
                category.classList.remove('active');
                if (category.id === categoryId) {
                    category.classList.add('active');
                    createHearts(2); // Add hearts when switching
                }
            });
        });
    });
}

// Multi Countdown Timer
function initCountdown() {
    const countdownSection = document.querySelector('.countdown-section');
    if (!countdownSection) return;
    
    // Define all important dates
    const dates = {
        'anniversary': {
            date: new Date('July 23, 2026').getTime(),
            name: 'Our Anniversary',
            icon: 'fa-heart',
            color: '#ff6b8b',
            message: "Until our next anniversary on July 23, 2026"
        },
        'birthday': {
            date: new Date('August 20, 2026').getTime(),
            name: "Mercy's Birthday",
            icon: 'fa-birthday-cake',
            color: '#00d4ff',
            message: "Until Mercy's birthday on August 20, 2026"
        },
        'first-meet': {
            date: new Date('May 13, 2026').getTime(),
            name: 'First Meeting',
            icon: 'fa-star',
            color: '#ffd700',
            message: "Until the anniversary of our first meeting on May 13, 2024"
        },
        'special-day': {
            date: new Date('July 20, 2026').getTime(),
            name: 'Our Special Day',
            icon: 'fa-gem',
            color: '#8a2be2',
            message: "Until our special day on July 20, 2026"
        }
    };
    
    // Tab switching functionality
    document.querySelectorAll('.countdown-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.dataset.target;
            
            // Update active tab
            document.querySelectorAll('.countdown-tab').forEach(t => {
                t.classList.remove('active');
            });
            this.classList.add('active');
            
            // Update active countdown display
            document.querySelectorAll('.countdown-display').forEach(display => {
                display.classList.remove('active');
            });
            document.getElementById(`${target}-countdown`).classList.add('active');
            
            // Create hearts when switching
            createHearts(3);
        });
    });
    
    // Initialize all countdown displays
    function initializeCountdownDisplays() {
        Object.keys(dates).forEach(type => {
            const countdownDisplay = document.getElementById(`${type}-countdown`);
            if (countdownDisplay) {
                // Set initial text
                const textEl = document.getElementById(`text-${type}`);
                if (textEl && dates[type].message) {
                    textEl.textContent = dates[type].message;
                }
            }
        });
    }
    
    // Update all countdowns
    function updateAllCountdowns() {
        const now = new Date().getTime();
        
        Object.keys(dates).forEach(type => {
            const targetDate = dates[type].date;
            const distance = targetDate - now;
            
            // Get elements
            const daysEl = document.getElementById(`days-${type}`);
            const hoursEl = document.getElementById(`hours-${type}`);
            const minutesEl = document.getElementById(`minutes-${type}`);
            const secondsEl = document.getElementById(`seconds-${type}`);
            const textEl = document.getElementById(`text-${type}`);
            
            if (!daysEl || !hoursEl || !minutesEl || !secondsEl || !textEl) return;
            
            if (distance < 0) {
                // Date has passed
                daysEl.textContent = '00';
                hoursEl.textContent = '00';
                minutesEl.textContent = '00';
                secondsEl.textContent = '00';
                
                // Check if it's today (anniversary celebration)
                const isToday = isDateToday(targetDate);
                if (isToday) {
                    celebrateSpecialDay(type, dates[type].name);
                    textEl.textContent = getCelebrationMessage(type, true);
                } else {
                    textEl.textContent = getPastDateMessage(type, targetDate);
                }
                return;
            }
            
            // Calculate time remaining
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Update display
            daysEl.textContent = days.toString().padStart(2, '0');
            hoursEl.textContent = hours.toString().padStart(2, '0');
            minutesEl.textContent = minutes.toString().padStart(2, '0');
            secondsEl.textContent = seconds.toString().padStart(2, '0');
            
            // Update text with dynamic messages
            textEl.textContent = getCountdownMessage(type, days, targetDate);
            
            // Special animation when very close
            if (days === 0 && hours < 24) {
                daysEl.style.animation = 'pulse 0.5s infinite alternate';
            } else {
                daysEl.style.animation = '';
            }
        });
    }
    
    // Helper function to check if date is today
    function isDateToday(timestamp) {
        const date = new Date(timestamp);
        const today = new Date();
        return date.getDate() === today.getDate() && 
               date.getMonth() === today.getMonth() && 
               date.getFullYear() === today.getFullYear();
    }
    
    // Helper function to format date
    function formatDate(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
    }
    
    // Get countdown message based on days remaining
    function getCountdownMessage(type, days, targetDate) {
        const dateStr = formatDate(targetDate);
        const name = dates[type].name;
        
        if (days === 0) {
            return `Today is ${name}! 🎉 Time to celebrate!`;
        } else if (days === 1) {
            return `Tomorrow is ${name}! Get ready! 🎊`;
        } else if (days <= 7) {
            return `Only ${days} days until ${name}! 💖`;
        } else if (days <= 30) {
            return `${days} days until ${name}! ❤️`;
        } else if (days <= 365) {
            const months = Math.floor(days / 30);
            return `${months} month${months !== 1 ? 's' : ''} until ${name}! ✨`;
        } else {
            return dates[type].message || `Until ${name} on ${dateStr}`;
        }
    }
    
    // Get message for past dates
    function getPastDateMessage(type, targetDate) {
        const dateStr = formatDate(targetDate);
        const name = dates[type].name;
        
        const messages = {
            'anniversary': `Happy Anniversary! 🎉 Our anniversary was on ${dateStr}`,
            'birthday': `Happy Birthday, Mercy! 🎂 Your birthday was on ${dateStr}`,
            'first-meet': `Our first meeting anniversary was on ${dateStr} ⭐`,
            'special-day': `Our special day was on ${dateStr} 💎`
        };
        
        return messages[type] || `${name} was on ${dateStr}`;
    }
    
    // Get celebration message
    function getCelebrationMessage(type, isToday) {
        const name = dates[type].name;
        
        if (!isToday) {
            return `${name} is coming soon!`;
        }
        
        const messages = {
            'anniversary': `🎉 HAPPY ANNIVERSARY! 🎉\nCelebrating our love today!`,
            'birthday': `🎂 HAPPY BIRTHDAY, MERCY! 🎂\nWishing you the best day ever!`,
            'first-meet': `⭐ HAPPY ANNIVERSARY! ⭐\nCelebrating when we first met!`,
            'special-day': `💎 HAPPY SPECIAL DAY! 💎\nCelebrating our special bond!`
        };
        
        return messages[type] || `Happy ${name}! 🎊`;
    }
    
    // Celebration function
    function celebrateSpecialDay(type, name) {
        // Only celebrate once per day per event type
        const today = new Date().toDateString();
        const lastCelebration = localStorage.getItem(`celebrated-${type}`);
        
        if (lastCelebration === today) return;
        
        localStorage.setItem(`celebrated-${type}`, today);
        
        // Big celebration!
        if (typeof confetti === 'function') {
            // Multiple confetti bursts
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    confetti({
                        particleCount: 150,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                }, i * 300);
            }
            
            // Special burst with event color
            setTimeout(() => {
                confetti({
                    particleCount: 100,
                    spread: 55,
                    origin: { x: 0.5, y: 0.8 },
                    colors: [dates[type].color, '#ffffff']
                });
            }, 1000);
        }
        
        // Create lots of hearts
        createHearts(30);
        
        // Show celebration message
        setTimeout(() => {
            const fullMessages = {
                'anniversary': `🎉 HAPPY ANNIVERSARY, MY LOVE! 🎉\n\nHappy ${name}, my beautiful Mercy!\nEvery day with you is a blessing.\nI love you more than words can express! ❤️`,
                'birthday': `🎂 HAPPY BIRTHDAY, MERCY! 🎂\n\nWishing you the most amazing birthday!\nYou deserve all the happiness in the world!\nMay all your dreams come true! 💕`,
                'first-meet': `⭐ HAPPY ANNIVERSARY! ⭐\n\nCelebrating the day our story began!\nMeeting you was the best decision of my life!\nThank you for being you! 💖`,
                'special-day': `💎 HAPPY SPECIAL DAY! 💎\n\nCelebrating our unique bond today!\nYou mean everything to me!\nHere's to many more special moments! ✨`
            };
            
            alert(fullMessages[type] || `🎊 Happy ${name}! 🎊\n\nCelebrating this special day with you!\nYou make every moment magical!`);
        }, 1500);
        
        // Make the current tab glow
        const activeTab = document.querySelector(`.countdown-tab[data-target="${type}"]`);
        if (activeTab) {
            activeTab.style.animation = 'pulse 1s infinite alternate';
            setTimeout(() => {
                activeTab.style.animation = '';
            }, 5000);
        }
    }
    
    // Auto-switch to next upcoming event
    function autoSwitchToNextEvent() {
        const now = new Date().getTime();
        let nextEvent = null;
        let smallestDistance = Infinity;
        
        Object.keys(dates).forEach(type => {
            const distance = dates[type].date - now;
            if (distance > 0 && distance < smallestDistance) {
                smallestDistance = distance;
                nextEvent = type;
            }
        });
        
        if (nextEvent) {
            // Switch to this tab
            document.querySelectorAll('.countdown-tab').forEach(tab => {
                tab.classList.remove('active');
                if (tab.dataset.target === nextEvent) {
                    tab.classList.add('active');
                }
            });
            
            document.querySelectorAll('.countdown-display').forEach(display => {
                display.classList.remove('active');
            });
            document.getElementById(`${nextEvent}-countdown`).classList.add('active');
        }
    }
    
    // Initialize everything
    initializeCountdownDisplays();
    updateAllCountdowns();
    autoSwitchToNextEvent();
    
    // Update countdowns every second
    setInterval(updateAllCountdowns, 1000);
    
    // Check for upcoming events every minute
    setInterval(autoSwitchToNextEvent, 60000);
    
    // Check for celebrations every hour
    setInterval(() => {
        const now = new Date();
        Object.keys(dates).forEach(type => {
            const targetDate = new Date(dates[type].date);
            if (isDateToday(targetDate.getTime())) {
                celebrateSpecialDay(type, dates[type].name);
            }
        });
    }, 3600000); // Every hour
}

// Music Player Functions
function initMusicPlayer() {
    // Check if music player exists on this page
    const musicPlayer = document.querySelector('.music-player');
    if (!musicPlayer) return;
    
    audio = new Audio();
    loadSong(0);
    
    // Event listeners for audio
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', nextSong);
    audio.addEventListener('loadedmetadata', function() {
        const durationEl = document.getElementById('duration');
        if (durationEl && audio.duration) {
            durationEl.textContent = formatTime(audio.duration);
        }
    });
    
    // Playlist click events
    document.querySelectorAll('.playlist-item').forEach((item, index) => {
        item.addEventListener('click', () => {
            currentSong = index;
            loadSong(currentSong);
            if (!isPlaying) {
                togglePlay();
            }
        });
    });
}

function loadSong(index) {
    const song = songs[index];
    if (!song) return;
    
    audio.src = song.src;
    
    // Update song info if elements exist
    const songTitle = document.getElementById('songTitle');
    const songArtist = document.getElementById('songArtist');
    const albumCover = document.getElementById('albumCover');
    
    if (songTitle) songTitle.textContent = song.title;
    if (songArtist) songArtist.textContent = song.artist;
    if (albumCover) albumCover.src = song.cover;
    
    // Update active playlist item
    document.querySelectorAll('.playlist-item').forEach(item => {
        item.classList.remove('active');
    });
    const playlistItems = document.querySelectorAll('.playlist-item');
    if (playlistItems[index]) {
        playlistItems[index].classList.add('active');
    }
}

function togglePlay() {
    const albumArt = document.querySelector('.album-art');
    const playIcon = document.getElementById('playIcon');
    
    if (!playIcon) return;
    
    if (!isPlaying) {
        // Play song
        audio.play().catch(e => {
            console.log('Audio play failed:', e);
            alert('Click anywhere on the page first, then try playing music.');
        });
        isPlaying = true;
        if (albumArt) {
            albumArt.classList.add('playing');
        }
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
    } else {
        // Pause song
        audio.pause();
        isPlaying = false;
        if (albumArt) {
            albumArt.classList.remove('playing');
        }
        playIcon.classList.remove('fa-pause');
        playIcon.classList.add('fa-play');
    }
}

function nextSong() {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    if (isPlaying) {
        audio.play();
    }
}

function previousSong() {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    if (isPlaying) {
        audio.play();
    }
}

function toggleMute() {
    const volumeIcon = document.getElementById('volumeIcon');
    if (!volumeIcon) return;
    
    audio.muted = !audio.muted;
    volumeIcon.classList.toggle('fa-volume-up');
    volumeIcon.classList.toggle('fa-volume-mute');
}

function updateProgress() {
    if (!audio.duration) return;
    
    const progress = (audio.currentTime / audio.duration) * 100;
    const progressBar = document.getElementById('progressBar');
    const currentTimeEl = document.getElementById('currentTime');
    
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }
    
    if (currentTimeEl) {
        currentTimeEl.textContent = formatTime(audio.currentTime);
    }
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

// Enhanced Wish Function
function addWish(type) {
    const wishes = {
        'dates': 'I wish for regular date nights with you, keeping our romance alive.',
        'walks': 'I wish for evening walks where we share everything about our day.',
        'movies': 'I wish for cozy movie nights, cuddled up together.',
        'food': 'I wish to try new food spots and cook delicious meals with you.',
        'quiet': 'I wish for peaceful moments just enjoying each other\'s company.',
        'support': 'I wish to always support you through tough days.',
        'trips': 'I wish to take short trips and explore new places with you.',
        'events': 'I wish to attend concerts and events together.',
        'traditions': 'I wish to create special traditions just for us.',
        'milestones': 'I wish to celebrate all our achievements together.',
        'learn': 'I wish to learn new things together and grow.',
        'joy': 'I wish to fill our lives with laughter and beautiful memories.',
        'communication': 'I wish for better communication and understanding.',
        'dreams': 'I wish to support all your dreams and ambitions.',
        'trust': 'I wish to build unbreakable trust between us.',
        'peace': 'I wish for a peaceful and supportive relationship.',
        'connection': 'I wish for a deeper emotional connection with you.',
        'growth': 'I wish to help you become the best version of yourself.',
        'home': 'I wish for a cozy home filled with our laughter and love.',
        'travel': 'I wish to explore the world hand in hand with you.',
        'forever': 'I wish to grow old together, loving you more each day.',
        'family': 'I wish to build a beautiful family with you one day.',
        'future-steps': 'I wish to plan our future together, step by step.',
        'partnership': 'I wish for a lifetime partnership with you.'
    };
    
    const wish = wishes[type] || 'I wish for more beautiful moments with you';
    
    // Show wish in a beautiful way
    showWishPopup(type, wish);
    
    // Save wish to localStorage
    saveWish(type, wish);
    
    // Create hearts animation
    createHearts(5);
    
    // Play wish sound
    playWishSound();
}

// Show beautiful wish popup
function showWishPopup(type, wish) {
    // Create popup element
    const popup = document.createElement('div');
    popup.className = 'wish-popup';
    popup.innerHTML = `
        <div class="wish-content">
            <i class="fas fa-star"></i>
            <h3>Wish Added! ✨</h3>
            <p>"${wish}"</p>
            <button onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-heart"></i> Beautiful!
            </button>
        </div>
    `;
    
    // Add styles
    popup.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(10, 10, 26, 0.95);
        backdrop-filter: blur(20px);
        border-radius: 20px;
        padding: 30px;
        z-index: 10000;
        border: 2px solid rgba(255, 107, 139, 0.3);
        box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        animation: fadeIn 0.3s ease;
        max-width: 400px;
        width: 90%;
    `;
    
    const content = popup.querySelector('.wish-content');
    content.style.cssText = `
        text-align: center;
        color: white;
    `;
    
    content.querySelector('i').style.cssText = `
        font-size: 3rem;
        color: #ff6b8b;
        margin-bottom: 15px;
        display: block;
    `;
    
    content.querySelector('h3').style.cssText = `
        font-size: 1.8rem;
        margin-bottom: 15px;
        background: linear-gradient(to right, #ff6b8b, #8a2be2);
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    `;
    
    content.querySelector('p').style.cssText = `
        font-size: 1.1rem;
        line-height: 1.6;
        margin-bottom: 20px;
        color: rgba(255, 255, 255, 0.9);
        font-style: italic;
    `;
    
    const button = content.querySelector('button');
    button.style.cssText = `
        padding: 12px 25px;
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
        font-size: 1rem;
    `;
    
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
    
    // Add to page
    document.body.appendChild(popup);
    
    // Remove after 5 seconds automatically
    setTimeout(() => {
        if (popup.parentElement) {
            popup.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                if (popup.parentElement) {
                    popup.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Save wish to localStorage
function saveWish(type, wish) {
    const wishes = JSON.parse(localStorage.getItem('ourWishes') || '[]');
    wishes.push({
        type: type,
        text: wish,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
    });
    localStorage.setItem('ourWishes', JSON.stringify(wishes));
}

// Play wish sound
function playWishSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Magical sound
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2);
        
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        // Audio not supported
    }
}

// View all wishes
function viewAllWishes() {
    const wishes = JSON.parse(localStorage.getItem('ourWishes') || '[]');
    
    if (wishes.length === 0) {
        alert('No wishes yet! Add some wishes for our future! 💫');
        return;
    }
    
    let message = '🌟 OUR WISHES FOR THE FUTURE 🌟\n\n';
    wishes.forEach((wish, index) => {
        message += `${index + 1}. ${wish.text}\n`;
        message += `   📅 ${wish.date} at ${wish.time}\n\n`;
    });
    
    alert(message);
}

// Memory Game
function initMemoryGame() {
    // Check if memory game exists
    const memoryGame = document.querySelector('.memory-game');
    if (!memoryGame) return;
    
    const symbols = ['❤️', '⭐', '🌸', '💖', '🎵', '🌈', '✨', '💫'];
    gameCards = [...symbols, ...symbols];
    shuffleArray(gameCards);
    createGameBoard();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createGameBoard() {
    const grid = document.getElementById('memoryGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    gameCards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.index = index;
        card.dataset.symbol = symbol;
        card.innerHTML = `
            <div class="card-front">?</div>
            <div class="card-back">${symbol}</div>
        `;
        
        card.addEventListener('click', () => flipCard(card));
        grid.appendChild(card);
    });
}

function flipCard(card) {
    if (flippedCards.length >= 2 || card.classList.contains('flipped')) return;
    
    card.classList.add('flipped');
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.dataset.symbol === card2.dataset.symbol) {
        // Match found
        matchedPairs++;
        score++;
        const scoreEl = document.getElementById('score');
        if (scoreEl) {
            scoreEl.textContent = `${matchedPairs}/8`;
        }
        
        // Celebration
        createHearts(3);
        
        flippedCards = [];
        
        // Check if game is complete
        if (matchedPairs === 8) {
            setTimeout(() => {
                alert('Perfect! You found all the pairs! 🎉\n\nYou know our love inside out!');
                triggerConfetti();
            }, 500);
        }
    } else {
        // No match
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function resetGame() {
    matchedPairs = 0;
    score = 0;
    flippedCards = [];
    const scoreEl = document.getElementById('score');
    if (scoreEl) {
        scoreEl.textContent = '0/8';
    }
    initMemoryGame();
}

// Love Meter
function increaseLove() {
    const meter = document.getElementById('loveMeter');
    if (!meter) return;
    
    let currentWidth = parseInt(meter.style.width) || 75;
    currentWidth = Math.min(currentWidth + 5, 100);
    meter.style.width = `${currentWidth}%`;
    
    createHearts(5);
    playLoveSound();
    
    if (currentWidth === 100) {
        setTimeout(() => {
            alert('Our love is at maximum! ❤️\n\nI love you more than words can express!');
            triggerConfetti();
        }, 500);
    }
}

// Love Notes
function addHeartReaction(button) {
    if (!button) return;
    
    const likeCount = button.querySelector('.like-count');
    if (!likeCount) return;
    
    let count = parseInt(likeCount.textContent) || 0;
    count++;
    likeCount.textContent = count;
    
    button.innerHTML = `<i class="fas fa-heart"></i> ${count}`;
    button.style.color = '#ff6b8b';
    createHearts(2);
}

function sendLoveNote() {
    const textarea = document.getElementById('loveNote');
    if (!textarea) return;
    
    const message = textarea.value.trim();
    
    if (message) {
        // Save to localStorage (for her to see)
        const notes = JSON.parse(localStorage.getItem('loveNotes') || '[]');
        notes.push({
            text: message,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString()
        });
        localStorage.setItem('loveNotes', JSON.stringify(notes));
        
        // Send email to YOU
        sendEmailToYou(message);
        
        // Show success
        alert('Love note saved and sent to Methuselah! 💌\n\nHe will read it soon! Check his email!');
        textarea.value = '';
        createHearts(5);
        triggerConfetti();
    } else {
        alert('Please write something sweet first! 💖');
    }
}

function sendEmailToYou(message) {
    try {
        const subject = 'New Love Note from Mercy! 💌';
        const body = `New message from Mercy:\n\n"${message}"\n\nDate: ${new Date().toLocaleDateString()}\nTime: ${new Date().toLocaleTimeString()}\n\n❤️ From your love website ❤️`;
        
        // Use YOUR email address
        const yourEmail = 'mettmwamba@gmail.com';
        
        // Create mailto link
        const mailtoLink = `mailto:${yourEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Open in current window (better compatibility)
        window.location.href = mailtoLink;
        
        // Return true to indicate email was attempted

        // Return true to indicate email was attempted
        return true;
    } catch (error) {
        console.log('Email failed:', error);
        // Fallback to just saving the note
        return false;
    }
}

// Gallery functions
function openGallery() {
    const galleryPage = window.open('gallery.html', '_blank');
    if (!galleryPage) {
        alert('Pop-up blocked! Please allow pop-ups for this site to view the gallery.');
    }
}

// Mobile menu
function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            this.innerHTML = navLinks.classList.contains('active') ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });
    }
    
    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    });
}

// Smooth scroll
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                const navLinks = document.querySelector('.nav-links');
                const menuToggle = document.getElementById('menuToggle');
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    if (menuToggle) {
                        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
                
                // Scroll to element
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
}

// Interactive love message
function showLoveMessage() {
    const messages = [
        "You are the most beautiful person I know! ❤️",
        "Every moment with you is magical ✨",
        "My heart beats only for you 💓",
        "You make me the happiest person alive 😊",
        "I fall in love with you more every day 🌹",
        "You're my dream come true 💫",
        "I love your smile more than anything 😍",
        "You're my sunshine on cloudy days ☀️",
        "I'm so grateful for you 🙏",
        "You complete me in every way 💖"
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    // Create floating message
    const messageDiv = document.createElement('div');
    messageDiv.className = 'floating-message';
    messageDiv.innerHTML = `<span>${randomMessage}</span>`;
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 107, 139, 0.9);
        color: white;
        padding: 20px 30px;
        border-radius: 15px;
        font-size: 1.2rem;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(255, 107, 139, 0.3);
        animation: fadeInOut 3s ease forwards;
    `;
    
    // Add animation keyframes if not already present
    if (!document.querySelector('#messageAnimations')) {
        const style = document.createElement('style');
        style.id = 'messageAnimations';
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                20% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
                30% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(messageDiv);
    
    // Remove after animation
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 3000);
    
    // Create hearts
    createHearts(10);
    
    // Play sound
    playLoveSound();
}

function playLoveSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Love sound (rising pitch)
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(554.37, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.2);
        
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        // Audio not supported
    }
}

// Trigger confetti
function triggerConfetti() {
    if (typeof confetti === 'function') {
        // Multiple confetti bursts
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
        
        setTimeout(() => {
            confetti({
                particleCount: 50,
                angle: 60,
                spread: 55,
                origin: { x: 0 }
            });
        }, 250);
        
        setTimeout(() => {
            confetti({
                particleCount: 50,
                angle: 120,
                spread: 55,
                origin: { x: 1 }
            });
        }, 500);
        
        // Heart confetti
        setTimeout(() => {
            confetti({
                particleCount: 30,
                spread: 60,
                origin: { y: 0.8 },
                shapes: ['circle', 'square'],
                colors: ['#ff6b8b', '#8a2be2', '#00d4ff']
            });
        }, 750);
    }
}

// Preloader quotes rotation
function initQuoteRotation() {
    const quotes = document.querySelectorAll('.romantic-quotes p');
    if (quotes.length > 1) {
        let currentIndex = 0;
        
        setInterval(() => {
            quotes.forEach((quote, index) => {
                quote.classList.toggle('active', index === currentIndex);
            });
            
            currentIndex = (currentIndex + 1) % quotes.length;
        }, 4000);
    }
}

// Initialize everything when page loads
window.addEventListener('DOMContentLoaded', function() {
    // Start quote rotation in preloader
    initQuoteRotation();
    
    // Direct website unlock (no login required)
    unlockWebsite();
    
    // Initialize image error handlers
    initImageErrorHandlers();
});

// Handle image loading errors
function initImageErrorHandlers() {
    document.querySelectorAll('img').forEach(img => {
        const originalSrc = img.src;
        img.onerror = function() {
            console.log('Image failed to load:', originalSrc);
            // Keep placeholder if already set
            if (!this.src.includes('unsplash')) {
                this.src = 'https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60';
            }
        };
    });
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Add some hearts when section comes into view
                if (entry.target.id === 'messages' || entry.target.id === 'future') {
                    createHearts(3);
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Add CSS for animations if not already present
function addAnimationStyles() {
    if (!document.querySelector('#animationStyles')) {
        const style = document.createElement('style');
        style.id = 'animationStyles';
        style.textContent = `
            .animate-in {
                animation: fadeInUp 0.8s ease forwards;
            }
            
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
            
            .wish-popup {
                animation: popIn 0.3s ease forwards;
            }
            
            @keyframes popIn {
                0% {
                    transform: translate(-50%, -50%) scale(0.5);
                    opacity: 0;
                }
                100% {
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 1;
                }
            }
            
            .love-particle {
                position: fixed;
                font-size: 20px;
                pointer-events: none;
                z-index: 9998;
                animation: floatAway 2s ease-out forwards;
                color: #ff6b8b;
            }
            
            @keyframes floatAway {
                0% {
                    transform: translate(0, 0) rotate(0deg);
                    opacity: 1;
                }
                100% {
                    transform: translate(var(--tx, 100px), var(--ty, -100px)) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Add love particles on click
document.addEventListener('click', function(e) {
    // Create a love particle at click position
    if (Math.random() > 0.7) { // 30% chance
        const particle = document.createElement('div');
        particle.className = 'love-particle';
        particle.innerHTML = '❤️';
        particle.style.left = e.clientX + 'px';
        particle.style.top = e.clientY + 'px';
        
        // Random direction
        const tx = (Math.random() - 0.5) * 200;
        const ty = -(50 + Math.random() * 100);
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        
        // Random size
        particle.style.fontSize = `${15 + Math.random() * 15}px`;
        
        document.body.appendChild(particle);
        
        // Remove after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 2000);
    }
});

// Add loading progress bar animation
document.addEventListener('DOMContentLoaded', function() {
    // Add animation styles
    addAnimationStyles();
    
    // Initialize scroll animations after a delay
    setTimeout(() => {
        initScrollAnimations();
    }, 1000);
});

// Handle beforeunload event
window.addEventListener('beforeunload', function() {
    // Save current time for next visit
    localStorage.setItem('lastVisit', new Date().toISOString());
});

// Welcome back message
function showWelcomeBack() {
    const lastVisit = localStorage.getItem('lastVisit');
    if (lastVisit) {
        const lastDate = new Date(lastVisit);
        const now = new Date();
        const hoursSince = Math.floor((now - lastDate) / (1000 * 60 * 60));
        
        if (hoursSince < 24) {
            const messages = [
                "Welcome back! I was just thinking about you! 💭",
                "So happy to see you again! 😊",
                "Missed you! Thanks for coming back! 💖",
                "Every time you visit makes me smile! 😄"
            ];
            const message = messages[Math.floor(Math.random() * messages.length)];
            
            setTimeout(() => {
                // Show subtle notification
                const notification = document.createElement('div');
                notification.className = 'welcome-notification';
                notification.textContent = message;
                notification.style.cssText = `
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    background: rgba(255, 107, 139, 0.9);
                    color: white;
                    padding: 10px 20px;
                    border-radius: 10px;
                    z-index: 10000;
                    animation: slideInRight 0.5s ease forwards, fadeOut 0.5s ease 2.5s forwards;
                `;
                
                // Add animation keyframes if needed
                if (!document.querySelector('#notificationAnimations')) {
                    const style = document.createElement('style');
                    style.id = 'notificationAnimations';
                    style.textContent = `
                        @keyframes slideInRight {
                            from { transform: translateX(100%); opacity: 0; }
                            to { transform: translateX(0); opacity: 1; }
                        }
                        @keyframes fadeOut {
                            from { opacity: 1; }
                            to { opacity: 0; }
                        }
                    `;
                    document.head.appendChild(style);
                }
                
                document.body.appendChild(notification);
                
                // Remove after animation
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.remove();
                    }
                }, 3000);
                
            }, 3000);
        }
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // M - Toggle music
    if (e.key === 'm' || e.key === 'M') {
        if (audio) {
            togglePlay();
        }
    }
    
    // H - Create hearts
    if (e.key === 'h' || e.key === 'H') {
        createHearts(10);
    }
    
    // L - Show love message
    if (e.key === 'l' || e.key === 'L') {
        showLoveMessage();
    }
    
    // C - Confetti
    if (e.key === 'c' || e.key === 'C') {
        triggerConfetti();
    }
    
    // Escape - Close any open modals
    if (e.key === 'Escape') {
        document.querySelectorAll('.wish-popup, .floating-message').forEach(el => {
            el.remove();
        });
    }
});

// Touch gestures for mobile
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchend', function(e) {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;
    
    // Swipe up to create hearts
    if (Math.abs(diffY) > Math.abs(diffX) && diffY > 50) {
        createHearts(5);
    }
});

// Double tap for love
let lastTap = 0;
document.addEventListener('touchend', function(e) {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    
    if (tapLength < 300 && tapLength > 0) {
        // Double tap detected
        e.preventDefault();
        showLoveMessage();
    }
    
    lastTap = currentTime;
});

// Initialize on load
window.addEventListener('load', function() {
    // Show welcome back message
    setTimeout(showWelcomeBack, 2000);
    
    // Add a little surprise after 10 seconds
    setTimeout(() => {
        // Random surprise
        if (Math.random() > 0.5) {
            createHearts(3);
        }
    }, 10000);
});

// Export functions for global use (if needed)
window.unlockWebsite = unlockWebsite;
window.showLoveMessage = showLoveMessage;
window.increaseLove = increaseLove;
window.addWish = addWish;
window.viewAllWishes = viewAllWishes;
window.resetGame = resetGame;
window.sendLoveNote = sendLoveNote;
window.togglePlay = togglePlay;
window.nextSong = nextSong;
window.previousSong = previousSong;
window.toggleMute = toggleMute;
window.openGallery = openGallery;

// Log initialization
console.log('💖 Love website initialized successfully!');
console.log('🎵 Music player ready');
console.log('📅 Countdown timers active');
console.log('🎮 Memory game loaded');
console.log('💌 Love notes system ready');
console.log('✨ Future wishes initialized');