const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
//
const GOOGLE_CLIENT_ID = keys.googleClientId ;
const GOOGLE_CLIENT_SECRET =keys.googleClientSecret;
//mongoose connection to user table
const User = mongoose.model('users');
// Google Oauth


passport.serializeUser((user,done)=>{
  done(null,user.id);
});

passport.deserializeUser((id,done)=>{

  User.findById(id).then(user=>{ 
    console.log(user);
    done(null,user)
  });
});

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    
    User.findOne({googleId:profile.id}).then(existingUser =>{{
        if(!existingUser){
          new User({
            googleId: profile.id, 
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
          }).save()
          .then(user=>{done(null,user)});
        }else{
          //user already exits
          console.log('User already exists',existingUser);
          done(null,existingUser);
        }
    }
  });


    
  }

));
