// server/index.js
const express = require('express');
// Enable CORS for all routes (for all origins)
app.use(cors());
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',  // Allow only requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

// Example route
app.get('/', (req, res) => res.send('Server is running'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error(err));

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const overviewRoutes = require('./routes/overview');
app.use('/api', overviewRoutes);

app.listen(5000, () => {
    console.log('Backend server running on http://localhost:5000');
  });