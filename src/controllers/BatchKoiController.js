const BatchKoiFish = require('../models/BatchKoiFish');
const multer = require('multer');
const bucket = require('../config/firebase'); // Đường dẫn tới file config Firebase của bạn

// Cấu hình multer để xử lý upload file
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // Giới hạn kích thước file (5MB)
  },
}).single('image'); // 'image' là tên field chứa file trong form

// Hàm upload hình ảnh lên Firebase
const uploadImageToFirebase = async (imageFile) => {
  const fileName = `${Date.now()}_${imageFile.originalname}`;
  const file = bucket.file(fileName);

  const stream = file.createWriteStream({
    metadata: {
      contentType: imageFile.mimetype,
    },
  });

  return new Promise((resolve, reject) => {
    stream.on('error', (error) => {
      reject(error);
    });

    stream.on('finish', async () => {
      await file.makePublic();
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
      resolve(publicUrl);
    });

    stream.end(imageFile.buffer);
  });
};

// Tạo mới một Batch Koi Fish
const createBatchKoiFish = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    const { category_id, batch_name, origin, gender, size, breed, price, quantity, certificate } = req.body;
    const imageFile = req.file; // File hình ảnh từ client (nếu có)

    try {
      if (!imageFile) {
        return res.status(400).json({ message: 'Hình ảnh là bắt buộc' });
      }

      const imageUrl = await uploadImageToFirebase(imageFile);

      const newBatchKoiFish = await BatchKoiFish.create({
        category_id,
        batch_name,
        origin,
        gender,
        size,
        breed,
        price,
        quantity,
        image: imageUrl, // URL ảnh từ Firebase
        certificate,
      });

      res.status(201).json({ message: 'Tạo lô cá Koi thành công', batchKoiFish: newBatchKoiFish });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Tạo lô cá Koi thất bại' });
    }
  });
};

// Lấy thông tin một Batch Koi Fish dựa trên ID
const getBatchKoiFishById = async (req, res) => {
  const { id } = req.params;

  try {
    const batchKoiFish = await BatchKoiFish.findByPk(id);

    if (!batchKoiFish) {
      return res.status(404).json({ message: 'Lô cá Koi không tồn tại' });
    }

    res.status(200).json(batchKoiFish);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lấy thông tin lô cá Koi thất bại' });
  }
};

// Lấy danh sách tất cả các Batch Koi Fish
const getAllBatchKoiFish = async (req, res) => {
  try {
    const batchKoiFishList = await BatchKoiFish.findAll();

    res.status(200).json(batchKoiFishList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Lấy danh sách lô cá Koi thất bại' });
  }
};

// Cập nhật thông tin một Batch Koi Fish dựa trên ID
const updateBatchKoiFish = async (req, res) => {
  const { id } = req.params;
  const { category_id, batch_name, origin, gender, size, breed, price, quantity, certificate } = req.body;
  const imageFile = req.file; // File hình ảnh từ client (nếu có)

  try {
    const batchKoiFish = await BatchKoiFish.findByPk(id);

    if (!batchKoiFish) {
      return res.status(404).json({ message: 'Lô cá Koi không tồn tại' });
    }

    let imageUrl = batchKoiFish.image;
    if (imageFile) {
      imageUrl = await uploadImageToFirebase(imageFile);
    }

    await batchKoiFish.update({
      category_id,
      batch_name,
      origin,
      gender,
      size,
      breed,
      price,
      quantity,
      image: imageUrl,
      certificate,
    });

    res.status(200).json({ message: 'Cập nhật lô cá Koi thành công', batchKoiFish });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Cập nhật lô cá Koi thất bại' });
  }
};

// Xóa một Batch Koi Fish dựa trên ID
const deleteBatchKoiFish = async (req, res) => {
  const { id } = req.params;

  try {
    const batchKoiFish = await BatchKoiFish.findByPk(id);

    if (!batchKoiFish) {
      return res.status(404).json({ message: 'Lô cá Koi không tồn tại' });
    }

    await batchKoiFish.destroy();
    res.status(200).json({ message: 'Xóa lô cá Koi thành công' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Xóa lô cá Koi thất bại' });
  }
};

module.exports = {
  createBatchKoiFish,
  getBatchKoiFishById,
  getAllBatchKoiFish,
  updateBatchKoiFish,
  deleteBatchKoiFish,
};
