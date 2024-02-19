import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            disableErrorMessages: process.env.NODE_ENV === 'production',
            whitelist: true,
            forbidNonWhitelisted: true,
        })
    );

    const config = new DocumentBuilder()
        .setTitle('Test Case GB')
        .setDescription('')
        .setVersion('1.0')
        .addBearerAuth(
            {
                description: `Please enter token in following format: Bearer <JWT>`,
                name: 'Authorization',
                bearerFormat: 'Bearer',
                scheme: 'Bearer',
                type: 'http',
                in: 'Header',
            },
            'access-token'
        )
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
}

bootstrap();
