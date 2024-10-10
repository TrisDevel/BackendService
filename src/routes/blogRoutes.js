const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/BlogController')

router.post('/', BlogController.createBlog); // Tạo mới bài viết
router.get('/:id', BlogController.getBlogById); // Lấy thông tin một bài viết
router.get('/', BlogController.getAllBlogs); // Lấy danh sách tất cả bài viết
router.put('/:id', BlogController.updateBlog); // Cập nhật bài viết
router.delete('/:id', BlogController.deleteBlog); // Xóa bài viết

module.exports = router;
