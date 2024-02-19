import { applyDecorators } from '@nestjs/common';
import {
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiResponseSchema } from '../resources/swagger/responses.options';

export function Swagger(schema: ApiResponseSchema) {
    const decorators: (MethodDecorator & ClassDecorator)[] = [];

    if (schema.conflict) {
        decorators.push(ApiConflictResponse(schema.conflict));
    }
    if (schema.success) {
        decorators.push(ApiCreatedResponse(schema.success));
    }
    if (schema.ok) {
        decorators.push(ApiOkResponse(schema.ok));
    }
    if (schema.unauthorized) {
        decorators.push(ApiUnauthorizedResponse(schema.unauthorized));
    }

    if (schema.notFound) {
        decorators.push(ApiNotFoundResponse(schema.notFound));
    }

    return applyDecorators(...decorators);
}
