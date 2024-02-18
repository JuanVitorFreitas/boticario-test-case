import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Role } from '../enums/roles.enum';

export interface UserPayload {
    role: Role;
    email: string;
    id: number;
}

export const User = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): UserPayload => {
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    }
);
