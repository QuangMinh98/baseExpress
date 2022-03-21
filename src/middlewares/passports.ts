import passport from 'passport'
// import passportFacebook from 'passport-facebook'
const FacebookStrategy = require('passport-facebook').Strategy;
import { User } from '../models/user.models'
// const config = require('../config/config')
import dotenv = require('dotenv');
dotenv.config();

passport.serializeUser((user,cb) => {
  cb(null, user);
});

passport.deserializeUser((obj:string,cb) => {
  cb(null, obj);
});

//FaceBook API Login
passport.use(
  new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: '',
    // proxy: true
  },
    async (accessToken:any, refreshToken:any, profile:any, cb:any) => {
      try {
        // const user = await User.findOne({googleId: profile.id})
        console.log('accessToken', accessToken)
        console.log('refreshToken', refreshToken)
        //Thong tin cua nguoi dung khi gui client len google
        console.log('profile', profile)
        //check user is exist in database/find use google or facebook or local
        const user = await User.findOne({ authFacebookId: profile.id, authType: "facebook"})
        if (user) return cb(null, user) //when user is login with google

        //if new account
        const newUser = new User({
          authType: "facebook",
          authFacebookId: profile.id,
          email: profile.emails[0].value,
          name: profile.name.familyName + ' ' + profile.name.givenName,
        })

        await newUser.save()
        cb(null, newUser) // return to controller process
      } catch (error) {
        cb(error, false)
      }

    })
);


