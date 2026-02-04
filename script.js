/* =====================================================
   KUDIRAT CELEBRATION WEBSITE - JAVASCRIPT
   Animations, Slideshow, Confetti, Interactions
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize loading screen
    initLoadingScreen();

    // Initialize all components
    initScrollAnimations();
    initSlideshow();
    initConfetti();
    initLetterAnimation();
    initMagneticButtons();
    initProgressNav();
    initClickSparkles();
    initProgressiveReveal();
});

/* =====================================================
   MAGNETIC BUTTONS
   ===================================================== */
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.celebration-btn, .slide-btn');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const deltaX = (x - centerX) / 4;
            const deltaY = (y - centerY) / 4;

            btn.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

/* =====================================================
   SCROLL ANIMATIONS (Intersection Observer)
   ===================================================== */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe section titles and subtitles
    document.querySelectorAll('.section-title, .section-subtitle').forEach(el => {
        observer.observe(el);
    });

    // Observe appreciation cards with staggered delays
    document.querySelectorAll('.appreciation-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(card);
    });

    // Observe sacred cards
    document.querySelectorAll('.sacred-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.12}s`;
        observer.observe(card);
    });

    // Observe quality cards
    document.querySelectorAll('.quality-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.08}s`;
        observer.observe(card);
    });

    // Observe superpower cards
    document.querySelectorAll('.superpower-card').forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Observe journey items
    document.querySelectorAll('.journey-item').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(item);
    });

    // Observe manifesto lines
    document.querySelectorAll('.manifesto-content p').forEach((line, index) => {
        line.style.transitionDelay = `${index * 0.12}s`;
        observer.observe(line);
    });

    // Observe slideshow container
    document.querySelectorAll('.slideshow-container').forEach(el => {
        observer.observe(el);
    });

    // Observe letter card
    document.querySelectorAll('.letter-card').forEach(el => {
        observer.observe(el);
    });

    // Observe vibe content
    document.querySelectorAll('.vibe-content').forEach(el => {
        observer.observe(el);
    });

    // Observe polaroid photos with staggered delays
    document.querySelectorAll('.polaroid').forEach((polaroid, index) => {
        polaroid.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(polaroid);
    });
}

/* =====================================================
   PHOTO SLIDESHOW
   ===================================================== */
function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const currentSlideEl = document.getElementById('currentSlide');
    const totalSlidesEl = document.getElementById('totalSlides');

    if (!slides.length || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    const totalSlides = slides.length;

    // Update total slides display
    if (totalSlidesEl) {
        totalSlidesEl.textContent = totalSlides;
    }

    function showSlide(index) {
        // Wrap around
        if (index >= totalSlides) index = 0;
        if (index < 0) index = totalSlides - 1;

        // Pause any playing videos in outgoing slides
        slides.forEach(slide => {
            const video = slide.querySelector('video');
            if (video) {
                video.pause();
                video.currentTime = 0;
            }
            slide.classList.remove('active');
        });

        // Add active to current
        slides[index].classList.add('active');
        currentIndex = index;

        // Auto-play video if current slide has one
        const currentVideo = slides[index].querySelector('video');
        if (currentVideo) {
            currentVideo.play().catch(() => {
                // Autoplay may be blocked, that's okay
            });
        }

        // Update counter
        if (currentSlideEl) {
            currentSlideEl.textContent = currentIndex + 1;
        }
    }

    // Navigation buttons
    prevBtn.addEventListener('click', () => {
        showSlide(currentIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
        showSlide(currentIndex + 1);
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            showSlide(currentIndex - 1);
        } else if (e.key === 'ArrowRight') {
            showSlide(currentIndex + 1);
        }
    });

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    const slideshowContainer = document.querySelector('.slideshow-container');

    if (slideshowContainer) {
        slideshowContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].clientX;
        }, { passive: true });

        slideshowContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const swipeThreshold = 30; // More sensitive
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swiped left - next slide
                showSlide(currentIndex + 1);
            } else {
                // Swiped right - prev slide
                showSlide(currentIndex - 1);
            }
        }
    }

    // Auto-advance every 5 seconds (optional - can be disabled)
    // setInterval(() => showSlide(currentIndex + 1), 5000);
}

/* =====================================================
   CONFETTI CELEBRATION
   ===================================================== */
function initConfetti() {
    const celebrateBtn = document.getElementById('celebrateBtn');
    const confettiContainer = document.getElementById('confettiContainer');
    const celebrationMessage = document.getElementById('celebrationMessage');

    if (!celebrateBtn || !confettiContainer) return;

    let hasClicked = false;

    celebrateBtn.addEventListener('click', () => {
        if (hasClicked) {
            // Allow re-triggering confetti
            confettiContainer.innerHTML = '';
        }

        hasClicked = true;
        createConfetti();

        // Show celebration message
        if (celebrationMessage) {
            celebrationMessage.classList.add('show');
        }

        // Add sparkle effect to button
        celebrateBtn.style.boxShadow = '0 0 60px rgba(212, 165, 165, 0.6)';
        setTimeout(() => {
            celebrateBtn.style.boxShadow = '';
        }, 1000);
    });

    function createConfetti() {
        const colors = [
            '#d4a5a5', // muted pink
            '#c89898', // dark pink
            '#e8e0d5', // beige
            '#f5f1ed', // cream
            '#ffd700', // gold
            '#ffb6c1', // light pink
            '#daa520'  // goldenrod
        ];

        const confettiCount = 80;
        const shapes = ['square', 'circle'];

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';

            // Random properties
            const color = colors[Math.floor(Math.random() * colors.length)];
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const left = Math.random() * 100;
            const delay = Math.random() * 1.5;
            const duration = 3 + Math.random() * 2;
            const size = 8 + Math.random() * 8;

            // Apply styles
            confetti.style.cssText = `
                left: ${left}%;
                top: -20px;
                width: ${size}px;
                height: ${size}px;
                background-color: ${color};
                border-radius: ${shape === 'circle' ? '50%' : '2px'};
                animation-delay: ${delay}s;
                animation-duration: ${duration}s;
            `;

            confettiContainer.appendChild(confetti);
        }

        // Create some star/sparkle shapes
        for (let i = 0; i < 20; i++) {
            const star = document.createElement('div');
            star.className = 'confetti';
            star.innerHTML = '✨';
            star.style.cssText = `
                left: ${Math.random() * 100}%;
                top: -20px;
                width: 20px;
                height: 20px;
                background: transparent;
                font-size: 16px;
                animation-delay: ${Math.random() * 1}s;
                animation-duration: ${3 + Math.random() * 2}s;
            `;
            confettiContainer.appendChild(star);
        }

        // Clean up after animation
        setTimeout(() => {
            confettiContainer.innerHTML = '';
        }, 6000);
    }
}

/* =====================================================
   LETTER ANIMATION (Typewriter Effect)
   ===================================================== */
function initLetterAnimation() {
    const letterContent = document.querySelector('.letter-content');
    if (!letterContent) return;

    const paragraphs = letterContent.querySelectorAll('p');
    if (!paragraphs.length) return;

    // Store original content and prepare for typing
    const originalContent = [];
    paragraphs.forEach((p, index) => {
        originalContent.push(p.innerHTML);
        p.innerHTML = '';
        p.style.opacity = '1';
        p.style.minHeight = '1.5em';
    });

    let currentParagraph = 0;
    let isTyping = false;

    // Create observer to trigger when letter section comes into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !isTyping) {
                isTyping = true;
                typeParagraph(0);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    observer.observe(letterContent);

    function typeParagraph(pIndex) {
        if (pIndex >= paragraphs.length) return;

        const p = paragraphs[pIndex];
        const text = originalContent[pIndex];
        let charIndex = 0;

        // Create a temporary div to parse HTML properly
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = text;
        const plainText = tempDiv.textContent;

        function typeChar() {
            if (charIndex < plainText.length) {
                p.textContent += plainText.charAt(charIndex);
                charIndex++;

                // Vary typing speed for natural feel
                const delay = plainText.charAt(charIndex) === ' ' ? 30 :
                    plainText.charAt(charIndex) === '.' ? 150 :
                        plainText.charAt(charIndex) === ',' ? 80 : 25;

                setTimeout(typeChar, delay);
            } else {
                // Restore HTML formatting after typing
                p.innerHTML = text;

                // Move to next paragraph after short pause
                setTimeout(() => typeParagraph(pIndex + 1), 400);
            }
        }

        typeChar();
    }
}

/* =====================================================
   SMOOTH SCROLL FOR INTERNAL LINKS
   ===================================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* =====================================================
   PARALLAX EFFECT FOR FLOATING EMOJIS
   ===================================================== */
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateParallax();
            ticking = false;
        });
        ticking = true;
    }
});

function updateParallax() {
    const scrolled = window.pageYOffset;
    const floatingEmojis = document.querySelectorAll('.floating-emoji');

    floatingEmojis.forEach((emoji, index) => {
        const speed = 0.1 + (index * 0.02);
        const yPos = scrolled * speed;
        emoji.style.transform = `translateY(${yPos}px)`;
    });
}

/* =====================================================
   LOADING OPTIMIZATION
   ===================================================== */
// Add loaded class to body after page loads
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Preload critical resources
function preloadResources() {
    // Could add image preloading here when actual photos are added
}

/* =====================================================
   ACCESSIBILITY ENHANCEMENTS
   ===================================================== */

// Reduce motion for users who prefer it
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition-smooth', '0s');

    // Disable animations
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}

// Focus visible styling for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

/* =====================================================
   LOADING SCREEN
   ===================================================== */
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (!loadingScreen) return;

    // Hide loading screen after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 1500); // Show loading for 1.5s minimum
    });

    // Fallback: hide after 3 seconds even if not fully loaded
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 3000);
}

/* =====================================================
   PROGRESS NAVIGATION
   ===================================================== */
function initProgressNav() {
    const progressNav = document.getElementById('progressNav');
    const dots = document.querySelectorAll('.progress-dot');

    if (!progressNav || !dots.length) return;

    // Show nav after scrolling past hero
    const heroHeight = document.querySelector('.hero')?.offsetHeight || 0;

    function updateProgressNav() {
        const scrollY = window.scrollY;

        // Show/hide nav based on scroll
        if (scrollY > heroHeight * 0.5) {
            progressNav.classList.add('visible');
        } else {
            progressNav.classList.remove('visible');
        }

        // Update active dot based on current section
        const sections = [
            { name: 'hero', el: document.querySelector('.hero') },
            { name: 'welcome-section', el: document.querySelector('.welcome-section') },
            { name: 'appreciation-section', el: document.querySelector('.appreciation-section') },
            { name: 'slideshow-section', el: document.querySelector('.slideshow-section') },
            { name: 'memories-section', el: document.querySelector('.memories-section') },
            { name: 'sacred-section', el: document.querySelector('.sacred-section') },
            { name: 'qualities-section', el: document.querySelector('.qualities-section') },
            { name: 'journey-section', el: document.querySelector('.journey-section') },
            { name: 'letter-section', el: document.querySelector('.letter-section') },
            { name: 'celebration-section', el: document.querySelector('.celebration-section') }
        ];

        let currentSection = 'hero';
        const viewportMiddle = scrollY + window.innerHeight / 2;

        sections.forEach(section => {
            if (section.el) {
                const sectionTop = section.el.offsetTop;
                const sectionBottom = sectionTop + section.el.offsetHeight;

                if (viewportMiddle >= sectionTop && viewportMiddle < sectionBottom) {
                    currentSection = section.name;
                }
            }
        });

        dots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.dataset.section === currentSection) {
                dot.classList.add('active');
            }
        });
    }

    // Click to navigate
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const sectionName = dot.dataset.section;
            let target;

            if (sectionName === 'hero') {
                target = document.querySelector('.hero');
            } else {
                target = document.querySelector(`.${sectionName}`);
            }

            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    window.addEventListener('scroll', updateProgressNav, { passive: true });
    updateProgressNav();
}

/* =====================================================
   CLICK SPARKLES
   ===================================================== */
function initClickSparkles() {
    const container = document.getElementById('sparklesContainer');
    if (!container) return;

    const sparkleEmojis = ['✨', '💕', '🌺', '💫', '⭐', '🌟'];

    document.addEventListener('click', (e) => {
        // Don't sparkle on buttons or interactive elements
        if (e.target.closest('button, a, .slide-btn, input')) return;

        const count = 5 + Math.floor(Math.random() * 5);

        for (let i = 0; i < count; i++) {
            const sparkle = document.createElement('span');
            sparkle.className = 'sparkle';
            sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];

            const x = e.clientX + (Math.random() - 0.5) * 60;
            const y = e.clientY + (Math.random() - 0.5) * 60;

            sparkle.style.cssText = `
                left: ${x}px;
                top: ${y}px;
                font-size: ${12 + Math.random() * 16}px;
                animation-duration: ${0.6 + Math.random() * 0.4}s;
            `;

            container.appendChild(sparkle);

            // Remove after animation
            setTimeout(() => sparkle.remove(), 1000);
        }
    });
}

/* =====================================================
   PROGRESSIVE REVEAL
   ===================================================== */
function initProgressiveReveal() {
    const sections = document.querySelectorAll('.section');
    const continueButtons = document.querySelectorAll('.continue-btn');

    // Don't lock sections if there are no continue buttons (graceful fallback)
    if (!continueButtons.length) return;

    // Lock all sections except the first one
    sections.forEach((section, index) => {
        if (index > 0) {
            section.classList.add('locked');
        } else {
            section.classList.add('unlocked');
        }
    });

    // Handle continue button clicks
    continueButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const nextSection = sections[index + 1];

            if (nextSection) {
                // Unlock the next section
                nextSection.classList.remove('locked');
                nextSection.classList.add('unlocked');

                // Smooth scroll to next section
                setTimeout(() => {
                    nextSection.scrollIntoView({ behavior: 'smooth' });
                }, 100);

                // Trigger animations in the unlocked section
                triggerSectionAnimations(nextSection);
            }
        });
    });
}

function triggerSectionAnimations(section) {
    // Find all animatable elements in section and trigger their animations
    const animatables = section.querySelectorAll('.section-title, .section-subtitle, .appreciation-card, .sacred-card, .quality-card, .journey-item, .polaroid, .letter-card, .vibe-content, .slideshow-container');

    animatables.forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, index * 100);
    });
}

console.log('🌺 Kudi Celebration Website loaded with love ❤️');
