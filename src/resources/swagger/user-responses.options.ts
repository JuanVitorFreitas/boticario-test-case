import { ApiResponseSchema } from './api-response-schema';

export const createUserResponse: ApiResponseSchema = {
    success: {
        schema: {
            example: {
                email: 'test@test.com',
                usermame: 'testuser',
                nome: 'Test User',
                cpf: '12345678901',
                telefone: '11999999997',
                data_nascimento: '2000-02-18T08:59:34.507Z',
                createdAt: '2024-02-18T08:59:34.507Z',
            },
        },

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
                message: 'duplicate-cpf',
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
                message: 'duplicate-cpf',
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
                    usermame: 'testuser',
                    nome: 'Test User',
                    cpf: '12345678901',
                    telefone: '11999999997',
                    data_nascimento: '2000-02-18T08:59:34.507Z',
                    createdAt: '2024-02-18T08:59:34.507Z',
                },
                {
                    email: 'test1@test.com',
                    usermame: 'testuser1',
                    nome: 'Test User 1',
                    cpf: '12345678902',
                    telefone: '11999999997',
                    data_nascimento: '2005-02-18T08:59:34.507Z',
                    createdAt: '2024-02-18T08:59:34.507Z',
                },
            ],
        },

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
};

export const findOneResponse: ApiResponseSchema = {
    ok: {
        schema: {
            example: {
                email: 'test@test.com',
                usermame: 'testuser',
                nome: 'Test User',
                cpf: '12345678901',
                telefone: '11999999997',
                data_nascimento: '2000-02-18T08:59:34.507Z',
                createdAt: '2024-02-18T08:59:34.507Z',
            },
        },

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
                message: 'duplicate-cpf',
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
            },
        },
    },
};
