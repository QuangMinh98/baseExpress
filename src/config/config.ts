import dotenv from 'dotenv';

export class Config {
    private static instance: Config;
    private readonly envConfig: { [key: string]: any } = null;

    constructor() {
        dotenv.config();
        this.envConfig = {
            port: process.env.PORT,
            connectionString: process.env.CONNECTION_STRING,
            jwtKey: process.env.JWT_KEY,
            facebookClientId: process.env.FACEBOOK_CLIENT_ID,
            facebookClientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            googleClientId: process.env.GOOGLE_CLIENT_ID,
            googleClientSecret: process.env.GOOGLE_CLIENT_SECRET
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
