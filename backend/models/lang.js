const mongoose = require('mongoose'),
  schema = mongoose.Schema;

const langSchema = new schema({
  lang: {
      type: String,
      unique: true,
      required: true,
      length: 2
    },
    title: {
      type: String,
      unique: true,
      required: true,
    },
    fields: {
      name: {
        type: String,
        unique: true,
        required: true,
      },
      age: {
        type: String,
        unique: true,
        required: true,
      },
      rate: {
        type: String,
        unique: true,
        required: true,
      },
      qualifications: {
        type: String,
        unique: true,
        required: true,
      },
    }
  },
  {
    timestamps: true
  }
);

const Lang = mongoose.model('lang', langSchema);

module.exports = {
  langSchema,
  Lang
}