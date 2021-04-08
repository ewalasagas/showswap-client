// const express = require("express");
// const bodyParser = require("express");
// const mongoose = require("express");
// const shortid = require("express");
// require('dotenv').config();

// const app = express();
// app.use(bodyParser);


// mongoose.connect("mongodb://localhost/react-shopping-cart-db", {
//     useNewUrlParser: true,
//     useCreateIndex:true,
//     useUnifiedTopology: true,
// test});

const express = require('express');
const compression = require('compression');
const path = require('path');
const app = express();
 
app.use(compression());
app.use(express.static(path.join(__dirname, 'build')));
 
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
 
const PORT = process.env.PORT || 3000;
 
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});