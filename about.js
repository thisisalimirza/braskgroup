document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section-fade');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "50px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
}); 