const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
//
let GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
let GOOGLE_CLIENT_SECRET =process.env.GOOGLE_CLIENT_SECRET;
// Google Oauth
if (!GOOGLE_CLIENT_ID) {
    const keys = require('../config/keys');
    GOOGLE_CLIENT_ID = keys.googleClientId || process.env.GOOGLE_CLIENT_ID;
    GOOGLE_CLIENT_SECRET =keys.googleClientSecret || process.env.GOOGLE_CLIENT_SECRET;    
}

// 

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
