import { ICommonResponse } from '../interfaces/common-success-response.interface';

export class CommonSuccessResponse implements ICommonResponse {
    public status = 200;
    public message = 'success';

    constructor(message?: string, status?: number) {
        this.message = message ?? this.message;
        this.status = status ?? this.status;
    }
}
