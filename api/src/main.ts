import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { globalLogger, LoggerMiddleware } from './middlewares/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(new LoggerMiddleware().use);
  app.use(globalLogger);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
