document.addEventListener('DOMContentLoaded', function() {
    // ======================
    // Loading Screen
    // ======================
    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.getElementById('progress-bar');
    const quotes = document.querySelectorAll('.quote');
    const sparkles = document.querySelectorAll('.sparkle');
    let currentQuote = 0;
    
    // Animate sparkles
    if (sparkles.length > 0) {
        sparkles.forEach((sparkle, index) => {
            sparkle.style.animation = `sparkle ${2 + index * 0.3}s ease infinite ${index * 0.2}s`;
        });
    }
    
    // Rotate romantic quotes
    if (quotes.length > 0) {
        setInterval(() => {
            quotes[currentQuote].classList.remove('active');
            currentQuote = (currentQuote + 1) % quotes.length;
            quotes[currentQuote].classList.add('active');
        }, 3000);
    }
    
    // Actual loading implementation
    window.addEventListener('load', function() {
        // Quickly fill progress bar when page is loaded
        if (progressBar) {
            progressBar.style.width = '100%';
        }
        
        // Hide loading screen after short delay
        setTimeout(() => {
            if (loadingScreen) {
                loadingScreen.classList.add('hidden');
            }
        }, 500);
    });

    // ======================
    // Mobile Menu Toggle
    // ======================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navContainer = document.getElementById('nav-container');

    if (mobileMenuBtn && navContainer) {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');

        mobileMenuBtn.addEventListener('click', () => {
            const isActive = navContainer.classList.toggle('active');
            mobileMenuBtn.setAttribute('aria-expanded', isActive);
            mobileMenuBtn.innerHTML = isActive ? 
                '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (navContainer.classList.contains('active')) {
                    navContainer.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                }
            });
        });
    }

    // ======================
    // Smooth Scrolling
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
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

    // ======================
    // Scroll Animations
    // ======================
    const scrollElements = document.querySelectorAll('.music-player, [class*="animate"]');

    if (scrollElements.length > 0) {
        const elementInView = (el, dividend = 1) => {
            const elementTop = el.getBoundingClientRect().top;
            return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
        };

        const displayScrollElement = (element) => {
            element.classList.add('show');
        };

        const handleScrollAnimation = () => {
            scrollElements.forEach((el) => {
                if (elementInView(el, 1.25)) {
                    displayScrollElement(el);
                }
            });
        };

        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (!scrollTimeout) {
                scrollTimeout = requestAnimationFrame(() => {
                    handleScrollAnimation();
                    scrollTimeout = null;
                });
            }
        });

        // Initial check
        handleScrollAnimation();
    }

    // ======================
    // Countdown Timers
    // ======================
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
    const countdownInterval = setInterval(updateCountdowns, 1000);

    // ======================
    // Love Messages Carousel
    // ======================
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

    const featuredMessage = document.querySelector('.featured-message .message-text');
    const messageDate = document.querySelector('.message-date');
    const thumbnails = document.querySelectorAll('.message-thumbnail');
    const carouselTrack = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const composeBtn = document.querySelector('.compose-btn');

    if (featuredMessage && messageDate && thumbnails.length && carouselTrack) {
        // Initialize messages
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
                updateFeaturedMessage(index);
            });
        });

        // Carousel navigation
        let currentIndex = 0;

        function scrollToThumbnail(index) {
            const thumbnail = thumbnails[index];
            if (thumbnail) {
                thumbnail.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            }
        }

        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + messages.length) % messages.length;
                updateFeaturedMessage(currentIndex);
                scrollToThumbnail(currentIndex);
            });

            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % messages.length;
                updateFeaturedMessage(currentIndex);
                scrollToThumbnail(currentIndex);
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
                updateFeaturedMessage(0);
                
                // Create new thumbnail
                const newThumbnail = document.createElement('div');
                newThumbnail.className = 'message-thumbnail';
                newThumbnail.setAttribute('data-index', '0');
                newThumbnail.innerHTML = `
                    <div class="thumbnail-content">
                        <i class="fas fa-heart"></i>
                        <p>${newMessage.preview}</p>
                    </div>
                `;
                
                // Update all data-index attributes
                thumbnails.forEach((thumb, i) => {
                    thumb.setAttribute('data-index', i+1);
                });
                
                carouselTrack.prepend(newThumbnail);
                newThumbnail.addEventListener('click', () => updateFeaturedMessage(0));
                
                // Scroll to new message
                setTimeout(() => {
                    scrollToThumbnail(0);
                }, 100);
                
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
        updateFeaturedMessage(0);
    }

    // ======================
    // Gallery Functionality
    // ======================
    const galleryItems = document.querySelectorAll('.gallery-item');
    const overlay = document.getElementById('overlay');
    const expandedImg = document.getElementById('expandedImg');
    const expandedCaption = document.getElementById('expandedCaption');
    
    if (galleryItems.length > 0 && overlay && expandedImg && expandedCaption) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.querySelector('img').src;
                const caption = this.querySelector('.gallery-caption').textContent;
                
                expandedImg.src = imgSrc;
                expandedCaption.textContent = caption;
                overlay.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });
    }

    // ======================
    // Helper Functions
    // ======================
    function generateAIMessage() {
        const adjectives = ['beautiful', 'amazing', 'incredible', 'wonderful', 'stunning'];
        const nouns = ['smile', 'eyes', 'heart', 'soul', 'laughter'];
        const verbs = ['brightens', 'illuminates', 'transforms', 'enchants', 'captivates'];
        
        const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
        const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
        
        return `Your ${randomAdjective} ${randomNoun} ${randomVerb} my world every single day. I'm so lucky to have you.`;
    }

    // ======================
    // Heart Button Animation
    // ======================
    const heartButton = document.querySelector('.heart-button');
    if (heartButton) {
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

    // ======================
    // Milestones Animation
    // ======================
    const milestones = document.querySelectorAll('.milestones-list li');
    if (milestones.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                    entry.target.style.opacity = '0';
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                    }, 100);
                }
            });
        }, { threshold: 0.1 });

        milestones.forEach((milestone, index) => {
            milestone.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(milestone);
        });
    }

    // ======================
    // Message Tile Interaction
    // ======================
    const messageTile = document.querySelector('.message-tile-featured');
    if (messageTile) {
        messageTile.addEventListener('click', function() {
            this.classList.toggle('expanded');
        });
        
        const hearts = messageTile.querySelectorAll('.tile-hearts i');
        hearts.forEach((heart, index) => {
            heart.style.animation = `heartPulse ${1 + index * 0.2}s infinite`;
        });
    }
});

function closeImage() {
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}