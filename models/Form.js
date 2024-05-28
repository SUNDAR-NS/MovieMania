const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  cast: {
    type: String,
    required: true
  },
  imageName: {
    type: String,
    required: true
  },
  reviews: {
    type: [{
      review: String,
      star: Number
    }],
    default: []
  }
});

const Form = mongoose.model('Form', FormSchema);

module.exports = Form;
