const mongoose = require('mongoose');

const WatchlistSchema = new mongoose.Schema({
  wname: {
    type: String,
    required: true
  },
  wgenre: {
    type: String,
    required: true
  },
  wlanguage: {
    type: String,
    required: true
  },
  wrating: {
    type: Number,
    required: true
  },
  wcast: {
    type: String,
    required: true
  },
  wimageName: {
    type: String,
    required: true
  },
  wreviews: [{ // Adjusted to save review and star in an array
    review: String,
    star: Number
  }]
});


const Watchlist = mongoose.model('Watchlist', WatchlistSchema);

module.exports = Watchlist;
