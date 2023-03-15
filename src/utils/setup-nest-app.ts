import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { AppConfig } from './app-bootstrap-config';
import setupSwagger from './swagger';
import { NestExpressApplication } from '@nestjs/platform-express';

export default (nestApp: NestExpressApplication): void => {
    nestApp.enableCors();

    /**
     * SECURITY
     */
    nestApp.use(helmet());
    // nestApp.use(rateLimit(AppConfig.rateLimit));

    /**
     * GLOBAL CONFIGURATIONS
     */
    nestApp.useGlobalPipes(new ValidationPipe(AppConfig.validationPipe));
    nestApp.setGlobalPrefix(AppConfig.prefix);

    if (process.env.APP != 'prod') {
        setupSwagger(nestApp);
    }
};
