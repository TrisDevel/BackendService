const admin = require('firebase-admin'); // Đảm bảo đã khởi tạo Firebase Admin SDK
const Customer = require("../models/Customer");

exports.loginWithGoogle = async (req, res) => {
  const { idToken } = req.body;

  // Kiểm tra xem idToken có được gửi lên từ frontend không
  if (!idToken) {
    return res.status(400).json({ message: "idToken is required" });
  }

  try {
    // Xác minh idToken qua Firebase
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const google_uid = decodedToken.uid;
    const email = decodedToken.email;
    const name = decodedToken.name || "Anonymous";

    // Kiểm tra xem Firebase có trả về email không
    if (!email) {
      return res.status(400).json({ message: "Email not provided by Google" });
    }

    // Tìm kiếm khách hàng qua google_uid trong cơ sở dữ liệu
    let customer = await Customer.findOne({ where: { google_uid } });

    // Nếu không có khách hàng, tạo mới
    if (!customer) {
      customer = await Customer.create({
        google_uid: google_uid,
        email: email,
        name: name,
      });
    }

    // Trả về thông tin khách hàng và xác nhận đăng nhập thành công
    res.status(200).json({
      message: 'Đăng nhập thành công',
      customer: {
        id: customer.id,
        name: customer.name,
        email: customer.email,
      },
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({ message: "Xác thực thất bại", error: error.message });
  }
};
