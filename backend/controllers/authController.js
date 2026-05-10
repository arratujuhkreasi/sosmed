const { userHelpers } = require('../db/helpers');
const generateToken = require('../utils/generateToken');

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, channelName } = req.body;

    const userExists = await userHelpers.findByEmail(email);

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await userHelpers.create({
      name,
      email,
      password,
      role,
      channelName,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        channelName: user.channelName,
        token: generateToken(user.id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userHelpers.findByEmail(email);

    if (user && (await userHelpers.comparePassword(password, user.password))) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        channelName: user.channelName,
        token: generateToken(user.id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await userHelpers.findById(req.user._id);

    if (user) {
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        channelName: user.channelName,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    const user = await userHelpers.findById(req.user._id);

    if (user) {
      const updateData = {
        name: req.body.name || user.name,
        email: req.body.email || user.email,
        channelName: req.body.channelName || user.channelName,
      };

      if (req.body.password) {
        const bcrypt = require('bcryptjs');
        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(req.body.password, salt);
      }

      const updatedUser = await userHelpers.update(user.id, updateData);

      res.json({
        _id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        channelName: updatedUser.channelName,
        token: generateToken(updatedUser.id),
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
};
