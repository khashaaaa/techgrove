import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS'
  })
  const port = process.env.PROG_PORT || 8080
  await app.listen(port)
}

bootstrap()
