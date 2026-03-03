import { productDetails } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    const modal = document.getElementById('product-modal');
    const modalContent = document.getElementById('modal-content');
    const modalCloseBtn = document.getElementById('modal-close');
    const modalTriggers = document.querySelectorAll('[data-modal-trigger]');

    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalCTA = document.querySelector('.modal-cta');

    function openModal(productId) {
        const details = productDetails[productId];
        if (!details) return;

        modalImage.src = details.imageSrc;
        modalImage.alt = details.title;
        modalTitle.textContent = details.title;
        modalDescription.innerHTML = details.description;

        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.add('visible');
        }, 10);
    }

    function closeModal() {
        modal.classList.remove('visible');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }
    
    modalTriggers.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.modalTrigger;
            openModal(productId);
        });
    });

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    modalCTA.addEventListener('click', (e) => {
        closeModal();
    });


    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });


    const form = document.getElementById('consultation-form');
    const phoneInput = document.getElementById('phone');
    form.addEventListener('submit', function(e) {
        const phoneRegex = new RegExp('^[0-9]{10,11}$');
        if (!phoneRegex.test(phoneInput.value)) {
            e.preventDefault();
            alert('Vui lòng nhập số điện thoại hợp lệ (10-11 chữ số).');
            phoneInput.focus();
        }
    });
});
