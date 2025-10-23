import { sdk } from './tracer';
import { log } from './infra/logger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

sdk.start();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 8080);
  log.info(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
