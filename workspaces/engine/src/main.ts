import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: 'http://140.99.243.243',
    // origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS'
  })
  const port = process.env.PROG_PORT || 8080
  await app.listen(port)
}

bootstrap()
