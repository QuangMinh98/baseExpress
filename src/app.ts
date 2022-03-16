import express from 'express';
import { config } from './config/config';
import { errorMiddleware, Controller } from './common';
import { initRouter } from './routes/api';
import { connectDatabase } from './database/mongodb';

export class App {
    private app: express.Application;

    constructor() {
        this.app = express();
        this.app.use(express.json());
        this.app.use(
            express.urlencoded({
                extended: true
            })
        );
    }

    private async connectDatabase() {
        await connectDatabase();
    }

    private logger() {}

    private cronJob() {}

    private initRouter(): void {
        initRouter(this.app);
        this.initializeErrorHandling();
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }

    async start() {
        await this.connectDatabase();
        this.cronJob();
        this.initRouter();
    }

    async listen(port: number, callback?: () => void): Promise<void> {
        await this.app.listen(port, callback);
    }
}
