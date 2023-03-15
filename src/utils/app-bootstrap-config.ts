import { IAppConfig } from '../core/app.config.interfaces';

export const AppConfig: IAppConfig = {
    prefix: '/api/v1',
    rateLimit: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 1000, // limit each IP to 100 requests per windowMs
    },
    validationPipe: {
        /** Remove properties that do not exist in these dtos class validators */
        whitelist: true,
        /** Throw error if more data is sent to the endpoint */
        // forbidNonWhitelisted: true,
        // transform: true
    },
    swagger: {
        documentBuilder: {
            title: 'Depay API',
            description: 'The Depay API description',
            version: 'v1',
            contactEmail: 'info@depayapp.com',
            externalDoc: {
                description: 'NestJS',
                url: 'https://docs.nestjs.com/',
            },
            bearerAuth: {
                name: 'Authorization',
                location: 'header',
                type: 'apiKey',
            },
            schemas: ['http', 'https'],
        },
        apiPath: 'api',
    },
};
