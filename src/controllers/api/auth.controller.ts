import { Response, Request, Router, NextFunction } from 'express';
import { Controller } from '../../common';
import { AuthService } from '../../services/auth.service';
import passport from 'passport';
require('../../middlewares/passports');

export class AuthController implements Controller {
    private readonly baseUrl: string = '/login';
    private _router: Router;
    private readonly authService = AuthService.getInstance();

    constructor() {
        this._router = Router();
        this.initRouter();
    }

    get router() {
        return this._router;
    }

    initRouter() {
        this._router.post(this.baseUrl, this.login);
        this._router.post(
            this.baseUrl + '/facebook',
            passport.authenticate('facebook', { session: false }),
            this.facebookLogin
        );
        this._router.get(
            this.baseUrl + '/facebook',
            passport.authenticate('facebook', { session: false }),
            this.facebookLogin
        );
        this._router.get(
            '/facebook/callback',
            passport.authenticate('facebook', { failureRedirect: '/failed' }),
            this.facebookLoginCallback
        );
    }

    private login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;

            return await this.authService.login(email, password, res);
        } catch (err) {
            next(err);
        }
    };

    private facebookLogin = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { user } = req;

            return await this.authService.facebookLogin(user, res);
        } catch (err) {
            next(err);
        }
    };

    private facebookLoginCallback = async (req: Request, res: Response, next: NextFunction) => {
        try {
            res.redirect('/profile');
        } catch (err) {
            next(err);
        }
    };
}
