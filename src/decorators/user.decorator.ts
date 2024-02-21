import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface UserPayload {
    email: string;
    id: number;
}

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): UserPayload => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    }
);
