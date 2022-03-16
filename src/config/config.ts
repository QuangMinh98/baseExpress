import dotenv from 'dotenv';

export class Config {
    private static instance: Config;
    private readonly envConfig: { [key: string]: any } = null;

    constructor() {
        dotenv.config();
        this.envConfig = {
            port: process.env.PORT,
            connectionString: process.env.CONNECTION_STRING,
            jwtKey: process.env.JWT_KEY
        };
    }

    static getInstance(): Config {
        if (!Config.instance) {
            Config.instance = new Config();
        }
        return Config.instance;
    }

    get(key: string): any {
        return this.envConfig[key];
    }
}

export const config: Config = Config.getInstance();
