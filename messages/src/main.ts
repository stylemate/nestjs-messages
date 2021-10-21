import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
    FastifyAdapter,
    NestFastifyApplication
} from '@nestjs/platform-fastify';
import { MessagesModule } from './messages/messages.module';

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(
        MessagesModule,
        new FastifyAdapter({
            logger: true
        })
    );
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
}
bootstrap();
