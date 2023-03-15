import { HttpException, Logger } from '@nestjs/common';

export interface IHttpExceptionExtededErrorParam {
    error?: Error;
    message: string;
    modelName?: string;
    code?: number;
}

export class HttpExceptionExtended extends HttpException {
    constructor(param: IHttpExceptionExtededErrorParam, status) {
        super({ status, message: param.message, trace: param.error, code: param.code }, status);
        const logger = new Logger(HttpExceptionExtended.name);
        logger.error(`${param.modelName ?? 'Exception'}: ${param.message}`);
        logger.error(param.error);
    }
}
