const express = require('express');
const app = express();
require('./services/passportService');
const authroutes = require('./routes/authRoutes');
authroutes(app);


const PORT = process.env.PORT || 5000;
app.listen(PORT);