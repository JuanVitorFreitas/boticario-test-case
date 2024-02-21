import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../decorators/public.decorator';
import { Swagger } from '../../decorators/swagger.decorator';
import { AuthGuard } from '../../guards/auth.guard';
import {
    GetProfileResponse,
    SignInUserResponse,
} from '../../resources/swagger/user-responses.options';
import { AuthService } from './auth.service';
import { SigInDto } from './dto/signin.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Swagger(SignInUserResponse)
    @Post('login')
    signIn(@Body() signInDto: SigInDto) {
        return this.authService.signIn(signInDto);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    @Swagger(GetProfileResponse)
    getProfile(@Request() req) {
        return req.user;
    }
}
