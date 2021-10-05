import { Controller } from '../common/interfaces/controller.interface';
import { AppController } from './controllers/app.controller';

export class ControllerFactory {
    static get(name: string): Controller {
        if (name === 'App') return new AppController();
    }
}
