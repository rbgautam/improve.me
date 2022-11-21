const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('./models/User');
require('./services/passportService');
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