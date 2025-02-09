// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 100;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect with intersection observer
const header = document.querySelector('.navbar');
const hero = document.querySelector('#hero');

const heroObserver = new IntersectionObserver(
    ([entry]) => {
        header.classList.toggle('scrolled', !entry.isIntersecting);
    },
    { threshold: 0.9 }
);

heroObserver.observe(hero);

// Animate elements on scroll
const animateOnScroll = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    },
    { threshold: 0.1 }
);

document.querySelectorAll('.vision-card, .focus-card, .venture-card').forEach(
    element => animateOnScroll.observe(element)
);

// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    const isExpanded = mobileMenu.getAttribute('aria-expanded') === 'true';
    mobileMenu.setAttribute('aria-expanded', !isExpanded);
    navLinks.classList.toggle('active');
});

// Stats counter animation
const stats = document.querySelectorAll('.stat-number');
const statsOptions = {
    threshold: 1,
    rootMargin: "0px"
};

const startCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'));
    const count = parseInt(el.innerText);
    const increment = target / 200;

    if (count < target) {
        el.innerText = Math.ceil(count + increment);
        setTimeout(() => startCounter(el), 1);
    } else {
        el.innerText = target;
    }
};

const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, statsOptions);

stats.forEach(stat => {
    statsObserver.observe(stat);
});

// Focus area cards animation
const focusCards = document.querySelectorAll('.focus-card');
focusCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Venture cards click handler
document.querySelectorAll('.learn-more').forEach(button => {
    button.addEventListener('click', function() {
        // Add your logic for handling venture card clicks
        const ventureName = this.parentElement.querySelector('h3').textContent;
        alert(`More information about ${ventureName} coming soon!`);
    });
});

// Scroll Progress Indicator
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Parallax Effect
const parallaxElements = document.querySelectorAll('.parallax');
window.addEventListener('scroll', () => {
    parallaxElements.forEach(element => {
        const speed = element.dataset.speed || 0.5;
        const yPos = -(window.pageYOffset * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "50px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Initialize observers
document.querySelectorAll('.focus-card, .venture-card, .insight-card').forEach(
    element => observer.observe(element)
);

// Cookie Banner Management
const cookieBanner = document.querySelector('.cookie-banner');
const acceptCookies = document.querySelector('.accept-cookies');
const rejectCookies = document.querySelector('.reject-cookies');

// Hide banner by default
cookieBanner.style.display = 'none';

// Check cookie preference on page load
document.addEventListener('DOMContentLoaded', () => {
    const cookiePreference = localStorage.getItem('cookiePreference');
    if (!cookiePreference) {
        cookieBanner.style.display = 'flex';
    }
});

acceptCookies.addEventListener('click', () => {
    localStorage.setItem('cookiePreference', 'accepted');
    cookieBanner.style.display = 'none';
});

rejectCookies.addEventListener('click', () => {
    localStorage.setItem('cookiePreference', 'rejected');
    cookieBanner.style.display = 'none';
});

// Newsletter Form
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector('input[type="email"]').value;
    
    try {
        // Add your newsletter subscription logic here
        console.log('Newsletter subscription:', email);
        // Show success message
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        // Show error message
    }
});

// Global Error Handler
window.addEventListener('error', function(e) {
    console.error('Global error:', e);
    // Add your error tracking service here
    // Show user-friendly error message
});

// Performance Monitoring
window.addEventListener('load', () => {
    // Report performance metrics
    const performance = window.performance;
    if (performance) {
        const timing = performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log('Page load time:', loadTime);
    }
});

// Add subtle 3D tilt effect to cards
VanillaTilt.init(document.querySelectorAll('.venture-card'), {
    max: 3,
    speed: 400,
    glare: true,
    'max-glare': 0.2
});

// Implement infinite scroll for insights section
const loadMoreInsights = async () => {
    const response = await fetch('/api/insights?page=${currentPage}');
    const newInsights = await response.json();
    // Smoothly append new content
};

// Add animated charts for venture statistics
const ventureData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
        label: 'Growth',
        data: [30, 45, 60, 85],
        borderColor: 'rgb(42, 63, 251)',
        tension: 0.4
    }]
};

const renderVentureStats = () => {
    const ctx = document.getElementById('ventureStats')?.getContext('2d');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: ventureData,
        options: {
            responsive: true,
            animation: {
                duration: 2000,
                easing: 'easeInOutQuart'
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};

// Initialize venture stats
renderVentureStats();

// Add a dynamic table of contents that updates on scroll
const createTableOfContents = () => {
    const sections = document.querySelectorAll('section[id]');
    const toc = document.createElement('nav');
    toc.className = 'table-of-contents';
    
    const tocList = document.createElement('ul');
    
    sections.forEach(section => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.textContent = section.querySelector('h2')?.textContent || section.id;
        a.href = `#${section.id}`;
        li.appendChild(a);
        tocList.appendChild(li);
    });
    
    toc.appendChild(tocList);
    document.body.appendChild(toc);
};

// Initialize table of contents
createTableOfContents();

// Implement lazy loading for images and components
const lazyLoad = () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
};

// Initialize lazy loading
lazyLoad();

// Scroll reveal animation
const scrollReveal = () => {
    const elements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'none';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s cubic-bezier(0.17, 0.85, 0.438, 0.99)';
        revealObserver.observe(element);
    });
};

// Initialize scroll reveal
document.addEventListener('DOMContentLoaded', () => {
    scrollReveal();
});

// Form validation
const validateField = async (field) => {
    const value = field.value;
    const type = field.type;
    
    if (type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return {
            valid: emailRegex.test(value),
            message: emailRegex.test(value) ? 'Valid email' : 'Please enter a valid email'
        };
    }
    
    return {
        valid: value.length > 0,
        message: value.length > 0 ? 'Valid' : 'This field is required'
    };
};

const showFieldFeedback = (field, result) => {
    const feedback = field.parentElement.querySelector('.field-feedback') 
        || document.createElement('div');
    feedback.className = `field-feedback ${result.valid ? 'valid' : 'invalid'}`;
    feedback.textContent = result.message;
    
    if (!field.parentElement.querySelector('.field-feedback')) {
        field.parentElement.appendChild(feedback);
    }
};

// Initialize form validation
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('input', async (e) => {
        const field = e.target;
        const result = await validateField(field);
        showFieldFeedback(field, result);
    });
});

// Color theme transition
const updateColorTheme = () => {
    const scrollPosition = window.scrollY;
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            section.classList.add('color-shift');
        } else {
            section.classList.remove('color-shift');
        }
    });
};

// Initialize color theme transition
window.addEventListener('scroll', updateColorTheme);

// Enhanced cursor functionality
const cursor = document.querySelector('.custom-cursor');
if (cursor && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });
    });

    // Enhanced interactive elements
    const interactiveElements = document.querySelectorAll(
        'a, button, .venture-card, .focus-card, .insight-card, .mission-link'
    );

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-expanded');
            element.style.transform = 'scale(1.02)';
        });

        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-expanded');
            element.style.transform = 'scale(1)';
        });
    });
}

// Add magnetic effect to buttons
const buttons = document.querySelectorAll('.magnetic-button');
buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0px, 0px)';
    });
});

// Add smooth scroll behavior
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf); 