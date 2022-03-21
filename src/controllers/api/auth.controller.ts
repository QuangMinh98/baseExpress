import { Response, Request, Router, NextFunction } from 'express';
import { Controller } from '../../common';
import { AuthService } from '../../services/auth.service';
import passport from 'passport';
import passportConfig = require('../../middlewares/passports');

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
        this._router.get(
            this.baseUrl + '/facebook',
            passport.authenticate('facebook', { session: false }),
            this.facebookLogin
        );
    }

    private login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;

            return await AuthService.login(email, password, res);
        } catch (err) {
            next(err);
        }
    };

    async facebookLogin(req: Request, res: Response, next: NextFunction) {
        try {
            const { user } = req;
            return await AuthService.facebookLogin(user, res);
        } catch (err) {
            next(err);
        }
    }
}
