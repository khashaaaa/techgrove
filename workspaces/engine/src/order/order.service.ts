import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(@InjectRepository(Order) private repo: Repository<Order>) { }

  async create(createOrderDto: CreateOrderDto) {
    const order = await this.repo.save(createOrderDto);
    return order;
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(mark: string) {
    try {
      const order = await this.repo.findOneOrFail({ where: { mark } });
      return order;
    } catch (error) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
  }

  async update(updateOrderDto: UpdateOrderDto) {
    try {
      const existingOrder = await this.repo.findOneOrFail({
        where: { mark: updateOrderDto.mark },
      });

      const updatedOrder = await this.repo.save({
        ...existingOrder,
        ...updateOrderDto,
      });

      return updatedOrder;
    } catch (error) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
  }

  async remove(mark: string) {
    const deleteResult = await this.repo.delete(mark);
    if (deleteResult.affected === 0) {
      throw new HttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    return 'Data deleted';
  }
}

