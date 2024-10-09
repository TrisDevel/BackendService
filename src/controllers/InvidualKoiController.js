const IndividualKoiFish = require('../models/individualKoi');
const jwt = require('jsonwebtoken');

// Tạo mới một cá Koi
const createKoiFish = async (req, res) => {
  const { category_id, name, origin, gender, age, size, breed, description, price, certificate } = req.body;
  const imageFile = req.file; // File hình ảnh từ client (nếu có)

  try {
    // Kiểm tra xem có file ảnh hay không
    if (!imageFile) {
      return res.status(400).json({ message: 'Hình ảnh là bắt buộc' });
    }

    // Giả sử bạn đã có logic upload ảnh lên Firebase và nhận được URL của ảnh
    const imageUrl = await uploadImageToFirebase(imageFile);

    // Tạo cá Koi mới
    const newKoiFish = await IndividualKoiFish.create({
      category_id,
      name,
      origin,
      gender,
      age,
      size,
      breed,
      description,
      price,
      image: imageUrl,  // URL ảnh từ Firebase
      certificate,
    });

    res.status(201).json({ message: 'Tạo cá Koi thành công', koiFish: newKoiFish });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Tạo cá Koi thất bại' });
  }
};

// Lấy thông tin một cá Koi dựa trên ID
const getKoiFishById = async (req, res) => {
  const { id } = req.params;

  try {
    const koiFish = await IndividualKoiFish.findByPk(id);

    if (!koiFish) {
      return res.status(404).json({ message: 'Cá Koi không tồn tại' });
    }

    res.status(200).json(koiFish);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lấy thông tin cá Koi thất bại' });
  }
};

// Lấy danh sách tất cả các cá Koi
const getAllKoiFish = async (req, res) => {
  try {
    const koiFishList = await IndividualKoiFish.findAll();

    res.status(200).json(koiFishList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lấy danh sách cá Koi thất bại' });
  }
};

// Cập nhật thông tin một cá Koi dựa trên ID
const updateKoiFish = async (req, res) => {
  const { id } = req.params;
  const { category_id, name, origin, gender, age, size, breed, description, price, certificate } = req.body;
  const imageFile = req.file; // File hình ảnh từ client (nếu có)

  try {
    const koiFish = await IndividualKoiFish.findByPk(id);

    if (!koiFish) {
      return res.status(404).json({ message: 'Cá Koi không tồn tại' });
    }

    // Nếu có file ảnh mới, upload ảnh và cập nhật URL
    let imageUrl = koiFish.image;
    if (imageFile) {
      imageUrl = await uploadImageToFirebase(imageFile);
    }

    // Cập nhật thông tin cá Koi
    await koiFish.update({
      category_id,
      name,
      origin,
      gender,
      age,
      size,
      breed,
      description,
      price,
      image: imageUrl,
      certificate,
    });

    res.status(200).json({ message: 'Cập nhật cá Koi thành công', koiFish });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Cập nhật cá Koi thất bại' });
  }
};

// Xóa một cá Koi dựa trên ID
const deleteKoiFish = async (req, res) => {
  const { id } = req.params;

  try {
    const koiFish = await IndividualKoiFish.findByPk(id);

    if (!koiFish) {
      return res.status(404).json({ message: 'Cá Koi không tồn tại' });
    }

    await koiFish.destroy();
    res.status(200).json({ message: 'Xóa cá Koi thành công' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Xóa cá Koi thất bại' });
  }
};

module.exports = {
  createKoiFish,
  getKoiFishById,
  getAllKoiFish,
  updateKoiFish,
  deleteKoiFish,
};
