// Testing Environment - JS 
/* Updated JS code here */

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


// GIVING MODAL FUNCTIONALITY

/* ADD THIS TO YOUR JAVASCRIPT FILE */

// Scripture data for rotation
const givingScriptures = [
  {
    text: "For God loves a cheerful giver.",
    reference: "2 Corinthians 9:7",
  },
  {
    text: "It is more blessed to give than to receive.",
    reference: "Acts 20:35",
  },
  {
    text: "Whoever is generous to the poor lends to the Lord, and he will repay him for his deed.",
    reference: "Proverbs 19:17",
  },
  {
    text: "No one has ever become poor by giving.",
    reference: "Anne Frank",
  },
  {
    text: "The purpose of life is not to be happy. It is to be useful, to be honorable, to be compassionate.",
    reference: "Ralph Waldo Emerson",
  },
  {
    text: "Let us not become weary in doing good, for at the proper time we will reap a harvest if we do not give up.",
    reference: "Galatians 6:9",
  },
]

let currentScriptureIndex = 0
let projectScriptureInterval
let bankingScriptureInterval
let selectedProject = "Musical Equipment Acquisition"

// Open Giving Modal
function openGivingModal() {
  const modal = document.getElementById("givingModal")
  modal.classList.add("active")
  startScriptureRotation()
  document.body.style.overflow = "hidden"
}

// Close Giving Modal
function closeGivingModal() {
  const modal = document.getElementById("givingModal")
  modal.classList.remove("active")
  stopScriptureRotation()
  document.body.style.overflow = "auto"
}

// Switch between tabs
function switchGivingTab(tabName) {
  // Hide all tabs
  const tabs = document.querySelectorAll(".giving-tab-content")
  tabs.forEach((tab) => tab.classList.remove("active"))

  // Remove active class from all buttons
  const buttons = document.querySelectorAll(".giving-tab-btn")
  buttons.forEach((btn) => btn.classList.remove("active"))

  // Show selected tab
  const selectedTab = document.getElementById(tabName + "-tab")
  if (selectedTab) {
    selectedTab.classList.add("active")
  }

  // Add active class to clicked button
  event.target.classList.add("active")
}

// Select project and switch to banking tab
function selectProjectAndSwitch(projectName) {
  selectedProject = projectName
  document.getElementById("selectedProjectName").textContent = projectName
  switchGivingTab("banking")
}

// Start scripture rotation
function startScriptureRotation() {
  // Rotate scriptures in projects tab
  updateProjectScripture()
  projectScriptureInterval = setInterval(updateProjectScripture, 4000)

  // Rotate scriptures in banking tab
  updateBankingScripture()
  bankingScriptureInterval = setInterval(updateBankingScripture, 4000)
}

// Stop scripture rotation
function stopScriptureRotation() {
  clearInterval(projectScriptureInterval)
  clearInterval(bankingScriptureInterval)
}

// Update project scripture display
function updateProjectScripture() {
  const scripture = givingScriptures[currentScriptureIndex]
  document.getElementById("projectScripture").textContent = `"${scripture.text}"`
  document.getElementById("projectScriptureRef").textContent = scripture.reference
  currentScriptureIndex = (currentScriptureIndex + 1) % givingScriptures.length
}

// Update banking scripture display
function updateBankingScripture() {
  const randomIndex = Math.floor(Math.random() * givingScriptures.length)
  const scripture = givingScriptures[randomIndex]
  document.getElementById("bankingScripture").textContent = `"${scripture.text}"`
  document.getElementById("bankingScriptureRef").textContent = scripture.reference
}

// Handle giving form submission
function handleGivingSubmit(event) {
  event.preventDefault()

  const giverName = document.getElementById("giverName").value
  const giverEmail = document.getElementById("giverEmail").value
  const giverPhone = document.getElementById("giverPhone").value
  const giverAmount = document.getElementById("giverAmount").value

  console.log("[v0] Giving Form Submitted:", {
    name: giverName,
    email: giverEmail,
    phone: giverPhone,
    amount: giverAmount,
    project: selectedProject,
  })

  // Show success message
  alert(
    `Thank you, ${giverName}! Your generous donation of ${giverAmount} for ${selectedProject} will be recorded upon confirmation. We appreciate you and God bless you greatly.`,
  )

  // Reset form
  event.target.reset()
  closeGivingModal()
}

// Close modal when clicking outside
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("givingModal")

  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeGivingModal()
      }
    })
  }

  // Close modal with Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeGivingModal()
    }
  })
})