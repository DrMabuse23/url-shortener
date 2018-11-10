import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './core/pipes/validation/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  const options = new DocumentBuilder()
    .setTitle('Pascal Brewing V1 API')
    .setDescription('The URL Shortener API')
    .setVersion('1.0')
    .addTag('URL Shorten')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  app.useGlobalPipes(new ValidationPipe());
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
