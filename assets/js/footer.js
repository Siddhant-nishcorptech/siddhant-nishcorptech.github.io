document.addEventListener('DOMContentLoaded', () => {
  const footer = document.getElementById('footer');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        footer.classList.add('visible-footer');
      } else {
        footer.classList.remove('visible-footer');
      }
    });
  }, {
    threshold: 0.6 // Only when most of the footer is visible
  });

  observer.observe(footer);
});
