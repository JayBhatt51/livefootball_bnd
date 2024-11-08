const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv')
dotenv.config();

const connectDB = require('./connectDB')
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use('/admin', adminRoutes); // Admin routes
app.use('/user', userRoutes);   // User routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});