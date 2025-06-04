// Mobile menu toggle
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

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Show elements when scrolled to
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

// Gallery hover effect (only on devices that support hover)
if (window.matchMedia("(hover: hover)").matches) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        const caption = item.querySelector('.gallery-caption');
        item.addEventListener('mouseenter', () => {
            if (img) img.style.transform = 'scale(1.05)';
            if (caption) caption.style.transform = 'translateY(0)';
        });
        item.addEventListener('mouseleave', () => {
            if (img) img.style.transform = 'scale(1)';
            if (caption) caption.style.transform = 'translateY(100%)';
        });
    });
}

// Detect portrait images
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.onload = function () {
        if (this.naturalHeight > this.naturalWidth) {
            this.parentElement.classList.add('portrait');
        }
    };
});

// Expand image in overlay
function expandImage(element) {
    const overlay = document.getElementById('overlay');
    const expandedImg = document.getElementById('expandedImg');
    const expandedCaption = document.getElementById('expandedCaption');

    if (!overlay || !expandedImg || !expandedCaption) return;

    const imgSrc = element.querySelector('img')?.src;
    const caption = element.querySelector('.gallery-caption')?.textContent;

    if (imgSrc) expandedImg.src = imgSrc;
    if (caption) expandedCaption.textContent = caption;

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeImage() {
    const overlay = document.getElementById('overlay');
    overlay.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close overlay when clicking outside image
const overlay = document.getElementById('overlay');
if (overlay) {
    overlay.addEventListener('click', function (e) {
        if (e.target === this || !e.target.closest('#expandedImg')) {
            closeImage();
        }
    });
}

// Close overlay with ESC key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeImage();
    }
});

// Loading Screen Functionality
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.querySelector('.loading-screen');
    const progressBar = document.querySelector('.progress-bar');
    
    // Simulate progress (replace with actual loading logic)
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          loadingScreen.classList.add('hidden');
        }, 500);
      }
      progressBar.style.width = `${progress}%`;
    }, 300);
  
    // For actual implementation, you might want to use:
    // window.addEventListener('load', function() {
    //   loadingScreen.classList.add('hidden');
    // });
    
    // Or for more accurate loading tracking:
    // document.onreadystatechange = function() {
    //   if (document.readyState === 'complete') {
    //     loadingScreen.classList.add('hidden');
    //   }
    // }
  });

 // Love notes functionality
    const noteText = document.querySelector('.note-text');
    const loveMessages = [
        "Every moment with you feels like a beautiful dream I never want to wake up from.",
        "Your smile is my favorite thing in the world. It lights up my darkest days.",
        "I fall in love with you more and more each day, in ways I never thought possible.",
        "You are the missing piece to my puzzle, the answer to all my questions.",
        "My heart skips a beat every time I see you. You have that effect on me.",
        "Loving you is the easiest and most natural thing I've ever done.",
        "You make my world brighter just by being in it. I'm so grateful for you.",
        "I never believed in soulmates until I met you. Now I can't imagine my life without you.",
        "Your love is the greatest gift I've ever received. I cherish it every day.",
        "When I'm with you, I feel like I'm home. You're my safe place.",
        "You're not just my love, you're my best friend, my partner, and my everything.",
        "I love the way you love me - completely, unconditionally, and without hesitation."
    ];
