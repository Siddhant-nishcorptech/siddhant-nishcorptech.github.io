import './navbar.js';
import './sections.js';
import './footer.js';
document.addEventListener('DOMContentLoaded', () => {
  const footer = document.getElementById('footer');

  function checkIfScrolledToBottom() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const bodyHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= bodyHeight - 10) {
      footer.classList.add('opacity-100');
    } else {
      footer.classList.remove('opacity-100');
    }
  }

  window.addEventListener('scroll', checkIfScrolledToBottom);
});
