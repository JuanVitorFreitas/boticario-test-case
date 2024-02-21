import { ApiResponseSchema } from './api-response-schema';

export const createOrderResponse: ApiResponseSchema = {
    success: {
        schema: {
            example: {
                numero_pedido: 1,
                valor_total_pedido: 1500,
                status: true,
                cliente_id: 13,
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

export const updateOrderResponse: ApiResponseSchema = {
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
                message: 'order not found',
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
                    numero_pedido: 1,
                    valor_total_pedido: 1500,
                    status: true,
                    cliente_id: 13,
                },
                {
                    numero_pedido: 2,
                    valor_total_pedido: 3000,
                    status: true,
                    cliente_id: 14,
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
                numero_pedido: 1,
                valor_total_pedido: 1500,
                status: true,
                cliente_id: 13,
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

export const deleteOrderResponse: ApiResponseSchema = {
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
                message: 'order not found',
                error: 'Not Found',
                statusCode: 404,
            },
        },
    },
};
