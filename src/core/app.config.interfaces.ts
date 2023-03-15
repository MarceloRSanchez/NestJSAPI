import { SecuritySchemeType } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export type SwaggerBearerHeaderType = 'header' | 'body' | 'query';
export type SwaggerSchemasType = ('http' | 'https')[];

export interface ISwaggerConfig {
    documentBuilder: {
        title?: string;
        description?: string;
        version?: string;
        contactEmail?: string;
        externalDoc?: {
            description: string;
            url: string;
        };
        bearerAuth?: {
            name: string;
            location: SwaggerBearerHeaderType;
            type: SecuritySchemeType;
        };
        schemas?: SwaggerSchemasType;
    };
    apiPath: string;
}

export interface IAppConfig {
    prefix?: string;
    rateLimit?: {
        windowMs?: number;
        max?: number;
    };
    validationPipe?: {
        whitelist?: boolean;
    };
    swagger?: ISwaggerConfig;
}
