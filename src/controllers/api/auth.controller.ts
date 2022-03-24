import { Response, Request, Router, NextFunction } from 'express';
import { Controller } from '../../common';
import { AuthService } from '../../services/auth.service';
import { fbTokenAuth, fbAuth, fbTokenAuthErrorHandler } from '../../middlewares/facebookAuth.middleware';
import { ggAuth, ggTokenAuthErrorHandler } from '../../middlewares/googleAuth.middleware';

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
        this._router.get(this.baseUrl + '/facebook', fbAuth());
        this._router.get(this.baseUrl + '/facebook/callback', fbAuth(), this.facebookLogin);
        this._router.get(this.baseUrl + '/google', ggAuth());
        this._router.get(this.baseUrl + '/google/callback', ggAuth(), function (req: Request, res: Response) {
            res.send(req.user);
        });
        this._router.post(this.baseUrl + '/facebook/token', fbTokenAuth(), fbTokenAuthErrorHandler, this.facebookLogin);
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
}
