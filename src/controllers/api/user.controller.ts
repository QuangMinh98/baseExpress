import { Response, Request, Router, NextFunction } from 'express';
import { Controller } from '../../common';
import { UserService } from '../../services/user.service';

export class UserController implements Controller {
    private readonly baseUrl: string = '/users';
    private _router: Router;
    private readonly userService = UserService.getInstance();

    constructor() {
        this._router = Router();
        this.initRouter();
    }

    get router() {
        return this._router;
    }

    initRouter() {
        this._router.post(this.baseUrl, this.createUser);
        this._router.get(this.baseUrl + '/me', this.getMe);
        this._router.get(this.baseUrl + '/:id', this.getUserById);
        this._router.put(this.baseUrl + '/:id', this.updateUser);
        this._router.delete(this.baseUrl, this.deleteUser);
    }

    async getMe(req: Request, res: Response, next: NextFunction) {
            const {user} = req;
            res.send(await UserService.getMe(user));
    }

    async createUser(req: Request, res: Response, next: NextFunction) {
            const userData = req.body;
            res.send(await UserService.createUser(userData));
        
    }

    async updateUser(req: Request, res: Response, next: NextFunction) {
       
            const userId = req.params;
            const userDataUpdate = req.body;
            res.send(await UserService.updateUser(userId, userDataUpdate));
        
    }

    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params;
            res.send(await UserService.getUserById(userId));
        } catch (err) {
            next(err);
        }
    }

    async deleteUser(req: Request, res: Response,next: NextFunction){
        try{
            const userDeleteId = req.body
            res.send(await UserService.deleteUser(userDeleteId))
        }catch (err) {
            next(err);
        }
    }
}
