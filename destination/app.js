// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initMobileMenu();
    initModal();
    initScrollAnimations();
    initPackageSelection();
    initThemeCards();
    initTiltCards();
    initParallaxHero();
});

// Navbar functionality
function initNavbar() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(20, 38, 21, 0.98)';
        } else {
            navbar.style.background = 'rgba(20, 38, 21, 0.95)';
        }
    });
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

// Modal functionality
function initModal() {
    const modal = document.getElementById('packageModal');
    const closeBtn = document.querySelector('.close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
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
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Tilt effect for floating cards
function initTiltCards() {
    const tiltElements = document.querySelectorAll('[data-tilt]');
    tiltElements.forEach((card) => {
        const dampen = 20; // smaller = more tilt
        let frame;
        const onMove = (e) => {
            const rect = card.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const rx = +(dy / dampen).toFixed(2);
            const ry = +(-dx / dampen).toFixed(2);
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
            });
        };
        const onLeave = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                card.style.transform = 'rotateX(0deg) rotateY(0deg)';
            });
        };
        card.addEventListener('mousemove', onMove);
        card.addEventListener('mouseleave', onLeave);
    });
}

// Parallax for hero background
function initParallaxHero() {
    const heroBg = document.querySelector('.hero-background');
    if (!heroBg) return;
    let ticking = false;
    const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const offset = window.scrollY * 0.15;
            heroBg.style.transform = `translateY(${offset}px)`;
            ticking = false;
        });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
}

// Package Selection
function initPackageSelection() {
    const packageOptions = document.querySelectorAll('.package-option');
    
    packageOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            packageOptions.forEach(opt => opt.classList.remove('selected'));
            // Add selected class to clicked option
            this.classList.add('selected');
        });
    });
}

// Show Package Details Modal
function showPackageDetails(destination) {
    const modal = document.getElementById('packageModal');
    const modalContent = document.getElementById('modalContent');
    
    const destinationData = {
        'santorini': {
            name: 'Santorini, Greece',
            description: 'Experience the stunning white architecture and breathtaking sunsets of the Aegean Sea.',
            packages: [
                { name: 'Romantic Getaway', price: '$1,299', duration: '7 Days', features: ['Luxury hotel with sea view', 'Private sunset cruise', 'Wine tasting tour', 'Airport transfers', 'Daily breakfast'] },
                { name: 'Cultural Explorer', price: '$1,599', duration: '10 Days', features: ['Guided archaeological tours', 'Cooking classes', 'Island hopping', 'Local guide', 'All meals included'] },
                { name: 'Adventure Package', price: '$1,899', duration: '12 Days', features: ['Hiking trails', 'Water sports', 'Photography workshop', 'Multi-island tour', 'Premium accommodation'] }
            ]
        },
        'swiss-alps': {
            name: 'Swiss Alps',
            description: 'Discover pristine mountain landscapes and world-class skiing in the heart of Europe.',
            packages: [
                { name: 'Winter Wonderland', price: '$1,899', duration: '10 Days', features: ['Ski passes included', 'Mountain lodge accommodation', 'Ski equipment rental', 'Guided tours', 'Après-ski activities'] },
                { name: 'Summer Adventure', price: '$2,199', duration: '12 Days', features: ['Hiking expeditions', 'Mountain biking', 'Alpine photography', 'Luxury chalet', 'Professional guides'] },
                { name: 'Luxury Escape', price: '$3,299', duration: '14 Days', features: ['5-star accommodation', 'Private chef', 'Helicopter tours', 'Spa treatments', 'Concierge service'] }
            ]
        },
        'bali': {
            name: 'Bali, Indonesia',
            description: 'Immerse yourself in tropical paradise with pristine beaches and rich cultural heritage.',
            packages: [
                { name: 'Beach Paradise', price: '$999', duration: '8 Days', features: ['Beachfront villa', 'Surfing lessons', 'Spa treatments', 'Cultural tours', 'All-inclusive meals'] },
                { name: 'Cultural Immersion', price: '$1,299', duration: '10 Days', features: ['Temple visits', 'Traditional dance', 'Cooking classes', 'Rice terrace tours', 'Local homestay'] },
                { name: 'Adventure Seeker', price: '$1,599', duration: '12 Days', features: ['Volcano trekking', 'Waterfall exploration', 'Diving certification', 'Jungle tours', 'Adventure activities'] }
            ]
        },
        'machu-picchu': {
            name: 'Machu Picchu, Peru',
            description: 'Explore the ancient Incan citadel nestled high in the Andes Mountains.',
            packages: [
                { name: 'Classic Trek', price: '$1,599', duration: '9 Days', features: ['Inca Trail trek', 'Professional guides', 'Camping equipment', 'Machu Picchu entry', 'Cusco exploration'] },
                { name: 'Luxury Journey', price: '$2,899', duration: '12 Days', features: ['Luxury train journey', '5-star hotels', 'Private guides', 'Exclusive access', 'Gourmet dining'] },
                { name: 'Cultural Discovery', price: '$2,199', duration: '14 Days', features: ['Extended cultural tours', 'Local communities', 'Traditional ceremonies', 'Archaeological sites', 'Expert historians'] }
            ]
        },
        'paris': {
            name: 'Paris, France',
            description: 'The City of Light awaits with its iconic landmarks, world-class cuisine, and romantic atmosphere.',
            packages: [
                { name: 'Romantic Paris', price: '$1,199', duration: '6 Days', features: ['Boutique hotel', 'Eiffel Tower dinner', 'Seine River cruise', 'Louvre guided tour', 'Champagne tasting'] },
                { name: 'Art & Culture', price: '$1,499', duration: '8 Days', features: ['Museum passes', 'Art workshops', 'Historical tours', 'Opera tickets', 'Cultural experiences'] },
                { name: 'Gourmet Experience', price: '$1,899', duration: '10 Days', features: ['Michelin-starred dining', 'Wine tasting', 'Cooking classes', 'Food market tours', 'Chef experiences'] }
            ]
        },
        'tokyo': {
            name: 'Tokyo, Japan',
            description: 'Experience the perfect blend of traditional culture and cutting-edge technology in this vibrant metropolis.',
            packages: [
                { name: 'Modern Tokyo', price: '$1,799', duration: '8 Days', features: ['High-tech experiences', 'Robot restaurant', 'Gaming districts', 'Modern architecture', 'Tech tours'] },
                { name: 'Traditional Japan', price: '$2,199', duration: '10 Days', features: ['Temple stays', 'Tea ceremonies', 'Traditional crafts', 'Historical sites', 'Cultural workshops'] },
                { name: 'Ultimate Experience', price: '$2,899', duration: '12 Days', features: ['Luxury ryokan', 'Private guides', 'Exclusive access', 'Traditional performances', 'Premium dining'] }
            ]
        }
    };
    
    const data = destinationData[destination];
    if (!data) return;
    
    const packagesHTML = data.packages.map((pkg, index) => `
        <div class="package-option ${index === 0 ? 'selected' : ''}" onclick="selectPackage(this)">
            <h3>${pkg.name}</h3>
            <div class="price">${pkg.price}</div>
            <div class="duration">${pkg.duration}</div>
        </div>
    `).join('');
    
    const featuresHTML = data.packages[0].features.map(feature => `
        <li><i class="fas fa-check"></i>${feature}</li>
    `).join('');
    
    modalContent.innerHTML = `
        <div class="package-header">
            <h2>${data.name}</h2>
            <p>${data.description}</p>
        </div>
        
        <div class="package-options">
            ${packagesHTML}
        </div>
        
        <div class="package-features">
            <h3>Package Includes</h3>
            <ul class="features-list">
                ${featuresHTML}
            </ul>
        </div>
        
        <div class="booking-form">
            <h3>Book Your Trip</h3>
            <form onsubmit="handleBooking(event)">
                <div class="form-row">
                    <div class="form-group">
                        <label for="name">Full Name</label>
                        <input type="text" id="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="phone">Phone</label>
                        <input type="tel" id="phone" required>
                    </div>
                    <div class="form-group">
                        <label for="travelers">Number of Travelers</label>
                        <select id="travelers" required>
                            <option value="">Select</option>
                            <option value="1">1 Person</option>
                            <option value="2">2 People</option>
                            <option value="3">3 People</option>
                            <option value="4">4 People</option>
                            <option value="5+">5+ People</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="departure">Preferred Departure Date</label>
                        <input type="date" id="departure" required>
                    </div>
                    <div class="form-group">
                        <label for="package">Selected Package</label>
                        <input type="text" id="package" value="${data.packages[0].name}" readonly>
                    </div>
                </div>
                <button type="submit" class="book-now-btn">
                    Book Now
                    <i class="fas fa-paper-plane"></i>
                </button>
            </form>
        </div>
    `;
    
    modal.style.display = 'block';
    
    // Reinitialize package selection
    initPackageSelection();
}

// Select Package
function selectPackage(element) {
    const packageOptions = document.querySelectorAll('.package-option');
    packageOptions.forEach(opt => opt.classList.remove('selected'));
    element.classList.add('selected');
    
    // Update package name in form
    const packageName = element.querySelector('h3').textContent;
    document.getElementById('package').value = packageName;
}

// Add to Wishlist
function addToWishlist(destination) {
    const button = event.target.closest('.btn-secondary');
    const icon = button.querySelector('i');
    
    if (icon.classList.contains('fas-heart')) {
        icon.classList.remove('fas-heart');
        icon.classList.add('fas-heart-broken');
        button.style.background = '#593122';
        button.style.color = 'white';
        showNotification('Removed from wishlist', 'info');
    } else {
        icon.classList.remove('fas-heart-broken');
        icon.classList.add('fas-heart');
        button.style.background = 'transparent';
        button.style.color = '#A6775B';
        showNotification('Added to wishlist', 'success');
    }
}

// Handle Booking
function handleBooking(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const travelers = document.getElementById('travelers').value;
    const departure = document.getElementById('departure').value;
    const package = document.getElementById('package').value;
    
    // Simple validation
    if (!name || !email || !phone || !travelers || !departure) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate booking submission
    const submitBtn = event.target.querySelector('.book-now-btn');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification('Booking submitted successfully! We\'ll contact you within 24 hours.', 'success');
        document.getElementById('packageModal').style.display = 'none';
        event.target.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
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
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4F7336' : type === 'error' ? '#593122' : '#A6775B'};
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

// Smooth scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

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

// Theme Cards functionality
function initThemeCards() {
    const themeCards = document.querySelectorAll('.theme-card');
    
    themeCards.forEach(card => {
        // Add click event for theme cards
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking on the explore button
            if (e.target.closest('.theme-explore-btn')) {
                return;
            }
            
            // Get the theme link and navigate
            const exploreBtn = card.querySelector('.theme-explore-btn');
            if (exploreBtn) {
                window.location.href = exploreBtn.href;
            }
        });
        
        // Add hover sound effect (optional)
        card.addEventListener('mouseenter', function() {
            // Add subtle hover effect
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}


