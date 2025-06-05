
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());  
app.use(express.json());

app.use((req, res, next) => {
  console.log(`🌐 [${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// DB connection
mongoose.connect('mongodb+srv://Shifra_efrat_chaya:8Wi2bPnpi9rsE4w7@cluster0.7y9rlcp.mongodb.net/Interior_design_inspiration_site?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const userRoutes = require('./routes/users');
app.use('/api/users', userRoutes);

const imageRoutes = require('./routes/images');
app.use('/api/images', imageRoutes);

// const favoritesRoutes = require('./routes/favorites');
// app.use('/api/favorites', favoritesRoutes);


// Test route
app.get('/', (req, res) => {
  res.send('Hello from Node.js backend');
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server is running on http://0.0.0.0:${PORT}`);
});


