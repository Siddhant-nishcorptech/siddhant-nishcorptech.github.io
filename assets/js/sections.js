document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.snap-section');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      } else {
        entry.target.classList.remove('is-visible');
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(section => observer.observe(section));
});