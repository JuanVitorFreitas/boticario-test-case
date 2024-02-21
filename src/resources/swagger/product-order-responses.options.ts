import { ApiResponseSchema } from './api-response-schema';

export const createProductOrderResponse: ApiResponseSchema = {
    success: {
        schema: {
            example: {
                produto_pedido_id: 1,
                qtd_produto_pedido: 5,
                preco_produto_pedido: 500,
                produto_id: 2,
                pedido_id: 2,
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

export const updateProductOrderResponse: ApiResponseSchema = {
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
                message: 'product order not found',
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
                    produto_pedido_id: 1,
                    qtd_produto_pedido: 5,
                    preco_produto_pedido: 500,
                    produto_id: 2,
                    pedido_id: 2,
                },
                {
                    produto_pedido_id: 2,
                    qtd_produto_pedido: 10,
                    preco_produto_pedido: 2500,
                    produto_id: 2,
                    pedido_id: 2,
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
                produto_pedido_id: 1,
                qtd_produto_pedido: 5,
                preco_produto_pedido: 500,
                produto_id: 2,
                pedido_id: 2,
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

export const deleteProductOrderResponse: ApiResponseSchema = {
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
                message: 'product order not found',
                error: 'Not Found',
                statusCode: 404,
            },
        },
    },
};
