const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const { NODE_ENV, PORT, CLIENT_URL, DATABASE } = process.env;

const app = express();

// connect to db
mongoose.connect(DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('DB connected'))
.catch(err => console.error('DB connection error', err));

// import routes
const authRoutes = require('./routes/auth');

// app middleware
app.use(morgan('dev'));
app.use(express.json());
//app.use(cors()); // allows all origins
if(NODE_ENV == 'development') {
    app.use(cors({ origin: CLIENT_URL }));
}

// route middleware
app.use('/api/signup', authRoutes);

const port = PORT || 8000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});