import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfig } from './app-bootstrap-config';

export default (nestApp: INestApplication): void => {
    const options = new DocumentBuilder()
        .setTitle(AppConfig.swagger.documentBuilder.title)
        .setDescription(AppConfig.swagger.documentBuilder.description)
        .setVersion(AppConfig.swagger.documentBuilder.version)
        .setContact('Depay', 'depayapp.com', AppConfig.swagger.documentBuilder.contactEmail)
        .setExternalDoc(
            AppConfig.swagger.documentBuilder.externalDoc.description,
            AppConfig.swagger.documentBuilder.externalDoc.url,
        )
        .setBasePath(AppConfig.prefix)
        .addBearerAuth({
            type: AppConfig.swagger.documentBuilder.bearerAuth.type,
            description: AppConfig.swagger.documentBuilder.bearerAuth.location,
            name: AppConfig.swagger.documentBuilder.bearerAuth.name,
        })
        // .setSchemes(...AppConfig.swagger.documentBuilder.schemas)
        .build();

    const document = SwaggerModule.createDocument(nestApp, options);
    SwaggerModule.setup(AppConfig.swagger.apiPath, nestApp, document);
};
