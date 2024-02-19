import { ApiResponseOptions } from '@nestjs/swagger';

export type ApiResponseSchema = {
    [key in
        | 'success'
        | 'ok'
        | 'unauthorized'
        | 'conflict'
        | 'notFound']?: ApiResponseOptions;
};

export const createUserResponse: ApiResponseSchema = {
    success: {
        schema: {
            example: {
                email: 'test@test.com',
                name: 'Test User',
                createdAt: '2024-02-18T08:59:34.507Z',
                phoneNumber: '11999999997',
                status: 'inactive',
                role: 'admin',
            },
        },
        // description: 'Return error 404 when user not found',
        isArray: false,
    },
    unauthorized: {
        schema: {
            example: {
                message: 'Unauthorized',
                statusCode: 401,
            },
        },
    },
    conflict: {
        schema: {
            example: {
                message: 'duplicate-field',
                error: 'Conflict',
                statusCode: 409,
            },
        },
    },
};

export const updateUserResponse: ApiResponseSchema = {
    ok: {},
    unauthorized: {
        schema: {
            example: {
                message: 'Unauthorized',
                statusCode: 401,
            },
        },
    },
    conflict: {
        schema: {
            example: {
                message: 'duplicate-field',
                error: 'Conflict',
                statusCode: 409,
            },
        },
    },
    notFound: {
        schema: {
            example: {
                message: 'user not found',
                error: 'Not Found',
                statusCode: 404,
            },
        },
    },
};

export const findAllResponse: ApiResponseSchema = {
    ok: {
        schema: {
            example: [
                {
                    email: 'test@test.com',
                    name: 'Test User',
                    createdAt: '2024-02-18T08:59:34.507Z',
                    phoneNumber: '11999999997',
                    status: 'inactive',
                    role: 'admin',
                },
                {
                    email: 'test1@test.com',
                    name: 'Test User 1',
                    createdAt: '2024-02-18T08:59:34.507Z',
                    phoneNumber: '11999999998',
                    status: 'active',
                    role: 'user',
                },
            ],
        },
        // description: 'Return error 404 when user not found',
        isArray: true,
    },
    unauthorized: {
        schema: {
            example: {
                message: 'Unauthorized',
                statusCode: 401,
            },
        },
    },
    conflict: {
        schema: {
            example: {
                message: 'duplicate-field',
                error: 'Conflict',
                statusCode: 409,
            },
        },
    },
    notFound: {
        schema: {
            example: {
                message: 'user not found',
                error: 'Not Found',
                statusCode: 404,
            },
        },
    },
};

export const findOneResponse: ApiResponseSchema = {
    ok: {
        schema: {
            example: {
                email: 'test@test.com',
                name: 'Test User',
                createdAt: '2024-02-18T08:59:34.507Z',
                phoneNumber: '11999999997',
                status: 'inactive',
                role: 'admin',
            },
        },
        // description: 'Return error 404 when user not found',
        isArray: false,
    },
    unauthorized: {
        schema: {
            example: {
                message: 'Unauthorized',
                statusCode: 401,
            },
        },
    },
    conflict: {
        schema: {
            example: {
                message: 'duplicate-field',
                error: 'Conflict',
                statusCode: 409,
            },
        },
    },
    notFound: {
        schema: {
            example: {
                message: 'user not found',
                error: 'Not Found',
                statusCode: 404,
            },
        },
    },
};

export const deleteUserResponse: ApiResponseSchema = {
    ok: {},
    unauthorized: {
        schema: {
            example: {
                message: 'Unauthorized',
                statusCode: 401,
            },
        },
    },
    notFound: {
        schema: {
            example: {
                message: 'user not found',
                error: 'Not Found',
                statusCode: 404,
            },
        },
    },
};

export const SignInUserResponse: ApiResponseSchema = {
    ok: {
        schema: {
            example: {
                access_token:
                    '$2a$10$TYLWGxA6wUQLgHbxEaUSveJZJ9hzdtc6YcVMj/3uzirSUr5u3dQM.',
            },
        },
    },
    unauthorized: {
        schema: {
            example: {
                message: 'wrong credentials provided',
                error: 'Unauthorized',
                statusCode: 401,
            },
        },
    },
};

export const GetProfileResponse: ApiResponseSchema = {
    ok: {
        schema: {
            example: {
                email: 'email@test.com',
                id: 1,
                role: 'admin',
            },
        },
    },
};
