const Blog = require('../models/Blog');

const createBlog = async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const newBlog = await Blog.create({
      title,
      content,
      author,
    });

    res.status(201).json({ message: 'Tạo bài viết thành công', blog: newBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Tạo bài viết thất bại', error });
  }
};

const getBlogById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const blog = await Blog.findByPk(id);
  
      if (!blog) {
        return res.status(404).json({ message: 'Bài viết không tồn tại' });
      }
  
      res.status(200).json(blog);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lấy thông tin bài viết thất bại', error });
    }
  };

  const getAllBlogs = async (req, res) => {
    try {
      const blogs = await Blog.findAll();
  
      res.status(200).json(blogs);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Lấy danh sách bài viết thất bại', error });
    }
  };

  const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, content, author } = req.body;
  
    try {
      const blog = await Blog.findByPk(id);
  
      if (!blog) {
        return res.status(404).json({ message: 'Bài viết không tồn tại' });
      }
  
      await blog.update({
        title,
        content,
        author,
      });
  
      res.status(200).json({ message: 'Cập nhật bài viết thành công', blog });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Cập nhật bài viết thất bại', error });
    }
  };

  const deleteBlog = async (req, res) => {
    const { id } = req.params;
  
    try {
      const blog = await Blog.findByPk(id);
  
      if (!blog) {
        return res.status(404).json({ message: 'Bài viết không tồn tại' });
      }
  
      await blog.destroy();
      res.status(200).json({ message: 'Xóa bài viết thành công' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Xóa bài viết thất bại', error });
    }
  };

  module.exports = {
    createBlog,
    getBlogById,
    updateBlog,
    deleteBlog,
    getAllBlogs
  };