import { rateLimit } from 'utils-decorators';
import { Injectable, NestInterceptor, ExecutionContext, HttpException, HttpStatus, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LocationRateLimitInterceptor implements NestInterceptor {
    @rateLimit({
        allowedCalls: 30,
        timeSpanMs: 1000 * 60 * 60,
        keyResolver: (context: ExecutionContext) => context.switchToHttp().getRequest().ip,
        exceedHandler: () => {
            throw new HttpException('Rate limit exceeded', HttpStatus.TOO_MANY_REQUESTS);
        },
    })
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        return next.handle();
    }
}
