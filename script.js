function doPost(e) {
  try {
    // 1. Lấy dữ liệu từ form trên website truyền về
    var fullName = e.parameter.fullName;
    var hospitalName = e.parameter.hospitalName;
    var phone = e.parameter.phone;
    var service = e.parameter.service;
    
    // 2. CẤU HÌNH GỬI EMAIL (Thay địa chỉ email của bạn vào đây)
    var emailTo = "ndtung2608@gmail.com"; 
    var subject = "🎉 [Agribank CN5] Khách hàng mới đăng ký tư vấn Y Tế";
    
    // 3. Soạn nội dung thư
    var body = "Chào bạn,\n\n" +
               "Có một khách hàng vừa để lại thông tin trên Website Giải pháp Y tế.\n\n" +
               "📌 THÔNG TIN CHI TIẾT:\n" +
               "- Họ và Tên / Chức vụ: " + fullName + "\n" +
               "- Bệnh viện / Cơ sở Y tế: " + hospitalName + "\n" +
               "- Số điện thoại: " + phone + "\n" +
               "- Dịch vụ quan tâm: " + service + "\n" +
               "- Thời gian đăng ký: " + new Date().toLocaleString("vi-VN") + "\n\n" +
               "Bạn hãy nhanh chóng gọi điện liên hệ hỗ trợ khách hàng nhé!\n\n" +
               "--- Hệ thống tự động báo cáo ---";
               
    // 4. Lệnh thực thi gửi mail
    MailApp.sendEmail(emailTo, subject, body);
    
    // 5. Báo cáo về cho website biết là đã gửi thành công
    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
    
  } catch (error) {
    // Nếu có lỗi thì báo lỗi về web
    return ContentService.createTextOutput("Error: " + error.toString()).setMimeType(ContentService.MimeType.TEXT);
  }
}
