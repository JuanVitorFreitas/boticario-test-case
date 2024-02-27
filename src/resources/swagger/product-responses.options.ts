import { ApiResponseSchema } from './api-response-schema';

export const createProductResponse: ApiResponseSchema = {
    success: {
        schema: {
            example: {
                nome_categoria: 'Perfumes',
                descricao_categoria: 'Perfumes masculinos e femininos',
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
};

export const updateProductResponse: ApiResponseSchema = {
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
                message: 'product not found',
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
                    nome_categoria: 'Perfumes',
                    descricao_categoria: 'Perfumes masculinos e femininos',
                },
                {
                    nome_categoria: 'Cremes',
                    descricao_categoria: 'Cremes para cuidados com a pele',
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
                nome_categoria: 'Perfumes',
                descricao_categoria: 'Perfumes masculinos e femininos',
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
};

export const deleteProductResponse: ApiResponseSchema = {
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
                message: 'product not found',
                error: 'Not Found',
                statusCode: 404,
            },
        },
    },
};
