import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {

  constructor(@InjectRepository(Order) private repo: Repository<Order>) {}
  async create(createOrderDto: CreateOrderDto) {
    const order = await this.repo.save(createOrderDto);
    return order;
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(mark: string) {
    const order = await this.repo.findOne({ where: { mark } });
    if (!order) {
      throw new HttpException('Илэрц олдсонгүй', HttpStatus.NOT_FOUND);
    }
    return order;
  }

  async update(updateOrderDto: UpdateOrderDto) {
    const order = await this.repo.findOne({ where: { mark: updateOrderDto.mark } });
    if (!order) {
      throw new HttpException('Илэрц олдсонгүй', HttpStatus.NOT_FOUND);
    }
    const updated = await this.repo.update(updateOrderDto.mark, updateOrderDto);
    return updated;
  }

  async remove(mark: string) {
    await this.repo.delete(mark);
    return 'Мэдээлэл устгагдлаа';
  }
}
