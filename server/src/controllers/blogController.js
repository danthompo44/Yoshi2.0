const { createErrorData } = require('../helpers');
const db = require('../models');

const Blog = db.Blog;

async function getAll(req, res) {
    try {
        const blogs = await Blog.findAll();
        return res.status(200).json(blogs);
    } catch (err) {
        const data = createErrorData(err);
        return res.status(data.code).json(data.error);
    }
}

module.exports = { getAll };
