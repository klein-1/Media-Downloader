
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// loading animation to the button
document.querySelector('form').addEventListener('submit', function(e) {
    const button = this.querySelector('button');
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
    button.disabled = true;
});

// parallax effect
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    document.querySelectorAll('.feature-card').forEach(card => {
        const movement = 15;
        card.style.transform = `translate(${x * movement}px, ${y * movement}px)`;
    });
});

// intersection observer for fade-in animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

document.querySelectorAll('.feature-card, .step').forEach((el) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    observer.observe(el);
});
