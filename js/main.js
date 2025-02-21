// DOM Elements
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const sections = document.querySelectorAll('section');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectsGrid = document.querySelector('.projects-grid');

// Projects Data
const projects = [
    {
        title: "AI Image Recognition",
        category: "ai",
        image: "assets/projects/raj2.webp",
        description: "Deep learning model for image classification using TensorFlow",
        github: "https://github.com/RajkishorRauniyar",
        demo: "#"
    },
    {
        title: "E-Commerce Platform",
        category: "web",
        image: "assets/projects/raj3.jpeg",
        description: "Full-stack e-commerce solution with React and Node.js",
        github: "https://github.com/RajkishorRauniyar",
        demo: "#"
    },
    {
        title: "Fitness Tracker App",
        category: "mobile",
        image: "assets/projects/raj4.jpeg",
        description: "Flutter-based mobile app for fitness tracking",
        github: "https://github.com/RajkishorRauniyar",
        playstore: "#"
    }
    // Add more projects as needed
];

// Testimonials Data
const testimonials = [
    {
        name: "John Doe",
        role: "CEO, Tech Corp",
        image: "assets/raj5.jpeg",
        text: "Rajkishor delivered exceptional results for our AI project. His expertise and dedication were invaluable."
    },
    // Add more testimonials
];

// Mobile Menu Toggle
menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
        menuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// Intersection Observer for section animations
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => sectionObserver.observe(section));

// Project Filtering
function filterProjects(category) {
    const filteredProjects = category === 'all' 
        ? projects 
        : projects.filter(project => project.category === category);
    
    renderProjects(filteredProjects);
}

function renderProjects(projectsToRender) {
    projectsGrid.innerHTML = projectsToRender.map(project => `
        <div class="project-card" data-category="${project.category}">
            <img src="${project.image}" alt="${project.title}">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-links">
                    <a href="${project.github}" target="_blank">
                        <i class="fab fa-github"></i> GitHub
                    </a>
                    ${project.demo ? `
                        <a href="${project.demo}" target="_blank">
                            <i class="fas fa-external-link-alt"></i> Live Demo
                        </a>
                    ` : ''}
                    ${project.playstore ? `
                        <a href="${project.playstore}" target="_blank">
                            <i class="fab fa-google-play"></i> Play Store
                        </a>
                    ` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// Initialize Projects
renderProjects(projects);

// Project Filter Button Click Handlers
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterProjects(btn.dataset.filter);
    });
});

// Testimonials Slider
function initTestimonialsSlider() {
    const slider = document.querySelector('.testimonials-slider');
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    let isAnimating = false;

    function updateSlider(index) {
        if (isAnimating) return;
        isAnimating = true;

        // Remove active class from all cards and dots
        cards.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current card and dot
        cards[index].classList.add('active');
        dots[index].classList.add('active');

        // Update cards position
        cards.forEach((card, i) => {
            if (i === index) {
                card.style.transform = 'translateX(0)';
                card.style.opacity = '1';
                card.style.visibility = 'visible';
            } else {
                const direction = i < index ? -100 : 100;
                card.style.transform = `translateX(${direction}%)`;
                card.style.opacity = '0';
                card.style.visibility = 'hidden';
            }
        });

        // Reset animation flag after transition
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    function nextSlide() {
        if (isAnimating) return;
        currentIndex = (currentIndex + 1) % cards.length;
        updateSlider(currentIndex);
    }

    function prevSlide() {
        if (isAnimating) return;
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateSlider(currentIndex);
    }

    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (isAnimating || index === currentIndex) return;
            currentIndex = index;
            updateSlider(currentIndex);
        });
    });

    // Auto-advance slides every 5 seconds
    let autoSlide = setInterval(nextSlide, 5000);

    // Pause auto-advance on hover
    slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
    slider.addEventListener('mouseleave', () => {
        autoSlide = setInterval(nextSlide, 5000);
    });

    // Initialize first slide
    updateSlider(currentIndex);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTestimonialsSlider();
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    
    try {
        // Replace with your actual form submission endpoint
        const response = await fetch('/api/contact', {
            method: 'POST',
            body: formData
        });
        
        if (response.ok) {
            alert('Message sent successfully!');
            contactForm.reset();
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        alert('Failed to send message. Please try again later.');
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Skill bars animation
function animateSkillBars() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                card.classList.add('animate');
                
                const progressBar = card.querySelector('.skill-progress');
                const progress = progressBar.getAttribute('data-progress');
                progressBar.style.width = `${progress}%`;
                
                // Unobserve after animation
                observer.unobserve(card);
            }
        });
    }, {
        threshold: 0.2
    });

    skillCards.forEach(card => {
        observer.observe(card);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateSkillBars();
}); 