document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Animate Hamburger
            const bars = hamburger.querySelectorAll('.bar');
            if (navLinks.classList.contains('active')) {
                bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }

    // Close Menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const bars = document.querySelectorAll('.hamburger .bar');
            if (bars.length) {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    });

    // Scroll Reveal Animation via IntersectionObserver
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    // Polyfill or fallback could go here, but IntersectionObserver is widely supported
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a:not(.btn-primary)');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100; // Offset for navbar

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // --- Research Infinite Carousel ---
    const track = document.getElementById('researchTrack');
    const prevBtn = document.getElementById('researchPrev');
    const nextBtn = document.getElementById('researchNext');

    if (track && prevBtn && nextBtn) {
        const slides = track.querySelectorAll('.carousel-slide');
        const totalSlides = slides.length;
        let currentIndex = 0;

        function getVisibleCount() {
            const width = window.innerWidth;
            if (width <= 768) return 1;
            if (width <= 992) return 2;
            return 3;
        }

        function updateCarousel() {
            const visibleCount = getVisibleCount();
            const slideWidthPercent = 100 / visibleCount;
            const offset = -(currentIndex * slideWidthPercent);
            track.style.transform = `translateX(${offset}%)`;
        }

        nextBtn.addEventListener('click', () => {
            const visibleCount = getVisibleCount();
            const maxIndex = Math.max(0, totalSlides - visibleCount);
            currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            const visibleCount = getVisibleCount();
            const maxIndex = Math.max(0, totalSlides - visibleCount);
            currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
            updateCarousel();
        });

        // Re-compute on resize 
        window.addEventListener('resize', () => {
            updateCarousel();
        });

        // Horizontal scroll / trackpad swipe to cycle cards
        const viewport = document.querySelector('.carousel-viewport');
        let isScrolling = false;

        viewport.addEventListener('wheel', (e) => {
            if (Math.abs(e.deltaX) < 10 || isScrolling) return;

            e.preventDefault();
            isScrolling = true;

            const visibleCount = getVisibleCount();
            const maxIndex = Math.max(0, totalSlides - visibleCount);

            if (e.deltaX > 0) {
                currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
            } else {
                currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
            }
            updateCarousel();

            setTimeout(() => { isScrolling = false; }, 500);
        }, { passive: false });

        updateCarousel();
    }
});
