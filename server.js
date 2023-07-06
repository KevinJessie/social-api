// dependencies
const express = require('express');
const mongoose = require('mongoose');

// set up port and app
const PORT = process.env.PORT || 3001;
const app = express();

// set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// set up mongoose connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// use routes
app.use(require('./routes'));

// start server
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));

