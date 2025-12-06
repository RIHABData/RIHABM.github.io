// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Ensure hero section is visible immediately
document.addEventListener('DOMContentLoaded', () => {
    const hero = document.getElementById('hero');
    if (hero) {
        hero.classList.add('animate');
    }
});

// Animate progress bars when skills section is visible
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress');
            progressBars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.width = bar.parentElement.previousElementSibling.style.width;
                }, index * 200);
            });
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Typing effect removed to prevent HTML rendering issues

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.getElementById('hero');
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
});

// Contact form handling with EmailJS
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simple form validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        let isValid = true;
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                input.style.borderColor = '#ddd';
            }
        });

        if (isValid) {
            // Send email using EmailJS
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // EmailJS parameters
            const serviceID = 'service_z2k01fk';
            const templateID = 'template_5ue418j';
            const publicKey = 'fRepjaWouaGgIMaOt';

            const templateParams = {
                from_name: contactForm.querySelector('input[type="text"]').value,
                from_email: contactForm.querySelector('input[type="email"]').value,
                message: contactForm.querySelector('textarea').value,
                to_name: 'Rihab Morafiq'
            };

            emailjs.send(serviceID, templateID, templateParams, publicKey)
                .then((response) => {
                    console.log('SUCCESS!', response.status, response.text);
                    alert('Thank you for your message! I\'ll get back to you soon.');
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, (error) => {
                    console.log('FAILED...', error);
                    console.log('Error details:', error.text || error);
                    alert('Sorry, there was an error sending your message. Please check the console for details.');
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                });
        }
    });
}

// Add hover effects to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Animate skill items on hover
document.querySelectorAll('.skill-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const progress = item.querySelector('.progress');
        progress.style.transform = 'scaleX(1.1)';
    });

    item.addEventListener('mouseleave', () => {
        const progress = item.querySelector('.progress');
        progress.style.transform = 'scaleX(1)';
    });
});

// Mobile menu toggle (if needed in future)
function toggleMenu() {
    const nav = document.querySelector('nav ul');
    nav.classList.toggle('active');
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// CSS for loaded state
const style = document.createElement('style');
style.textContent = `
    body {
        opacity: 0;
        transition: opacity 0.5s ease;
    }
    body.loaded {
        opacity: 1;
    }
`;
document.head.appendChild(style);
