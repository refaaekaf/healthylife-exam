const express = require('express');
const Content = require('../models/Content');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { category, type, search } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (type) filter.type = type;
    if (search) filter.title = { $regex: search, $options: 'i' };

    const contents = await Content.find(filter).sort({ createdAt: -1 });
    res.json(contents);
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan server', error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) return res.status(404).json({ message: 'Konten tidak ditemukan' });
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan server', error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const content = new Content(req.body);
    await content.save();
    res.status(201).json(content);
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan server', error: err.message });
  }
});

router.post('/:id/save', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const contentId = req.params.id;

    const alreadySaved = user.savedArticles.some(id => id.toString() === contentId);

    if (alreadySaved) {
      user.savedArticles = user.savedArticles.filter(id => id.toString() !== contentId);
    } else {
      user.savedArticles.push(contentId);
    }

    await user.save();
    res.json({ saved: !alreadySaved, savedArticles: user.savedArticles });
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan server', error: err.message });
  }
});

router.get('/user/saved', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('savedArticles');
    res.json(user.savedArticles);
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan server', error: err.message });
  }
});

router.get('/user/recommendations', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate('savedArticles');

    if (user.savedArticles.length === 0) {
      const popular = await Content.find().sort({ createdAt: -1 }).limit(5);
      return res.json(popular);
    }

    const categoryCount = {};
    user.savedArticles.forEach(article => {
      categoryCount[article.category] = (categoryCount[article.category] || 0) + 1;
    });

    const topCategory = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0][0];
    const savedIds = user.savedArticles.map(a => a._id);

    const recommendations = await Content.find({
      category: topCategory,
      _id: { $nin: savedIds }
    }).limit(5);

    res.json(recommendations);
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan server', error: err.message });
  }
});

module.exports = router;