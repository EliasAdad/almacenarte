import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middlewares/logger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(new LoggerMiddleware().use);
  // app.use(globalLogger);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors) => {
        const cleanErrors = errors.map((error) => {
          return { property: error.property, constraints: error.constraints };
        });

        return new BadRequestException({
          alert: 'The following errors have been detected',
          errors: cleanErrors,
        });
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
