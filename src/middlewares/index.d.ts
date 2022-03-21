// import passport from 'passport';
// import express from 'express';

// export interface Profile extends passport.Profile {
//     id: string;
//     displayName: string;
//     gender?: string | undefined;
//     ageRange?:
//         | {
//               min: number;
//               max?: number | undefined;
//           }
//         | undefined;
//     profileUrl?: string | undefined;
//     username?: string | undefined;
//     birthday: string;

//     _raw: string;
//     _json: any;
// }

// export interface AuthenticateOptions extends passport.AuthenticateOptions {
//     authType?: string | undefined;
// }

// export interface StrategyOption {
//     clientID: string;
//     clientSecret: string;
//     callbackURL: string;

//     scopeSeparator?: string | undefined;
//     enableProof?: boolean | undefined;
//     profileFields?: string[] | undefined;

//     authorizationURL?: string | undefined;
//     tokenURL?: string | undefined;
//     profileURL?: string | undefined;
//     graphAPIVersion?: string | undefined;

//     display?: 'page' | 'popup' | 'touch' | undefined;

//     authType?: 'reauthenticate' | undefined;
//     authNonce?: string | undefined;
// }

// export interface StrategyOptionWithRequest extends StrategyOption {
//     passReqToCallback: true;
// }

// export type VerifyFunction = (
//     accessToken: string,
//     refreshToken: string,
//     profile: Profile,
//     done: (error: any, user?: any, info?: any) => void
// ) => void;

// export type VerifyFunctionWithRequest = (
//     req: express.Request,
//     accessToken: string,
//     refreshToken: string,
//     profile: Profile,
//     done: (error: any, user?: any, info?: any) => void
// ) => void;

// export class Strategy implements passport.Strategy {
//     constructor(options: StrategyOptionWithRequest, verify: VerifyFunctionWithRequest);
//     constructor(options: StrategyOption, verify: VerifyFunction);

//     name: string;
//     authenticate(req: express.Request, options?: object): void;
// }
