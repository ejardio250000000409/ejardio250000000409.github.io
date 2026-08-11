/* ==========================================================================
   PORTFOLIO INTERACTION & THEME LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    /* ----------------------------------------------------------------------
       1. LIGHT & DARK THEME TOGGLE
       ---------------------------------------------------------------------- */
    const themeToggleBtns = document.querySelectorAll('.theme-toggle');
    const htmlElement = document.documentElement;

    // Check localStorage or system preference for initial theme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        htmlElement.setAttribute('data-theme', savedTheme);
    } else if (prefersDark) {
        htmlElement.setAttribute('data-theme', 'dark');
    } else {
        htmlElement.setAttribute('data-theme', 'light');
    }

    // Toggle theme function across all theme toggle buttons
    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    });

    /* ----------------------------------------------------------------------
       2. MOBILE NAVIGATION OVERLAY TOGGLE
       ---------------------------------------------------------------------- */
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const closeBtn = document.getElementById('closeBtn');
    const navOverlay = document.getElementById('navOverlay');
    const navLinkItems = document.querySelectorAll('.nav-link-item');

    function toggleMenu(isOpen) {
        if (!navOverlay) return;
        if (isOpen) {
            navOverlay.classList.add('active');
            if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
        } else {
            navOverlay.classList.remove('active');
            if (hamburgerBtn) hamburgerBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', () => toggleMenu(true));
    if (closeBtn) closeBtn.addEventListener('click', () => toggleMenu(false));

    navLinkItems.forEach(item => {
        item.addEventListener('click', () => toggleMenu(false));
    });

    /* ----------------------------------------------------------------------
       3. INTERSECTION OBSERVER FOR SCROLL REVEAL ANIMATIONS
       ---------------------------------------------------------------------- */
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            threshold: 0.05,
            rootMargin: '0px 0px -20px 0px'
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        // Fallback for older browsers
        revealElements.forEach(element => {
            element.classList.add('active');
        });
    }
});
