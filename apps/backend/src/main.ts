/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.enableCors();
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();



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
  console.log('dirname',__dirname)
}

bootstrap();
