// dependencies
const express = require('express');
const mongoose = require('mongoose');

// set up port and app
const PORT = process.env.PORT || 3005;
const app = express();

// set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// set up mongoose connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true

});

// use routes
app.use(require('./routes'));

// use this to log mongo queries being executed!
mongoose.set('debug', true);


// start server
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));

