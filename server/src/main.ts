import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsPort = process.env.npm_lifecycle_event==="start"?"8080":"5173";
  console.log(process.env.npm_lifecycle_event);
  app.enableCors({
    origin: [`http://localhost:${corsPort}`,`http://127.0.0.1:${corsPort}`],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: '*',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
