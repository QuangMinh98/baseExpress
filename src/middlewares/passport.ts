import passport from 'passport';
import FacebookPlusTokenStrategy from 'passport-facebook-token';
const GooglePlusTokenStrategy = require('passport-google-plus-token');
import { User } from '../models/user.models';
import { config } from '../config/config';

passport.serializeUser((user: any, done: any) => {
    done(null, user.id);
});

passport.deserializeUser((id: any, done: any) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

//FaceBook API Login
passport.use(
    new FacebookPlusTokenStrategy(
        {
            clientID: config.get('facebook_id'),
            clientSecret: config.get('facebook_secret')
            // callbackURL: 'http://localhost:3000/api/login/facebook/callback',
            // passReqToCallback: true
        },
        async (accessToken: any, refreshToken: any, profile: any, done: any) => {
            try {
                console.log('accessToken', accessToken);
                console.log('refreshToken', refreshToken);
                //Thong tin cua nguoi dung khi gui client len facebook
                console.log('profile', profile);
                //check user is exist in database/find use google or facebook or local
                const user = await User.findOne({ authFacebookId: profile.id, authType: 'facebook' });
                if (user) return done(null, user); //when user is login with facebook

                //if new account
                const newUser = new User({
                    authType: 'facebook',
                    authFacebookId: profile.id,
                    email: profile.emails[0].value,
                    name: profile.name.familyName + ' ' + profile.name.givenName
                });

                await newUser.save();
                done(null, newUser); // return to controller process
            } catch (error) {
                done(error, false);
            }
        }
    )
);

//Google API Login
passport.use(
    new GooglePlusTokenStrategy(
        {
            clientID: config.get('google_id'),
            clientSecret: config.get('google_secret'),
            callbackURL: ''
        },
        async (accessToken: any, refreshToken: any, profile: any, done: any) => {
            try {
                console.log('accessToken', accessToken);
                console.log('refreshToken', refreshToken);
                //Thong tin cua nguoi dung khi gui client len facebook
                console.log('profile', profile);
                //check user is exist in database/find use google or facebook or local
                const user = await User.findOne({ authFacebookId: profile.id, authType: 'google' });
                if (user) return done(null, user); //when user is login with facebook

                //if new account
                const newUser = new User({
                    authType: 'google',
                    authFacebookId: profile.id,
                    email: profile.emails[0].value,
                    name: profile.name.familyName + ' ' + profile.name.givenName
                });

                await newUser.save();
                done(null, newUser); // return to controller process
            } catch (error) {
                done(error, false);
            }
        }
    )
);
