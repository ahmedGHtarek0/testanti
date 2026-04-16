const express = require('express');
const { client } = require('../redisClient');
const crypto = require('crypto');

const router = express.Router();

// Helper to get user by ID
const getUserById = async (id) => {
    const userJson = await client.get(`user:${id}`);
    return userJson ? JSON.parse(userJson) : null;
};
// Helper to save user
const saveUser = async (user) => {
    await client.set(`user:${user._id}`, JSON.stringify(user));
    await client.zAdd('users:leaderboard', {
        score: user.points || 0,
        value: user._id
    });
};

// GET all users
router.get('/', async (req, res) => {
  try {
    const userIds = await client.sMembers('users:all');
    const users = [];
    for (const id of userIds) {
        const user = await getUserById(id);
        if (user) {
            const { password, ...userWithoutPassword } = user;
            users.push(userWithoutPassword);
        }
    }
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET Leaderboard Top 10
router.get('/leaderboard', async (req, res) => {
  try {
    const userIds = await client.zRange('users:leaderboard', 0, 9, { REV: true });
    const users = [];
    for (const id of userIds) {
        const user = await getUserById(id);
        if (user) {
            users.push({
                _id: user._id,
                name: user.name,
                points: user.points,
                badges: user.badges
            });
        }
    }
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET User by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if(user) {
        const { password, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE User
router.delete('/:id', async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (user) {
        await client.del(`user:${req.params.id}`);
        await client.del(`email_to_id:${user.email}`);
        await client.sRem('users:all', req.params.id);
        await client.zRem('users:leaderboard', req.params.id);
        res.json({ message: 'User removed' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PROMOTE to Admin
router.put('/:id/promote', async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if(user) {
      user.isAdmin = true;
      user.updatedAt = new Date().toISOString();
      await saveUser(user);
      res.json({ message: 'Promoted to admin', user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST Assign Workout
router.post('/:id/workouts', async (req, res) => {
  try {
    const { title, description } = req.body;
    const user = await getUserById(req.params.id);
    if(user) {
      user.workouts.push({ 
          _id: crypto.randomUUID(),
          title, 
          description, 
          completed: false,
          dateAssigned: new Date().toISOString()
      });
      user.updatedAt = new Date().toISOString();
      await saveUser(user);
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT Complete Workout
router.put('/:userId/workouts/:workoutId/complete', async (req, res) => {
  try {
    const user = await getUserById(req.params.userId);
    if(user) {
      const workout = user.workouts.find(w => w._id === req.params.workoutId);
      if(!workout) return res.status(404).json({ message: 'Workout not found' });
      
      if(!workout.completed) {
        workout.completed = true;
        workout.dateCompleted = new Date().toISOString();
        user.points = (user.points || 0) + 10;
        
        // Auto badge logic
        if(user.points >= 50 && !user.badges.includes("Bronze Titan")) user.badges.push("Bronze Titan");
        if(user.points >= 100 && !user.badges.includes("Silver Titan")) user.badges.push("Silver Titan");
        if(user.points >= 200 && !user.badges.includes("Gold Titan")) user.badges.push("Gold Titan");
        
        user.updatedAt = new Date().toISOString();
        await saveUser(user);
      }
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
