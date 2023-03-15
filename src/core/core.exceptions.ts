import { HttpStatus } from '@nestjs/common';
import { HttpExceptionExtended } from './http-exception-extended';

export class DatabaseHookException extends HttpExceptionExtended {
    constructor(error?) {
        super({ error, message: `${error.modelName ?? 'Exception'}: Hook error.` }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

export class DatabaseSearchException extends HttpExceptionExtended {
    constructor(error?) {
        super(
            { error, message: `${error.modelName ?? 'Exception'}: An error occurred while searching data.` },
            HttpStatus.NOT_FOUND,
        );
    }
}

export class DatabaseNotFoundException extends HttpExceptionExtended {
    constructor(error?) {
        super(
            { error, message: `${error.modelName ?? 'Not found exception'}: The data was not found on the systen.` },
            HttpStatus.NOT_FOUND,
        );
    }
}

export class DatabaseSaveException extends HttpExceptionExtended {
    constructor(error?) {
        super(
            { error, message: `${error.modelName ?? 'Exception'}: An error occurred while saving data.` },
            HttpStatus.UNPROCESSABLE_ENTITY,
        );
    }
}

export class DatabaseCreateException extends HttpExceptionExtended {
    constructor(error?) {
        super(
            { error, message: `${error.modelName ?? 'Exception'}: An error occurred while creating content.` },
            HttpStatus.NOT_ACCEPTABLE,
        );
    }
}

export class DatabaseDeleteException extends HttpExceptionExtended {
    constructor(error?) {
        super(
            { error, message: `${error.modelName ?? 'Exception'}: An error occurred while deleting content.` },
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
}

export class DatabaseUpdateException extends HttpExceptionExtended {
    constructor(error?) {
        super(
            { error, message: `${error.modelName ?? 'Exception'}: An error occurred while updating content.` },
            HttpStatus.UNPROCESSABLE_ENTITY,
        );
    }
}

export class DatabasePopulateException extends HttpExceptionExtended {
    constructor(error?) {
        super(
            { error, message: `${error.modelName ?? 'Exception'}: An error occurred while populating content.` },
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
}

export class CodeException extends HttpExceptionExtended {
    constructor(error?) {
        super(
            { error, message: `${error.modelName ?? 'Exception'}: An unexpected error occurred.` },
            HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
}

export class MethodNotImplementedException extends HttpExceptionExtended {
    constructor() {
        const error = new Error('Method not implemented yet.');
        super({ error, message: error.message }, HttpStatus.METHOD_NOT_ALLOWED);
    }
}
