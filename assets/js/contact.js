const GOOGLE_APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzKsTb1dTpamDccaqiOZNZ7zo2BrtQV8gYKf0XCBGfg18CeMSfIyLkmc1TbA4nNVXWOXw/exec';

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const submitButton = contactForm.querySelector('.submit-btn');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    formMessage.style.display = 'none';

    const formData = new FormData(contactForm);
    const data = {};
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }

    data.timestamp = new Date().toISOString();

    try {
        const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        displayMessage('Thank you! Your message has been sent successfully. We\'ll get back to you soon.', 'success');
        contactForm.reset();

    } catch (error) {
        console.error('Error submitting form:', error);
        displayMessage('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    }
});

function displayMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = 'form-message ' + type;
    formMessage.style.display = 'block';
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
