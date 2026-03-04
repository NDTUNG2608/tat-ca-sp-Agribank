import { productDetails } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Khởi tạo Icon Lucide
    lucide.createIcons();

    // 2. Xử lý Modal hiển thị gói sản phẩm
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

    modalCTA.addEventListener('click', () => {
        closeModal();
    });

    // 3. Cuộn trang mượt
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 4. Hiệu ứng Fade-in khi cuộn chuột (ĐÂY LÀ PHẦN GIÚP NỘI DUNG HIỆN LÊN)
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };
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

    // 5. Kiểm tra Form và Gửi dữ liệu đi
    const form = document.getElementById('consultation-form');
    const phoneInput = document.getElementById('phone');
    const submitBtn = document.querySelector('.btn-submit');
    
    // GẮN LINK GOOGLE APPS SCRIPT CỦA BẠN VÀO ĐÂY (Giữa 2 dấu nháy đơn)
    const scriptURL = 'https://script.google.com/macros/s/AKfycbznQnIUbua_KatlaoE4mvI5QxjZOU7BEiKxaiPiGe_hs3ZYKP-VcDULfE_UpASq0SwZ/exec'; 

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const phoneRegex = new RegExp('^[0-9]{10,11}$');
        if (!phoneRegex.test(phoneInput.value)) {
            alert('Vui lòng nhập số điện thoại hợp lệ (10-11 chữ số).');
            phoneInput.focus();
            return;
        }
        
        const originalBtnText = submitBtn.innerText;
        submitBtn.innerText = 'Đang gửi thông tin...';
        submitBtn.disabled = true;

        const formData = new FormData();
        formData.append('fullName', document.getElementById('fullName').value);
        formData.append('hospitalName', document.getElementById('hospitalName').value);
        formData.append('phone', document.getElementById('phone').value);
        formData.append('service', document.getElementById('service').value);

        fetch(scriptURL, { method: 'POST', body: formData })
            .then(response => {
                alert('Cảm ơn bạn! Thông tin đã được ghi nhận. Chuyên viên Agribank Chi nhánh 5 sẽ liên hệ sớm.');
                form.reset(); 
                submitBtn.innerText = originalBtnText; 
                submitBtn.disabled = false;
            })
            .catch(error => {
                console.error('Lỗi!', error.message);
                alert('Có lỗi xảy ra khi gửi dữ liệu. Vui lòng thử lại sau.');
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            });
    });
});
