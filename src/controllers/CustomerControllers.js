const Customer = require("../models/customer");
const bcrypt = require("bcryptjs"); // Dùng để so sánh mật khẩu
const jwt = require("jsonwebtoken"); // Dùng để tạo JWT

// Secret key để mã hóa JWT (Bạn nên lưu secret này vào biến môi trường)
const JWT_SECRET = process.env.JWT_SECRET_KEY;

exports.loginCustomer = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Tìm khách hàng qua email
    const customer = await Customer.findOne({ where: { email } });

    // Nếu không tìm thấy khách hàng
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    // So sánh trực tiếp mật khẩu người dùng nhập và mật khẩu trong database
    if (password !== customer.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Tạo JWT token
    const token = jwt.sign(
      { id: customer.id, email: customer.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      code: 200,
      data: {
        token: token,
        username: customer.username, // trả về username
        userId: customer.id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Tạo mới khách hàng
exports.createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json(customer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Lấy danh sách tất cả khách hàng
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy thông tin chi tiết một khách hàng
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cập nhật thông tin khách hàng
exports.updateCustomer = async (req, res) => {
  try {
    const [updated] = await Customer.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedCustomer = await Customer.findByPk(req.params.id);
      res.status(200).json(updatedCustomer);
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Xóa khách hàng
exports.deleteCustomer = async (req, res) => {
  try {
    const deleted = await Customer.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.registerCustomer = async (req, res) => {
  const { name, email, phone_number, username, password } = req.body;

  // Kiểm tra xem có trường nào là null không
  if (!name || !email || !phone_number || !username || !password) {
    return res
      .status(400)
      .json({ message: "Vui lòng cung cấp đầy đủ thông tin." });
  }

  

  try {
    // Kiểm tra xem email đã tồn tại chưa
    const existingCustomerByEmail = await Customer.findOne({ where: { email } });
    if (existingCustomerByEmail) {
      return res.status(400).json({ message: "Email đã tồn tại." });
    }

    // Kiểm tra xem username đã tồn tại chưa
    const existingCustomerByUsername = await Customer.findOne({ where: { username } });
    if (existingCustomerByUsername) {
      return res.status(400).json({ message: "Username đã tồn tại." });
    }

    // Tạo khách hàng mới
    const newCustomer = await Customer.create({
      name,
      email,
      phone_number,
      username,
      password, // Lưu trực tiếp nếu không mã hóa mật khẩu
    });

    // Trả về thông tin khách hàng mới tạo
    res.status(201).json(newCustomer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
