const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(v);
      },
      message: '{VALUE} is not a valid email address',
    },
  },
  dateOfBirth: {
    type: Date,
    required: true,
    validate: {
      validator: (v) => {
        const today = new Date();
        const birthDate = new Date(v);
        return birthDate <= today;
      },
      message: 'Date of birth must be in the past',
    },

  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastSentAt: {
    type: Date,
    default: null,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;