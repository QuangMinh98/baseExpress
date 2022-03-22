import { Response, Request, Router, NextFunction } from 'express';
import { Controller } from '../../common';
import { AuthService } from '../../services/auth.service';
import passport from 'passport';
require('../../middlewares/passport');

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
            passport.authenticate('facebook-token', { session: false }),
            this.facebookLogin
        );
        this._router.post(
            this.baseUrl + '/google',
            passport.authenticate('google-plus-token', { session: false }),
            this.googleLogin
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

    private googleLogin = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { user } = req;

            return await this.authService.googleLogin(user, res);
        } catch (err) {
            next(err);
        }
    };
}
