import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = process.env.PROG_PORT
  await app.listen(port ? parseInt(port) : 8080);
  console.log('Application is started on port: ' + parseInt(port))
}
bootstrap();
