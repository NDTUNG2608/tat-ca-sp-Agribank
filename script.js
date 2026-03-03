// script.js
document.addEventListener('DOMContentLoaded', () => {
    
    // Đổ dữ liệu cho phần Kiosk
    const kioskContainer = document.getElementById('kiosk-features');
    if (kioskContainer) {
        siteData.kioskFeatures.forEach(feature => {
            kioskContainer.innerHTML += `
                <div class="bg-white p-8 rounded-xl shadow-sm border-t-4 border-agri feature-card">
                    <i class="${feature.icon} text-4xl text-agri mb-4"></i>
                    <h3 class="text-xl font-bold mb-2">${feature.title}</h3>
                    <p class="text-gray-600">${feature.desc}</p>
                </div>
            `;
        });
    }

    // Đổ dữ liệu cho Vay Tín Chấp
    const unsecuredContainer = document.getElementById('unsecured-loans');
    if (unsecuredContainer) {
        siteData.loans.unsecured.forEach(item => {
            unsecuredContainer.innerHTML += `<li><i class="fas fa-check-circle mr-2 text-yellow-400"></i> ${item}</li>`;
        });
    }

    // Đổ dữ liệu cho Vay Thế Chấp
    const securedContainer = document.getElementById('secured-loans');
    if (securedContainer) {
        siteData.loans.secured.forEach(item => {
            securedContainer.innerHTML += `<li><i class="fas fa-check-circle mr-2 text-yellow-400"></i> ${item}</li>`;
        });
    }
});
