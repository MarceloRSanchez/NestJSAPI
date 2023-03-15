import { IGeneralConfiguration, IUserCredentials } from './general.configuration.interface';
import * as dotenv from 'dotenv'
import * as fs from 'fs'

export default (extension?: string) => {
    dotenv.config({
        path: __dirname + '/../../.env' + (extension ? `.${extension}` : ''),
    }); 

    const data = fs.readFileSync(`${__dirname}/user-credentials.json`).toString();
    const credentials = JSON.parse(data);

    return () => {
        const config: IGeneralConfiguration = {
            port: parseInt(process.env.PORT, 10) || 3000,
            url: process.env.URL,
            jwtConstants: {
                secret: process.env.SECRET_KEY,
                expiration: parseInt(process.env.JWT_EXPIRATION),
                salt: parseInt(process.env.SALT_ROUND),
            },
            credentials
        };
        return config;
    };
};
