import { ICommonResponse } from '../interfaces/common-success-response.interface';

export class CommonErrorResponse implements ICommonResponse {
    public status = 500;
    public message = 'error!';

    constructor(message?: string, status?: number) {
        this.message = message ?? this.message;
        this.status = status ?? this.status;
    }
}
