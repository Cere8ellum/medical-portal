/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app/app.module';
import cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule
  );
  const globalPrefix = 'api';
  app.use(cookieParser());
  app.enableCors({
    origin: ['http://localhost:3002','http://localhost:4200'],
    credentials: true
  });
  app.setGlobalPrefix(globalPrefix);
  //app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(__dirname, '..', '..', '..', 'public'));

  const port = process.env.PORT || 3000;

  // Swagger
  const docConfig = new DocumentBuilder()
    .setTitle('Medical Portal')
    .setDescription('API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('api', app, document);

  // Port
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
