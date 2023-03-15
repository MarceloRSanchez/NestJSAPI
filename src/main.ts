import { join } from 'path';
import 'source-map-support/register';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import setupNestApp from './utils/setup-nest-app';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppConfig } from './utils/app-bootstrap-config';
import * as express from 'express';

declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.use(express.static(join(process.cwd(), 'public')));
    
    setupNestApp(app);

    await app.listen(3000);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }

    /** EXTRA INFORMATION */
    const url = await app.getUrl();
    console.log(`Server is listening on ${url}${AppConfig.prefix}`);
}
bootstrap();
