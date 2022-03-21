import passport = require('passport');
// import passportFacebook = require('passport-facebook');
// const FacebookStrategy = passportFacebook.Strategy;
// import { StrategyOption } from '../middlewares/index';
// const GooglePlusTokenStrategy = require('passport-google-plus-token')
import FacebookPlusTokenStrategy = require('passport-facebook-token')
import { User } from '../models/user.models';
// import { config } from '../config/config';
import dotenv from 'dotenv';
dotenv.config();

// passport.serializeUser((user, cb) => {
//     cb(null, user);
// });

// passport.deserializeUser((object: string, cb) => {
//     cb(null, object);
// });

// Google API Aouth2 Login
// passport.use(
//   new GooglePlusTokenStrategy({
//     clientID: config.Google_ClientID,
//     clientSecret: config.Client_Secret,
//     callbackURL: 'http://localhost:4000',
//     proxy: true,
//     profileFields: ['email','gender','displayName']
//   },
//     async (accessToken, refreshToken, profile, done) => {
//       try {
//         console.log('accessToken', accessToken)
//         console.log('refreshToken', refreshToken)
//         //Thong tin cua nguoi dung khi gui client len google
//         console.log('profile', profile)

//         //check user is exist in database/find use google or facebook or local
//         const user = await User.findOne({ authGoogleId: profile.id, authType: "google" })
//         if (user) return done(null, user) //when user is login with google

//         //if new account
//         const newUser = new User({
//           authType: "google",
//           authGoogleId: profile.id,
//           gender:profile.genders[0].value,
//           email: profile.emails[0].value,
//           name: profile.name.familyName + ' ' + profile.name.givenName,
//         })

//         await newUser.save()
//         done(null, newUser) // return to controller process
//       } catch (error) {
//         done(error, false)
//       }

//     })
// );

//FaceBook API Login
// passport.use(
//     new FacebookStrategy(
//         {
//             clientID: process.env.FACEBOOK_CLIENT_ID,
//             clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//             callbackURL: ''
//         },
//         async (accessToken: any, refreshToken: any, profile: any, done: any) => {
//             try {
//                 // const user = await User.findOne({googleId: profile.id})
//                 console.log('accessToken', accessToken);
//                 console.log('refreshToken', refreshToken);
//                 //Thong tin cua nguoi dung khi gui client len google
//                 console.log('profile', profile);
//                 //check user is exist in database/find use google or facebook or local
//                 const user = await User.findOne({ authFacebookId: profile.id, authType: 'facebook' });
//                 if (user) return done(null, user); //when user is login with google

//                 //if new account
//                 const newUser = new User({
//                     authType: 'facebook',
//                     authFacebookId: profile.id,
//                     email: profile.emails[0].value,
//                     name: profile.name.familyName + ' ' + profile.name.givenName
//                 });

//                 await newUser.save();
//                 done(null, newUser); // return to controller process
//             } catch (error) {
//                 done(error, false);
//             }
//         }
//     )
// );

//FaceBook API Login
passport.use(
    new FacebookPlusTokenStrategy({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    //   callbackURL: 'http://localhost:4000',
    },
      async (accessToken:any, refreshToken:any, profile:any, done:any) => {
        try {
          // const user = await User.findOne({googleId: profile.id})
          console.log('accessToken', accessToken)
          console.log('refreshToken', refreshToken)
          //Thong tin cua nguoi dung khi gui client len google
          console.log('profile', profile)
          //check user is exist in database/find use google or facebook or local
          const user = await User.findOne({ authFacebookId: profile.id, authType: "facebook"})
          if (user) return done(null, user) //when user is login with google
  
          //if new account
          const newUser = new User({
            authType: "facebook",
            authFacebookId: profile.id,
            email: profile.emails[0].value,
            name: profile.name.familyName + ' ' + profile.name.givenName,
          })
  
          await newUser.save()
          done(null, newUser) // return to controller process
        } catch (error) {
          done(error, false)
        }
  
      })
  );