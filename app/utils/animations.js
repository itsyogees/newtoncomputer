// Animation utility functions
class ScrollAnimations {
    constructor() {
        this.observer = null;
        this.init();
    }

    init() {
        // Create Intersection Observer
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateIn(entry.target);
                    } else {
                        // Optional: animate out when element leaves viewport
                        // this.animateOut(entry.target);
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        // Initialize animations on page load
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.setupAnimations();
            });
        } else {
            this.setupAnimations();
        }
    }

    setupAnimations() {
        // Setup scroll animations
        this.setupScrollAnimations();
        
        // Setup hover animations
        this.setupHoverAnimations();
        
        // Setup click animations
        this.setupClickAnimations();
        
        // Setup navbar scroll effect
        this.setupNavbarScroll();
    }

    setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('[data-animate]');
        
        animatedElements.forEach(element => {
            this.observer.observe(element);
            
            // Add initial hidden state
            const animationType = element.getAttribute('data-animate') || 'fadeUp';
            this.setInitialState(element, animationType);
        });
    }

    setInitialState(element, animationType) {
        const styles = {
            fadeUp: {
                opacity: '0',
                transform: 'translateY(50px)',
                transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            },
            fadeLeft: {
                opacity: '0',
                transform: 'translateX(-50px)',
                transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            },
            fadeRight: {
                opacity: '0',
                transform: 'translateX(50px)',
                transition: 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            },
            scale: {
                opacity: '0',
                transform: 'scale(0.9)',
                transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            },
            fadeIn: {
                opacity: '0',
                transition: 'all 0.6s ease-out'
            }
        };

        const style = styles[animationType] || styles.fadeUp;
        Object.assign(element.style, style);
    }

    animateIn(element) {
        element.style.opacity = '1';
        element.style.transform = 'translate(0) scale(1)';
        
        // Add animated class for CSS tracking
        element.classList.add('animated-in');
    }

    animateStagger(groupSelector, staggerDelay = 100) {
        const groups = document.querySelectorAll(groupSelector);
        
        groups.forEach((group, groupIndex) => {
            const items = group.querySelectorAll('[data-stagger]');
            
            items.forEach((item, index) => {
                // Set initial state
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px)';
                item.style.transition = `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${(groupIndex * staggerDelay) + (index * 100)}ms`;
                
                // Animate in
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            });
        });
    }

    setupHoverAnimations() {
        // Card hover effects
        const hoverCards = document.querySelectorAll('.feature-card, .brand-card, .service-card');
        
        hoverCards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.animateHover(e.currentTarget, 'enter');
            });
            
            card.addEventListener('mouseleave', (e) => {
                this.animateHover(e.currentTarget, 'leave');
            });
        });

        // Button hover effects
        const buttons = document.querySelectorAll('.service-btn, .hero__btn, .feature-btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                this.animateButton(e.currentTarget, 'enter');
            });
            
            button.addEventListener('mouseleave', (e) => {
                this.animateButton(e.currentTarget, 'leave');
            });
            
            button.addEventListener('mousedown', (e) => {
                this.animateButton(e.currentTarget, 'click');
            });
            
            button.addEventListener('mouseup', (e) => {
                this.animateButton(e.currentTarget, 'release');
            });
        });
    }

    animateHover(element, action) {
        if (action === 'enter') {
            element.style.transform = 'translateY(-8px)';
            element.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
            
            // Animate icon if present
            const icon = element.querySelector('.feature-card__icon, .brand-card__icon, .service-card__icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) translateY(-5px)';
            }
        } else if (action === 'leave') {
            element.style.transform = 'translateY(0)';
            element.style.boxShadow = '';
            
            // Reset icon
            const icon = element.querySelector('.feature-card__icon, .brand-card__icon, .service-card__icon');
            if (icon) {
                icon.style.transform = '';
            }
        }
    }

    animateButton(element, action) {
        switch(action) {
            case 'enter':
                element.style.transform = 'translateY(-2px) scale(1.05)';
                element.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.3)';
                break;
            case 'leave':
                element.style.transform = 'translateY(0) scale(1)';
                element.style.boxShadow = '';
                break;
            case 'click':
                element.style.transform = 'translateY(0) scale(0.95)';
                break;
            case 'release':
                element.style.transform = 'translateY(-2px) scale(1.05)';
                break;
        }
    }

    setupClickAnimations() {
        // Mobile menu toggle
        const menuToggle = document.querySelector('.navbar__toggle');
        const mobileMenu  = document.querySelector('.navbar__mobile');
        const menuOverlay = document.querySelector('.navbar__overlay');

        if (menuToggle) {
            menuToggle.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleMobileMenu();
            });
        }

        if (menuOverlay) {
            menuOverlay.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        }

        // Back to top button
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            backToTop.addEventListener('click', (e) => {
                e.preventDefault();
                this.scrollToTop();
            });
        }
    }

    toggleMobileMenu() {
        const mobileMenu = document.querySelector('.navbar__mobile');
        const menuToggle = document.querySelector('.navbar__toggle');
        const hamburger = document.querySelector('.hamburger');
        
        if (mobileMenu.classList.contains('navbar__mobile--active')) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        const mobileMenu = document.querySelector('.navbar__mobile');
        const hamburger = document.querySelector('.hamburger');
        const overlay = document.querySelector('.navbar__overlay');
        
        mobileMenu.classList.add('navbar__mobile--active');
        hamburger.classList.add('hamburger--active');
        overlay.style.display = 'block';
        
        // Animate overlay
        setTimeout(() => {
            overlay.style.opacity = '1';
        }, 10);
        
        // Animate menu items with stagger
        const menuItems = mobileMenu.querySelectorAll('.nav-item, .mobile-dropdown, .navbar__mobile-actions');
        menuItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(50px)';
            item.style.transition = `all 0.4s ease-out ${index * 100}ms`;
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 100 + (index * 100));
        });
    }

    closeMobileMenu() {
        const mobileMenu = document.querySelector('.navbar__mobile');
        const hamburger = document.querySelector('.hamburger');
        const overlay = document.querySelector('.navbar__overlay');
        
        mobileMenu.classList.remove('navbar__mobile--active');
        hamburger.classList.remove('hamburger--active');
        overlay.style.opacity = '0';
        
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 400);
    }

    scrollToTop() {
        const scrollDuration = 800;
        const scrollStep = -window.scrollY / (scrollDuration / 15);
        
        const scrollInterval = setInterval(() => {
            if (window.scrollY !== 0) {
                window.scrollBy(0, scrollStep);
            } else {
                clearInterval(scrollInterval);
            }
        }, 15);
    }

    setupNavbarScroll() {
        let lastScrollY = window.scrollY;
        const navbar = document.querySelector('.navbar');
        const infoBar = document.querySelector('.info-bar');

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // Navbar background on scroll
            if (currentScrollY > 50) {
                navbar.classList.add('navbar--scrolled');
                if (infoBar) {
                    infoBar.classList.add('info-bar--hidden');
                }
            } else {
                navbar.classList.remove('navbar--scrolled');
                if (infoBar) {
                    infoBar.classList.remove('info-bar--hidden');
                }
            }

            // Navbar hide/show on scroll direction
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down
                navbar.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollY = currentScrollY;
        });
    }

    // Parallax effect for hero section
    setupParallax() {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }

    // Counter animation for stats
    animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + '+';
            }
        }, 16);
    }

    // Typewriter effect
    typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
}
 
const scrollAnimations = new ScrollAnimations();
 
export default scrollAnimations;