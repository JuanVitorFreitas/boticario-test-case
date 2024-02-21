import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { SigInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signIn({ cpf, senha }: SigInDto): Promise<{ access_token: string }> {
        const user = await this.usersService.findByCpf(cpf);

        if (!user.senha) {
            throw new UnauthorizedException('user without password');
        }

        const isPasswordMatching = await bcrypt.compare(senha, user.senha);

        if (!isPasswordMatching) {
            throw new UnauthorizedException('wrong credentials provided');
        }

        const payload = { sub: user.cliente_id, email: user.email };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
