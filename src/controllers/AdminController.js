const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const JWT_SECRET = process.env.JWT_SECRET_KEY;
// Đăng ký admin (không mã hóa mật khẩu)
const registerAdmin = async (req, res) => {
  const { username, password, email } = req.body;
  
  try {
    // Kiểm tra admin đã tồn tại chưa
    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Admin đã tồn tại' });
    }

    // Tạo admin mới (không mã hóa mật khẩu)
    const newAdmin = await Admin.create({
      username,
      password,  // Lưu mật khẩu dạng plain text (không mã hóa)
      email,
    });

    res.status(201).json({ message: 'Đăng ký thành công', admin: newAdmin });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Đăng ký thất bại' });
  }
};

// Đăng nhập admin (không kiểm tra mã hóa mật khẩu)
const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Tìm admin theo email
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(404).json({ message: 'Admin không tồn tại' });
    }

    // So sánh mật khẩu (so sánh plain text)
    if (admin.password !== password) {
      return res.status(401).json({ message: 'Mật khẩu không đúng' });
    }

    // Tạo token JWT
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET_KEY,  // Thay bằng secret key thực tế
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Đăng nhập thành công', token, username: admin.username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Đăng nhập thất bại' });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
};
