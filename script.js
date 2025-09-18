// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.98)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    }
});

// Smooth scrolling for anchor links
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

// Gallery thumbnail functionality
const galleryThumbnails = document.querySelectorAll('.gallery-thumbnails img');
const galleryMain = document.querySelector('.gallery-main img');

if (galleryThumbnails.length > 0 && galleryMain) {
    galleryThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            const newSrc = thumbnail.src;
            const newAlt = thumbnail.alt;
            
            // Fade out current image
            galleryMain.style.opacity = '0';
            
            setTimeout(() => {
                galleryMain.src = newSrc;
                galleryMain.alt = newAlt;
                galleryMain.style.opacity = '1';
            }, 200);
        });
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('loading');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.about, .experience, .projects, .patio-operacional, .cta');
    animateElements.forEach(el => observer.observe(el));
});

// Video autoplay handling for mobile
const video = document.querySelector('video');
if (video) {
    // Ensure video plays on mobile
    video.addEventListener('loadeddata', () => {
        video.play().catch(e => {
            console.log('Video autoplay prevented:', e);
        });
    });
    
    // Pause video when not in viewport to save bandwidth
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                video.play().catch(e => console.log('Video play failed:', e));
            } else {
                video.pause();
            }
        });
    }, { threshold: 0.5 });
    
    videoObserver.observe(video);
}

// Lazy loading for images
const images = document.querySelectorAll('img[loading="lazy"]');
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Scroll to top functionality
const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

// Add scroll to top button
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: #00d4ff;
    color: white;
    border: none;
    cursor: pointer;
    display: none;
    z-index: 1000;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 212, 255, 0.3);
`;

scrollToTopBtn.addEventListener('click', scrollToTop);
document.body.appendChild(scrollToTopBtn);

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

// Form validation and submission (for contact forms)
const forms = document.querySelectorAll('form');
forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff4444';
            } else {
                input.style.borderColor = '#ddd';
            }
        });
        
        if (isValid) {
            // Here you would typically send the form data to a server
            alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
            form.reset();
        } else {
            alert('Por favor, completa todos los campos requeridos.');
        }
    });
});

// Performance optimization: Preload critical images
const criticalImages = [
    'trabajadores.jpg',
    'pozo.jpg',
    'flota.jpg'
];

criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
});

// Add loading states for better UX
const addLoadingState = (element) => {
    element.style.opacity = '0.5';
    element.style.pointerEvents = 'none';
};

const removeLoadingState = (element) => {
    element.style.opacity = '1';
    element.style.pointerEvents = 'auto';
};

// Error handling for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
        img.style.display = 'none';
        console.warn(`Failed to load image: ${img.src}`);
    });
});

// Animated Counter for Statistics
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (target >= 100) {
            element.textContent = Math.floor(current) + '%';
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Animate Progress Bars
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
}

// Intersection Observer for Statistics Animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            const progressBars = entry.target.querySelectorAll('.progress-bar');
            
            // Animate counters
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            
            // Animate progress bars with delay
            setTimeout(() => {
                progressBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                });
            }, 500);
            
            // Unobserve after animation
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

// Observe stats section when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.experience-stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
    
    // Fallback: Trigger animation after 1 second if not triggered by scroll
    setTimeout(() => {
        const statsSection = document.querySelector('.experience-stats');
        if (statsSection && !statsSection.classList.contains('animated')) {
            const statNumbers = statsSection.querySelectorAll('.stat-number');
            const progressBars = statsSection.querySelectorAll('.progress-bar');
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            
            setTimeout(() => {
                progressBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width + '%';
                });
            }, 500);
            
            statsSection.classList.add('animated');
        }
    }, 1000);
});

// About Slider functionality
const aboutSliderImages = document.querySelectorAll('.about-slider .slider-image');
const aboutPrevBtn = document.querySelector('.about-slider .prev-btn');
const aboutNextBtn = document.querySelector('.about-slider .next-btn');
const aboutIndicators = document.querySelectorAll('.about-slider .indicator');
let aboutCurrentSlide = 0;

function showAboutSlide(index) {
    aboutSliderImages.forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });
    aboutIndicators.forEach((indicator, i) => {
        indicator.classList.toggle('active', i === index);
    });
}

function nextAboutSlide() {
    aboutCurrentSlide = (aboutCurrentSlide + 1) % aboutSliderImages.length;
    showAboutSlide(aboutCurrentSlide);
}

function prevAboutSlide() {
    aboutCurrentSlide = (aboutCurrentSlide - 1 + aboutSliderImages.length) % aboutSliderImages.length;
    showAboutSlide(aboutCurrentSlide);
}

if (aboutNextBtn) aboutNextBtn.addEventListener('click', nextAboutSlide);
if (aboutPrevBtn) aboutPrevBtn.addEventListener('click', prevAboutSlide);

aboutIndicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        aboutCurrentSlide = index;
        showAboutSlide(aboutCurrentSlide);
    });
});

// Auto-slide for about slider
if (aboutSliderImages.length > 0) {
    setInterval(nextAboutSlide, 4000);
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
    
    // First, make all elements visible immediately
    animatedElements.forEach(el => {
        el.classList.add('visible');
    });
    
    // Then observe for scroll animations
    animatedElements.forEach(el => scrollObserver.observe(el));
});

// Image Modal functionality
let currentImageIndex = 0;
const images = [
    'assets/images/projects/pozo 2.jpg',
    'assets/images/projects/pozo 3.jpg',
    'assets/images/projects/pozo 4.jpg',
    'assets/images/projects/pozo y trabajadores.jpg',
    'assets/images/equipment/flota 2.jpg'
];

function openImageModal() {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const currentImageSpan = document.getElementById('currentImage');
    const totalImagesSpan = document.getElementById('totalImages');
    
    currentImageIndex = 0;
    modalImage.src = images[currentImageIndex];
    currentImageSpan.textContent = currentImageIndex + 1;
    totalImagesSpan.textContent = images.length;
    
    // Update thumbnail active state
    updateThumbnails();
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

function changeImage(direction) {
    currentImageIndex += direction;
    
    if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    }
    
    const modalImage = document.getElementById('modalImage');
    const currentImageSpan = document.getElementById('currentImage');
    
    modalImage.src = images[currentImageIndex];
    currentImageSpan.textContent = currentImageIndex + 1;
    
    // Update thumbnail active state
    updateThumbnails();
}

function setCurrentImage(index) {
    currentImageIndex = index;
    const modalImage = document.getElementById('modalImage');
    const currentImageSpan = document.getElementById('currentImage');
    
    modalImage.src = images[currentImageIndex];
    currentImageSpan.textContent = currentImageIndex + 1;
    
    // Update thumbnail active state
    updateThumbnails();
}

function updateThumbnails() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

// Close modal when clicking outside the modal content
window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeImageModal();
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('imageModal');
    if (modal.style.display === 'block') {
        switch(event.key) {
            case 'Escape':
                closeImageModal();
                break;
            case 'ArrowLeft':
                changeImage(-1);
                break;
            case 'ArrowRight':
                changeImage(1);
                break;
        }
    }
});

// Patio Statistics Animation
const patioStatsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            
            // Animate patio statistics
            statNumbers.forEach((stat, index) => {
                // Add delay for each stat
                setTimeout(() => {
                    const text = stat.textContent.trim();
                    if (text.includes('50,000+')) {
                        animatePatioCounter(stat, 50000, '+', 'm²');
                    } else if (text.includes('24/7')) {
                        stat.textContent = '24/7';
                        stat.style.opacity = '1';
                    } else if (text.includes('100%')) {
                        animatePatioCounter(stat, 100, '%', '');
                    } else if (text.includes('15+')) {
                        animatePatioCounter(stat, 15, '+', '');
                    }
                }, index * 200); // 200ms delay between each stat
            });
            
            // Unobserve after animation
            patioStatsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

// Animate Patio Counter
function animatePatioCounter(element, target, suffix, unit) {
    const start = 0;
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        if (unit === 'm²') {
            element.textContent = Math.floor(current).toLocaleString() + suffix + ' ' + unit;
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

// Observe patio stats section when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const patioStatsSection = document.querySelector('.patio-stats');
    if (patioStatsSection) {
        patioStatsObserver.observe(patioStatsSection);
    }
    
    // Fallback: Trigger animation after 2 seconds if not triggered by scroll
    setTimeout(() => {
        const patioStatsSection = document.querySelector('.patio-stats');
        if (patioStatsSection && !patioStatsSection.classList.contains('animated')) {
            const statNumbers = patioStatsSection.querySelectorAll('.stat-number');
            
            statNumbers.forEach((stat, index) => {
                setTimeout(() => {
                    const text = stat.textContent.trim();
                    if (text.includes('50,000+')) {
                        animatePatioCounter(stat, 50000, '+', 'm²');
                    } else if (text.includes('24/7')) {
                        stat.textContent = '24/7';
                        stat.style.opacity = '1';
                    } else if (text.includes('100%')) {
                        animatePatioCounter(stat, 100, '%', '');
                    } else if (text.includes('15+')) {
                        animatePatioCounter(stat, 15, '+', '');
                    }
                }, index * 200);
            });
            
            patioStatsSection.classList.add('animated');
        }
    }, 2000);
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
});

// Console welcome message
console.log('%c🚀 Petrovenca Website', 'color: #d31f45; font-size: 20px; font-weight: bold;');
console.log('%cDesarrollado con excelencia y responsabilidad', 'color: #666; font-size: 14px;');
