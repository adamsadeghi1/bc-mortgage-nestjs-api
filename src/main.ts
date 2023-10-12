import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('BC Mortgage Apis')
    .setDescription('Bc Mortgage Calculator')
    .setVersion('1.0')
    .addTag('BC-Mortgage')
    .build();

  const app = await NestFactory.create(AppModule);

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3005);
}
bootstrap();
