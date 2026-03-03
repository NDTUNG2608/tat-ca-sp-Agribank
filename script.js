// Import dữ liệu chi tiết sản phẩm từ file data.js
import { productDetails } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Khởi tạo Icons Lucide (cho các biểu tượng tim mạch, bệnh viện...)
    if (window.lucide) {
        window.lucide.createIcons();
    }

    // 2. Khai báo các phần tử Modal
    const modal = document.getElementById('product-modal');
    const modalCloseBtn = document.getElementById('modal-close');
    const modalTriggers = document.querySelectorAll('[data-modal-trigger]');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalCTA = document.querySelector('.modal-cta');

    // 3. Khai báo các phần tử Form
    const form = document.getElementById('consultation-form');
    const phoneInput = document.getElementById('phone');
    const selectNeed = document.getElementById('need'); // Ô chọn nhu cầu

    // --- HÀM XỬ LÝ MODAL ---
    function openModal(productId) {
        const details = productDetails[productId];
        if (!details) return;

        // Cập nhật nội dung Modal từ data.js
        modalImage.src = details.imageSrc;
        modalImage.alt = details.title;
        modalTitle.textContent = details.title;
        modalDescription.innerHTML = details.description;

        // Lưu ID sản phẩm vào nút CTA trong modal để dùng cho hàm auto-select
        modalCTA.setAttribute('data-target-id', productId);

        // Hiển thị modal với hiệu ứng
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

    // --- HÀM TỰ ĐỘNG CHỌN NHU CẦU (AUTO-SELECT) ---
    function autoSelectInForm(productId) {
        if (!selectNeed) return;

        // Khớp ID từ nút bấm với giá trị <option> trong HTML
        const valueMap = {
            'vay-bac-si': 'Vay tín chấp Bác sĩ',
            'vay-nvyt': 'Vay tiêu dùng NVYT',
            'dv-benh-vien': 'Dịch vụ Bệnh viện'
        };

        if (valueMap[productId]) {
            selectNeed.value = valueMap[productId];
            
            // Hiệu ứng Highlight ô Select để khách chú ý
            selectNeed.style.borderColor = '#C09440';
            selectNeed.style.backgroundColor = '#FFFBEB';
            setTimeout(() => {
                selectNeed.style.borderColor = '#d1d5db';
                selectNeed.style.backgroundColor = '#white';
            }, 2000);
        }
    }

    // --- GẮN SỰ KIỆN (EVENT LISTENERS) ---

    // Khi bấm "Xem chi tiết" ở các thẻ sản phẩm
    modalTriggers.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.modalTrigger;
            openModal(productId);
        });
    });

    // Khi bấm nút "Đăng ký tư vấn" ngay TRONG Modal
    modalCTA.addEventListener('click', (e) => {
        const productId = modalCTA.getAttribute('data-target-id');
        autoSelectInForm(productId); // Tự động chọn mục trong form
        closeModal(); // Đóng modal
        // Cuộn mượt xuống khu vực Form
        document.getElementById('contact-form').scrollIntoView({ behavior: 'smooth' });
    });

    // Đóng modal khi bấm nút X hoặc bấm ra ngoài màn hình
    modalCloseBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Cuộn mượt cho tất cả liên kết anchor (có dấu #)
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

    // Kiểm tra tính hợp lệ của Form trước khi gửi
    if (form) {
        form.addEventListener('submit', function(e) {
            // Kiểm tra số điện thoại (10-11 số)
            const phoneRegex = /^[0-9]{10,11}$/;
            if (!phoneRegex.test(phoneInput.value)) {
                e.preventDefault();
                alert('Bác sĩ vui lòng nhập số điện thoại hợp lệ để chúng tôi tiện liên lạc.');
                phoneInput.focus();
                return;
            }

            // Hiệu ứng gửi thành công
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerText = 'ĐANG GỬI YÊU CẦU...';
        });
    }
});
