import React from "react";
import "./assets/css/contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      {/* LEFT - FORM + THÔNG TIN */}
      <div className="contact-left">
        <h2>Liên hệ với chúng tôi</h2>
        <p>Nếu bạn có bất kỳ câu hỏi nào, hãy gửi thông tin ngay tại đây.</p>

        <form className="contact-form">
          <input type="text" placeholder="Họ và tên" required />
          <input type="email" placeholder="Email" required />
          <input type="text" placeholder="Số điện thoại" required />
          <textarea placeholder="Nội dung cần hỗ trợ..." rows="5"></textarea>

          <button type="submit">Gửi liên hệ</button>
        </form>
      </div>

      {/* RIGHT - GOOGLE MAP */}
      <div className="contact-right">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.57067869006!2d106.66653597585441!3d10.765834759410702!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f23a489ff0f%3A0x5280a6f3b78d9c5!2zMzMgVsSpbmggVmnhu4d0LCBRdeG6o25nIDEsIFF14bqtbiAxMCwgSG8gQ2hpIE1pbmggQ2l0eQ!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
