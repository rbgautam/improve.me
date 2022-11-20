const express = require('express');
const app = express();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

// Google Oauth
const GOOGLE_CLIENT_ID = keys.googleClientId || process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET =keys.googleClientSecret || process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   //return cb(err, user);
    //   console.log('user profile',user);
    // });
    console.log('accesstoken:',accessToken);
    console.log('refreshToken:',refreshToken);
    console.log('profile:',profile);
  }

));

app.get('/auth/google',
    passport.authenticate('google',{scope:['profile','email']})
);
app.get('/home',(req,res)=>{
    res.send({user:'Loogged in success'});
});
app.get('/login',(req,res)=>{
    res.send({user:'Loogged in success'});
});

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/home');
  });


const PORT = process.env.PORT || 5000;
app.listen(PORT);