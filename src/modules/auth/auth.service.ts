import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { UserStatus } from '../../enums/userStatus.enum';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn(
        email: string,
        password: string
    ): Promise<{ access_token: string }> {
        const user = await this.usersService.findByEmail(email);

        if (user.status === UserStatus.Inactive) {
            throw new UnauthorizedException('user account not active');
        }

        const isPasswordMatching = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordMatching) {
            throw new UnauthorizedException('wrong credentials provided');
        }

        const payload = { sub: user.id, email: user.email, role: user.role };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
