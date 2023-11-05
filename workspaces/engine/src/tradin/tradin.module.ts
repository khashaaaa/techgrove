import { Module } from '@nestjs/common';
import { TradinService } from './tradin.service';
import { TradinController } from './tradin.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Tradin } from './entities/tradin.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([Tradin])
  ],
  controllers: [TradinController],
  providers: [TradinService],
})
export class TradinModule {}
