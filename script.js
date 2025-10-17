// Wait for DOM content to load
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // Header Scroll Effect
    const header = document.getElementById('header');
    let lastScrollTop = 0;
    if (header) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
            lastScrollTop = scrollTop;
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target && header) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scripture Rotation
    const verses = [
        { verse: "How good and pleasant it is when God's people live together in unity!", reference: "Psalm 133:1" },
        { verse: "There is one body and one Spirit, just as you were called to one hope when you were called.", reference: "Ephesians 4:4" },
        { verse: "All of you together are Christ's body, and each of you is a part of it.", reference: "1 Corinthians 12:27" },
        { verse: "Make every effort to keep the unity of the Spirit through the bond of peace.", reference: "Ephesians 4:3" },
        { verse: "May they be brought to complete unity. Then the world will know that you sent me and have loved them even as you have loved me.", reference: "John 17:23" },
        { verse: "Be completely humble and gentle; be patient, bearing with one another in love.", reference: "Ephesians 4:2" },
        { verse: "Above all, clothe yourselves with love, which binds us all together in perfect harmony.", reference: "Colossians 3:14" },
        { verse: "Just as a body, though one, has many parts, but all its many parts form one body, so it is with Christ.", reference: "1 Corinthians 12:12" },
        { verse: "From him the whole body, joined and held together by every supporting ligament, grows and builds itself up in love.", reference: "Ephesians 4:16" },
        { verse: "I appeal to you, brothers and sisters, in the name of our Lord Jesus Christ, that all of you agree with one another in what you say and that there be no divisions among you, but that you be perfectly united in mind and thought.", reference: "1 Corinthians 1:10" },
        { verse: "My prayer is not for them alone. I pray also for those who will believe in me through their message, that all of them may be one, Father, just as you are in me and I am in you.", reference: "John 17:20-21" },
        { verse: "How wonderful and pleasant it is when brothers live together in harmony!", reference: "Psalm 133:1 (NLT)" }
    ];

    let currentVerseIndex = 0;
    const scriptureVerse = document.getElementById('currentVerse');
    const scriptureReference = document.getElementById('currentReference');

    if (scriptureVerse && scriptureReference) {
        function rotateScripture() {
            scriptureVerse.style.opacity = '0';
            scriptureReference.style.opacity = '0';
            setTimeout(() => {
                currentVerseIndex = (currentVerseIndex + 1) % verses.length;
                scriptureVerse.textContent = verses[currentVerseIndex].verse;
                scriptureReference.textContent = verses[currentVerseIndex].reference;
                scriptureVerse.style.opacity = '1';
                scriptureReference.style.opacity = '1';
            }, 500);
        }
        rotateScripture();
        setInterval(rotateScripture, 6000);
    } else {
        console.warn('Scripture elements not found. Check IDs: currentVerse, currentReference');
    }

    // Events Carousel - FIXED FOR 4 EVENTS
    let currentEventIndex = 0;
    const eventSlides = document.querySelectorAll('.event-slide');
    const totalSlides = eventSlides.length;

    function showEvent(index) {
        if (eventSlides.length > 0) {
            // Determine the correct translation percentage based on screen width
            let translatePercentage = 25; // Default for larger screens
            if (window.innerWidth <= 780) {
                translatePercentage = 25; // Each slide takes 25% width on smaller screens
            }

            // Hide all slides
            eventSlides.forEach((slide) => {
                slide.classList.remove('active');
            });
            
            // Show current slide
            eventSlides[index].classList.add('active');
            
            // Move the container to show the current slide
            const container = document.querySelector('.event-slide-container');
            if (container) {
                container.style.transform = `translateX(-${index * translatePercentage}%)`;
            }
            
            console.log('Showing event index:', index, 'with translatePercentage:', translatePercentage);
        }
    }

    function changeEvent(step) {
        currentEventIndex = (currentEventIndex + step + totalSlides) % totalSlides;
        showEvent(currentEventIndex);
    }

    // Make changeEvent function global for onclick handlers
    window.changeEvent = changeEvent;

    if (eventSlides.length > 0) {
        showEvent(currentEventIndex); // Initial display
        
        // Auto-advance every 5 seconds
        setInterval(() => {
            changeEvent(1);
        }, 5000);

        // Re-evaluate carousel display on window resize
        window.addEventListener('resize', () => {
            showEvent(currentEventIndex); // Ensure correct positioning after resize
        });
    }

    // Intersection Observer for Fade-in Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            const submitButton = contactForm.querySelector('.submit-button');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            setTimeout(() => {
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Social Media Link Handler
    document.querySelectorAll('.social-icon').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#' || href.includes('example.com')) {
                e.preventDefault();
                console.error('Unconfigured social media link clicked:', link.getAttribute('aria-label'));
                alert('This social media link is not configured yet. Please contact the administrator.');
            } else {
                console.log('Social media link clicked:', href);
            }
        });
    });

    // Fellowship Card Hover Effects
    document.querySelectorAll('.fellowship-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Logo Animation on Load
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.animation = 'fadeInUp 1s ease';
    }
});










