import { productDetails } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    // Khởi tạo icon Lucide
    lucide.createIcons();

    // 1. Xử lý Modal Sản phẩm
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
        // Thêm một chút delay để CSS transition có thời gian chạy
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

    // Đóng modal khi click ra vùng nền tối
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Cuộn xuống form khi ấn nút trong Modal
    modalCTA.addEventListener('click', (e) => {
        closeModal();
    });

    // 2. Xử lý Cuộn trang mượt (Smooth Scroll)
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

    // 3. Hiệu ứng xuất hiện khi cuộn trang (Fade-in On Scroll)
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // 4. Kiểm tra Form (Validation)
    const form = document.getElementById('consultation-form');
    const phoneInput = document.getElementById('phone');
    
    form.addEventListener('submit', function(e) {
        const phoneRegex = new RegExp('^[0-9]{10,11}$');
        if (!phoneRegex.test(phoneInput.value)) {
            e.preventDefault();
            alert('Vui lòng nhập số điện thoại hợp lệ (10-11 chữ số).');
            phoneInput.focus();
            return;
        }
        
        // Mô phỏng gửi form thành công
        e.preventDefault();
        alert('Cảm ơn bạn! Thông tin đã được ghi nhận. Chúng tôi sẽ liên hệ sớm.');
        form.reset();
    });
});
