const express = require('express');
const Activity = require('../models/Activity');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  try {
    const { activityType, value, notes, date } = req.body;

    if (!activityType || value === undefined) {
      return res.status(400).json({ message: 'activityType dan value wajib diisi' });
    }

    const activity = new Activity({
      user: req.userId,
      activityType,
      value,
      notes,
      date: date || new Date()
    });
    await activity.save();

    await updateStreak(req.userId);

    const user = await User.findById(req.userId).select('streak dailyGoals');
    res.status(201).json({ activity, streak: user.streak });
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan server', error: err.message });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const { from, to } = req.query;
    const filter = { user: req.userId };

    if (from || to) {
      filter.date = {};
      if (from) filter.date.$gte = new Date(from);
      if (to) filter.date.$lte = new Date(to);
    }

    const activities = await Activity.find(filter).sort({ date: -1 });
    res.json(activities);
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan server', error: err.message });
  }
});

router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const aggregation = await Activity.aggregate([
      {
        $match: {
          user: req.userId,
          date: { $gte: sevenDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: '%Y-%m-%d', date: '$date' } },
            activityType: '$activityType'
          },
          total: { $sum: '$value' }
        }
      },
      { $sort: { '_id.date': 1 } }
    ]);

    const user = await User.findById(req.userId).select('dailyGoals streak');

    res.json({
      weeklyData: aggregation,
      dailyGoals: user.dailyGoals,
      streak: user.streak
    });
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan server', error: err.message });
  }
});

router.put('/goals', authMiddleware, async (req, res) => {
  try {
    const { water, exercise, sleep } = req.body;
    const user = await User.findById(req.userId);

    if (water !== undefined) user.dailyGoals.water = water;
    if (exercise !== undefined) user.dailyGoals.exercise = exercise;
    if (sleep !== undefined) user.dailyGoals.sleep = sleep;

    await user.save();
    res.json(user.dailyGoals);
  } catch (err) {
    res.status(500).json({ message: 'Terjadi kesalahan server', error: err.message });
  }
});

async function updateStreak(userId) {
  const user = await User.findById(userId);

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const todaysActivities = await Activity.find({
    user: userId,
    date: { $gte: todayStart, $lte: todayEnd }
  });

  const totals = { olahraga: 0, minum_air: 0, tidur: 0 };
  todaysActivities.forEach(a => {
    if (totals[a.activityType] !== undefined) totals[a.activityType] += a.value;
  });

  const goalMet =
    totals.olahraga >= user.dailyGoals.exercise ||
    totals.minum_air >= user.dailyGoals.water ||
    totals.tidur >= user.dailyGoals.sleep;

  if (!goalMet) return; 

  const lastActive = user.streak.lastActiveDate;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);

  const lastActiveIsToday = lastActive && new Date(lastActive).setHours(0, 0, 0, 0) === todayStart.getTime();
  const lastActiveIsYesterday = lastActive && new Date(lastActive).setHours(0, 0, 0, 0) === yesterday.getTime();

  if (lastActiveIsToday) {
    
    return;
  } else if (lastActiveIsYesterday) {
    user.streak.current += 1;
  } else {
    user.streak.current = 1;
  }

  user.streak.longest = Math.max(user.streak.longest, user.streak.current);
  user.streak.lastActiveDate = new Date();

  await user.save();
}

module.exports = router;