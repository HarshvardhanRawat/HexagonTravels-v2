// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavbar();
    initHeroSlider();
    initStatsCounter();
    initCarousel();
    initReviewsCarousel();
    initScrollAnimations();
    initContactForm();
    initMobileMenu();
});

// Navbar functionality
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Hero Slider
function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;
    
    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    
    // Change slide every 5 seconds
    setInterval(nextSlide, 5000);
}

// Stats Counter Animation
function initStatsCounter() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-target'));
        const count = parseInt(counter.innerText);
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(counter), 1);
        } else {
            counter.innerText = target;
        }
    };
    
    // Intersection Observer for stats
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                statsObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        statsObserver.observe(counter);
    });
}

// Destinations Carousel
function initCarousel() {
    const tracks = document.querySelectorAll('.carousel-track');
    const slideWidth = 300 + 32; // slide width + gap
    
    // Store carousel instances
    const carousels = {};
    
    tracks.forEach((track, trackIndex) => {
        let currentIndex = 0;
        const slides = track.querySelectorAll('.carousel-slide');
        const maxIndex = Math.max(0, slides.length - Math.floor(track.parentElement.offsetWidth / slideWidth));
        
        function moveCarousel(direction) {
            if (direction === 1 && currentIndex < maxIndex) {
                currentIndex++;
            } else if (direction === -1 && currentIndex > 0) {
                currentIndex--;
            }
            
            const translateX = -currentIndex * slideWidth;
            track.style.transform = `translateX(${translateX}px)`;
        }
        
        // Store the moveCarousel function for this track
        carousels[trackIndex] = moveCarousel;
        
        // Touch/swipe support for mobile
        let startX = 0;
        let endX = 0;
        
        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    moveCarousel(1);
                } else {
                    moveCarousel(-1);
                }
            }
        });
    });
    
    // Make moveCarousel globally accessible
    window.moveCarousel = function(direction, trackIndex) {
        if (carousels[trackIndex]) {
            carousels[trackIndex](direction);
        }
    };
}

// Reviews Carousel - Single Review Display
let currentReviewIndex = 0;
let reviewInterval;

function initReviewsCarousel() {
    const reviewItems = document.querySelectorAll('.review-item');
    const indicators = document.querySelectorAll('.indicator');
    const reviewsContainer = document.querySelector('.reviews-container');
    
    if (reviewItems.length === 0) return;
    
    // Show first review
    showReview(0);
    
    // Start auto-play
    startReviewAutoPlay();
    
    // Add event listeners for navigation
    document.querySelector('.prev-btn').addEventListener('click', () => changeReview(-1));
    document.querySelector('.next-btn').addEventListener('click', () => changeReview(1));
    
    // Add event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToReview(index));
    });
    
    // Pause auto-play on hover
    if (reviewsContainer) {
        reviewsContainer.addEventListener('mouseenter', pauseReviewAutoPlay);
        reviewsContainer.addEventListener('mouseleave', resumeReviewAutoPlay);
    }
}

function showReview(index) {
    const reviewItems = document.querySelectorAll('.review-item');
    const indicators = document.querySelectorAll('.indicator');
    
    // Hide all reviews
    reviewItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Remove active class from all indicators
    indicators.forEach(indicator => {
        indicator.classList.remove('active');
    });
    
    // Show selected review
    reviewItems[index].classList.add('active');
    indicators[index].classList.add('active');
    
    currentReviewIndex = index;
}

function changeReview(direction) {
    const reviewItems = document.querySelectorAll('.review-item');
    let newIndex = currentReviewIndex + direction;
    
    // Handle wrap-around
    if (newIndex < 0) {
        newIndex = reviewItems.length - 1;
    } else if (newIndex >= reviewItems.length) {
        newIndex = 0;
    }
    
    showReview(newIndex);
    
    // Reset auto-play timer
    resetReviewAutoPlay();
}

function goToReview(index) {
    showReview(index);
    
    // Reset auto-play timer
    resetReviewAutoPlay();
}

function startReviewAutoPlay() {
    reviewInterval = setInterval(() => {
        changeReview(1);
    }, 5000); // Change every 5 seconds
}

function resetReviewAutoPlay() {
    clearInterval(reviewInterval);
    startReviewAutoPlay();
}

// Pause auto-play on hover
function pauseReviewAutoPlay() {
    clearInterval(reviewInterval);
}

function resumeReviewAutoPlay() {
    startReviewAutoPlay();
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.section-title, .stat-card, .destination-card, .contact-item, .about-text, .about-images');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Contact Form
function initContactForm() {
    const form = document.querySelector('.contact-form form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const name = form.querySelector('input[type="text"]').value;
            const email = form.querySelector('input[type="email"]').value;
            const message = form.querySelector('textarea').value;
            
            // Simple validation
            if (!name || !email || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                form.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4F7336' : '#593122'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Mobile Menu
function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animate hamburger bars
            const bars = hamburger.querySelectorAll('.bar');
            if (hamburger.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Reset hamburger animation
                const bars = hamburger.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            });
        });
    }
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80; // Account for fixed navbar
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        const rate = scrolled * -0.5;
        heroContent.style.transform = `translate(-50%, calc(-50% + ${rate}px))`;
    }
});

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

// Add loading animation for page
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add CSS for loading state
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #142615;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: 'Hexagon Travels';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #A6775B;
        font-size: 2rem;
        font-weight: 700;
        z-index: 10000;
        animation: pulse 1.5s infinite;
    }
    
    @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
`;

document.head.appendChild(loadingStyles);
