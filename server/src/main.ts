import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from "@nestjs/platform-express"

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const isProd = process.env.npm_lifecycle_event==="start" || process.env.npm_lifecycle_event==="start:prod";
  const corsPort = isProd?"8888":"5173";
  console.log(`isProd=${isProd}`, corsPort);
  //app.set('trust proxy', true); 
  if (!isProd){
    app.enableCors({
      origin: [`http://localhost:${corsPort}`,`http://127.0.0.1:${corsPort}`,`0.0.0.0:${corsPort}`],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: '*',
      credentials: true,
    });
  }else{
    app.set('trust proxy', 1);
  }
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
