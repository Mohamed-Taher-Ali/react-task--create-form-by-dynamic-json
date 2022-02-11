const mongoose = require('mongoose'),
      schema = mongoose.Schema;

const userSchema = new schema({
  name: {
      type: String,
      unique: true,
      required: true,
      min: 2,
    },
  age: {
      type: Number,
    },
  rate: {
      type: Number,
      default: 0,
      max: 5,
    },
  qualifications: {
    type: String,
    },
  },
  {
    timestamps: true
  }
);

const User = mongoose.model('User', userSchema);

module.exports = {
  userSchema,
  User
}