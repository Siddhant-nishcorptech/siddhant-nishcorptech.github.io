document.addEventListener('DOMContentLoaded', function() {
    const contactButtonDesktop = document.getElementById('contact-button');
    const contactButtonMobile = document.getElementById('mobile-contact-button');
    const footerTarget = document.getElementById('footer'); // Target the actual footer

    if (footerTarget) {
        const scrollOptions = {
            behavior: 'smooth',
            block: 'end'
        };
        if (contactButtonDesktop) {
            contactButtonDesktop.addEventListener('click', function(e) {
                e.preventDefault();
                footerTarget.scrollIntoView(scrollOptions);
            });
        } else {
            console.warn("Scroll to footer: Could not find 'contact-button' desktop.");
        }

        if (contactButtonMobile) {
            contactButtonMobile.addEventListener('click', function(e) {
                e.preventDefault();
                footerTarget.scrollIntoView(scrollOptions);
                const mobileNavLinks = document.getElementById('mobile-nav-links');
                if (mobileNavLinks && !mobileNavLinks.classList.contains('hidden')) {
                    mobileNavLinks.classList.add('hidden');
                }
            });
        } else {
            console.warn("Scroll to footer: Could not find 'mobile-contact-button'.");
        }

        document.querySelectorAll('#nav-links a[href^="#"], #mobile-nav-links a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start' 
                    });

                    if (this.closest('#mobile-nav-links')) {
                         const mobileNavLinks = document.getElementById('mobile-nav-links');
                         if (mobileNavLinks && !mobileNavLinks.classList.contains('hidden')) {
                             mobileNavLinks.classList.add('hidden');
                         }
                    }
                }
            });
        });

    } else {
        console.warn("Scroll to footer: Could not find 'footer' element. The contact button might not scroll as expected.");
    }

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileNavLinks = document.getElementById('mobile-nav-links');

    if (mobileMenuButton && mobileNavLinks) {
        mobileMenuButton.addEventListener('click', () => {
            mobileNavLinks.classList.toggle('hidden');
        });
    } else {
        console.warn("Mobile menu: Could not find 'mobile-menu-button' or 'mobile-nav-links'.");
    }
});