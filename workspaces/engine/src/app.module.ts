import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { envconfig } from 'config/envconfig'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CustomerModule } from './customer/customer.module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { ReturnModule } from './return/return.module';
import { JwtModule } from '@nestjs/jwt'
import { TradinModule } from './tradin/tradin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/config/variables/${process.env.NODE_ENV}.env`,
      isGlobal: true,
      load: [envconfig]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (confserv: ConfigService) => ({
        type: 'postgres',
        host: confserv.get('PG_HOST'),
        port: confserv.get('PG_PORT'),
        username: confserv.get('PG_USER'),
        password: confserv.get('PG_PWD'),
        database: confserv.get('PG_NAME'),
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (confs: ConfigService) => ({
        global: true,
        secret: confs.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1d'
        }
      }),
      inject: [ConfigService]
    }),
    CustomerModule,
    OrderModule,
    ProductModule,
    CartModule,
    ReturnModule,
    TradinModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
