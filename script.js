function doPost(e) {
  try {
    // Lấy dữ liệu từ form trên web truyền về
    var fullName = e.parameter.fullName;
    var hospitalName = e.parameter.hospitalName;
    var phone = e.parameter.phone;
    var service = e.parameter.service;
    
    // CẤU HÌNH GỬI EMAIL
    var emailTo = "ndtung2608@gmail.com"; // <-- THAY EMAIL CỦA BẠN VÀO ĐÂY
    var subject = "🎉 [Agribank CN5] Có khách hàng mới đăng ký tư vấn Y Tế";
    
    // Nội dung thư
    var body = "Chào bạn,\n\n" +
               "Hệ thống vừa ghi nhận một yêu cầu tư vấn mới từ Website Giải pháp Y tế.\n\n" +
               "📌 THÔNG TIN KHÁCH HÀNG:\n" +
               "- Họ và Tên / Chức vụ: " + fullName + "\n" +
               "- Bệnh viện / Cơ sở Y tế: " + hospitalName + "\n" +
               "- Số điện thoại: " + phone + "\n" +
               "- Dịch vụ quan tâm: " + service + "\n" +
               "- Thời gian đăng ký: " + new Date().toLocaleString("vi-VN") + "\n\n" +
               "Vui lòng gọi điện liên hệ hỗ trợ khách hàng trong thời gian sớm nhất!\n\n" +
               "--- Hệ thống tự động báo cáo ---";
               
    // Thực thi lệnh gửi mail
    MailApp.sendEmail(emailTo, subject, body);
    
    // Báo cho website biết là đã gửi mail thành công
    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
    
  } catch (error) {
    return ContentService.createTextOutput("Error: " + error.toString()).setMimeType(ContentService.MimeType.TEXT);
  }
}
