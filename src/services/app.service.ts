import { HttpException } from '../common';

export class AppService {
    private static instance: AppService;

    static getInstance(): AppService {
        if (!AppService.instance) {
            AppService.instance = new AppService();
        }
        return AppService.instance;
    }

    helloWorld() {
        return { status: 'ok' };
    }
}
