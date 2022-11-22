const express = require('express');
const cookieSession= require('cookie-session');
const passport = require('passport');
const app = express();
const mongoose = require('mongoose');

require('./models/User');
require('./services/passportService');

let cookieKEY = process.env.COOKIEKEY;
if(!cookieKEY){
    const keys = require('./config/keys');
    cookieKEY = keys.cookieKey;
}

app.use(
    cookieSession({
        maxAge:30*24*60*60*1000,
        keys: [cookieKEY]
    })
);

// app.use(cookieSession({
//     secret: cookieKEY,
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: true }
//  }));
 
app.use(passport.initialize());
app.use(passport.session());

let mongoDbUri = process.env.MONGODBURI;

if(!mongoDbUri){
    const keys = require('./config/keys');
    mongoDbUri = keys.mongoURI;
}
mongoose.connect(mongoDbUri); 

const authroutes = require('./routes/authRoutes');
authroutes(app);


const PORT = process.env.PORT || 5000;
app.listen(PORT);