const mongoose = require('mongoose');
const {Schema} = mongoose;
//the above statement is equivalent to const Schema = mongoose.Schema;

const userSchema = new Schema({
    googleId:String,
    firstName:String,
    lastName:String
});

mongoose.model('users',userSchema);
