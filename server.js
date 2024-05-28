const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

mongoose.connect('mongodb://localhost:27017/reactdb', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

const User = require('./models/User');
const Form = require('./models/Form');
const Watchlist = require('./models/Watchlist');
const { read } = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + '.jpg');
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg') {
      cb(null, true); 
    } else {
      cb(new Error('Only JPEG files are allowed'), false);
    }
  }
});

app.post('/api/register', async (req, res) => {
  const { name, password, category } = req.body;
  try {
    let user = await User.findOne({ name });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      name,
      password,
      category
    });

    await user.save();
    res.json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/api/login', async (req, res) => {
  const { name, password, category } = req.body;
  try {
    let user = await User.findOne({ name });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    if (password !== user.password || category !== user.category) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    res.json({ msg: 'Login successful', category: user.category });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/api/details', upload.single('testImage'), async (req, res) => {
  try {
    const { name, genre, language, rating ,cast } = req.body;
    const newReview = new Form({
      name,
      genre,
      language,
      rating,
      cast,
      imageName: req.file.filename 
    });
    await newReview.save();
    res.send("Successfully uploaded");
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

app.post('/api/add-review', async (req, res) => {
  const { name, review, star } = req.body;
  try {
    let movie = await Form.findOne({ name });
    if (!movie) {
      movie = new Form({
        name: name,
        reviews: [{ review: review, star: star }]
      });
    } else {
      movie.reviews.push({ review: review, star: star });
    }
    await movie.save();
    res.json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding review');
  }
});

app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Form.find();
    res.json(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).send('Server Error');
  }
});

app.post('/api/delete-entry', async (req, res) => {
  const { name } = req.body;
  try {
    const deletereview = await Form.findOneAndDelete({ name });
    if (!deletereview) {
      return res.status(404).send('Movie not Found');
    }
    console.log(`${deletereview.name} deleted`);
    res.send('Review Deleted successfully');
  } catch (error) {
    console.error("Error Occurred not deleting", error);
    res.status(500).send('Internal Server Error');
  }
});


// Assuming you have required necessary modules and set up your express app

app.post('/api/add-to-watchlist', async (req, res) => {
  try {
    const { wname, wgenre, wlanguage, wrating, wcast, wimageName, wreviews } = req.body; // Updated to destructure wreviews

    let oldwatchlist = await Watchlist.findOne({ wname });

    if(oldwatchlist) {
      return res.status(400).json({ msg: 'Already Exists' });
    }

    const newWatchlistEntry = new Watchlist({
      wname,
      wgenre,
      wlanguage,
      wrating,
      wcast,
      wimageName,
      wreviews // Updated to save reviews and stars in an array
    });
    
    await newWatchlistEntry.save();
    res.json({ msg: "Added to watchlist successfully" });
  } catch (error) {
    console.error("Error adding to watchlist", error);
    res.status(500).send("Server Error");
  }
});



app.get('/api/watchlist', async (req, res) => {
  try {
    const watchlist = await Watchlist.find();
    res.json(watchlist);
  } catch (error) {
    console.error('Error fetching watchlist', error);
    res.status(500).send('Server Error');
  }
});

app.post('/api/delete-watchlist', async (req,res) => {
  const { wname } = req.body;
  try
  {
    const deletewatchlist = await Watchlist.findOneAndDelete({ wname });
    if(!deletewatchlist)
    {
      return res.status(404).send('Movie not Found');
    }
    console.log(`${deletewatchlist.wname} deleted`);
    res.send('Watchlist Deleted successfully');
  } catch (error) {
    console.error("Error Occurred not deleting", error);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/api/movieupdate-entry', upload.single('testImage'), async (req, res) => {
  try {
    const { name } = req.body;
    const updatedFields = {};
    
    if (req.body.genre) {
      updatedFields.genre = req.body.genre;
    }
    if (req.body.language) {
      updatedFields.language = req.body.language;
    }
    if (req.body.rating) {
      updatedFields.rating = req.body.rating;
    }
    if (req.body.cast) {
      updatedFields.cast = req.body.cast;
    }
    if (req.file) {
      updatedFields.imageName = req.file.originalname;
    }
    await Form.findOneAndUpdate({ name }, updatedFields, { new: true });

    res.send('Movie updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
