import passport from 'passport';
import FacebookPlusTokenStrategy from 'passport-facebook-token';
import { Strategy } from 'passport-facebook';
import { User } from '../models/user.models';
import { config } from '../config/config';
import { HttpException } from '../common';
import { NextFunction, Request, Response } from 'express';

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((obj: string, cb) => {
    cb(null, obj);
});

const fbAuthOptions = {
    clientID: config.get('facebookClientId'),
    clientSecret: config.get('facebookClientSecret')
};

const fbAuthHandler = async (accessToken: any, refreshToken: any, profile: any, done: any) => {
    try {
        const user = await User.findOne({ authFacebookId: profile.id, authType: 'facebook' });
        if (user) return done(null, user); //when user is login with facebook

        //if new account
        const newUser = new User({
            authType: 'facebook',
            authFacebookId: profile.id,
            email: profile.emails ? profile.emails[0].value : '',
            name: profile.displayName
        });
        await newUser.save();

        done(null, newUser); // return to controller process
    } catch (error) {
        done(error, false);
    }
};

export function fbTokenAuth() {
    //FaceBook token API Login
    passport.use(new FacebookPlusTokenStrategy(fbAuthOptions, fbAuthHandler));
    return passport.authenticate('facebook-token');
}

export function fbAuth() {
    passport.use(
        new Strategy(
            {
                ...fbAuthOptions,
                callbackURL: 'http://localhost:3000/api/login/facebook/callback'
            },
            fbAuthHandler
        )
    );

    return passport.authenticate('facebook');
}

export function fbTokenAuthErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    throw new HttpException(401, { error_code: '401', error_message: 'Invalid facebook token' });
}
