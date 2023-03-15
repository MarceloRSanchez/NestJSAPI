import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class UserValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        return true;
    }
}
