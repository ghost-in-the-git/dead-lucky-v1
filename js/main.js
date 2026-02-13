/**
 * Dead Lucky - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initScrollAnimations();
    initContactForm();
    initDailyTimer();
    initSmoothScroll();
    initHeaderScroll();
    initMultiplierSelector();
});

/**
 * Mobile Menu Toggle
 */
function initMobileMenu() {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav-buttons');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        toggle.classList.toggle('active');

        // Animate hamburger to X
        const spans = toggle.querySelectorAll('span');
        if (toggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!toggle.contains(e.target) && !nav.contains(e.target)) {
            nav.classList.remove('active');
            toggle.classList.remove('active');
            const spans = toggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

/**
 * Scroll-triggered Animations
 */
function initScrollAnimations() {
    const banners = document.querySelectorAll('.banner');
    const fadeElements = document.querySelectorAll('.fade-in');

    if (!banners.length && !fadeElements.length) return;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    banners.forEach(banner => {
        observer.observe(banner);
    });

    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Trigger hero section immediately
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.classList.add('visible');
    }
}

/**
 * Contact Form Handling
 */
function initContactForm() {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('formSuccess');

    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Basic validation
        if (!data.name || !data.email || !data.subject || !data.message) {
            showFormError('Please fill in all fields.');
            return;
        }

        if (!isValidEmail(data.email)) {
            showFormError('Please enter a valid email address.');
            return;
        }

        // Simulate form submission
        const submitButton = form.querySelector('.form-submit');
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<span>Sending...</span>';
        submitButton.disabled = true;

        // Simulate API call
        setTimeout(function() {
            form.style.display = 'none';
            if (successMessage) {
                successMessage.style.display = 'block';
            }

            // Reset form
            form.reset();
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        }, 1500);
    });
}

/**
 * Email Validation Helper
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Show Form Error
 */
function showFormError(message) {
    // Remove existing error
    const existingError = document.querySelector('.form-error');
    if (existingError) {
        existingError.remove();
    }

    // Create error element
    const error = document.createElement('div');
    error.className = 'form-error';
    error.style.cssText = `
        background: rgba(255, 71, 87, 0.1);
        border: 1px solid var(--color-accent-primary);
        color: var(--color-accent-primary);
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        text-align: center;
    `;
    error.textContent = message;

    const form = document.getElementById('contactForm');
    form.insertBefore(error, form.firstChild);

    // Auto-remove after 5 seconds
    setTimeout(function() {
        error.remove();
    }, 5000);
}

/**
 * Daily Reset Timer
 */
function initDailyTimer() {
    const timerSegments = document.querySelectorAll('.timer-segment');
    if (timerSegments.length !== 3) return;

    function updateTimer() {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);

        const diff = tomorrow - now;

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        timerSegments[0].textContent = String(hours).padStart(2, '0');
        timerSegments[1].textContent = String(minutes).padStart(2, '0');
        timerSegments[2].textContent = String(seconds).padStart(2, '0');
    }

    // Update immediately and then every second
    updateTimer();
    setInterval(updateTimer, 1000);
}

/**
 * Smooth Scroll for Anchor Links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Header Background on Scroll
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            header.style.background = 'rgba(10, 10, 15, 0.98)';
        } else {
            header.style.background = 'linear-gradient(to bottom, rgba(10, 10, 15, 0.95), rgba(10, 10, 15, 0.8))';
        }

        lastScroll = currentScroll;
    });
}

/**
 * Auto-cycling Example Images for Strategy Section
 */
function initMultiplierSelector() {
    const examples = document.querySelectorAll('.example-image');

    if (!examples.length) return;

    let currentIndex = 0;

    function cycleExamples() {
        // Remove active from all examples
        examples.forEach(example => example.classList.remove('active'));

        // Add active to current example
        examples[currentIndex].classList.add('active');

        // Move to next index (loop back to 0)
        currentIndex = (currentIndex + 1) % examples.length;
    }

    // Start cycling every 1 second
    setInterval(cycleExamples, 1000);
}

/**
 * Dice Animation Enhancement
 */
function animateDice() {
    const dice = document.querySelectorAll('.dice');
    dice.forEach((die, index) => {
        die.addEventListener('mouseenter', function() {
            const value = die.querySelector('.dice-value');
            if (value) {
                // Random dice roll animation
                let rolls = 0;
                const maxRolls = 10;
                const interval = setInterval(function() {
                    value.textContent = Math.floor(Math.random() * 6) + 1;
                    rolls++;
                    if (rolls >= maxRolls) {
                        clearInterval(interval);
                    }
                }, 50);
            }
        });
    });
}

// Initialize dice animation when DOM is ready
document.addEventListener('DOMContentLoaded', animateDice);

/**
 * Portal Animation Enhancement
 */
function initPortalAnimation() {
    const portal = document.querySelector('.summon-portal');
    if (!portal) return;

    portal.addEventListener('mouseenter', function() {
        const core = portal.querySelector('.portal-core span');
        if (core) {
            const rarities = ['?', '!', '*', '★'];
            let index = 0;
            const interval = setInterval(function() {
                core.textContent = rarities[index % rarities.length];
                index++;
            }, 200);

            portal.addEventListener('mouseleave', function() {
                clearInterval(interval);
                core.textContent = '?';
            }, { once: true });
        }
    });
}

// Initialize portal animation
document.addEventListener('DOMContentLoaded', initPortalAnimation);
