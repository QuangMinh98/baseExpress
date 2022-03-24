import passport from 'passport';
import { Strategy } from 'passport-google-oauth2';
import { User } from '../models/user.models';
import { config } from '../config/config';
import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../common';

const ggAuthConfig = {
    clientID: config.get('googleClientId'),
    clientSecret: config.get('googleClientSecret')
};

const ggAuthHandler = async (request: any, accessToken: any, refreshToken: any, profile: any, done: any) => {
    try {
        //check user is exist in database/find use google or facebook or local
        const user = await User.findOne({ authGoogleId: profile.id, authType: 'google' });
        if (user) return done(null, user); //when user is login with facebook

        //if new account
        const newUser = new User({
            authType: 'google',
            authGoogleId: profile.id,
            email: profile.emails[0].value,
            name: profile.name.familyName + ' ' + profile.name.givenName
        });
        await newUser.save();

        done(null, newUser); // return to controller process
    } catch (error) {
        done(error, false);
    }
};

export function ggAuth() {
    passport.use(
        new Strategy(
            {
                ...ggAuthConfig,
                callbackURL: 'http://localhost:3000/api/login/google/callback',
                passReqToCallback: true
            },
            ggAuthHandler
        )
    );
    return passport.authenticate('google', { scope: ['profile', 'email'] });
}

export function ggTokenAuthErrorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    throw new HttpException(401, { error_code: '401', error_message: 'Invalid google token' });
}
