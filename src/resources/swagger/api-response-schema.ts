import { ApiResponseOptions } from '@nestjs/swagger';

export type ApiResponseSchema = {
    [key in
        | 'success'
        | 'ok'
        | 'unauthorized'
        | 'conflict'
        | 'notFound']?: ApiResponseOptions;
};
