import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(@InjectRepository(Cart) private repo: Repository<Cart>) {}

  async create(createCartDto: CreateCartDto) {
    const cart = await this.repo.save(createCartDto);
    return cart;
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(mark: number) {
    try {
      const cart = await this.repo.findOneOrFail({ where: { mark } });
      return cart;
    } catch (error) {
      throw new HttpException('Cart not found', HttpStatus.NOT_FOUND);
    }
  }

  async update(updateCartDto: UpdateCartDto) {
    try {
      const existingCart = await this.repo.findOneOrFail({
        where: { mark: updateCartDto.mark },
      });

      const updatedCart = await this.repo.save({
        ...existingCart,
        ...updateCartDto,
      });

      return updatedCart;
    } catch (error) {
      throw new HttpException('Cart not found', HttpStatus.NOT_FOUND);
    }
  }

  async remove(mark: number): Promise<string> {
    const deleteResult = await this.repo.delete(mark);
    if (deleteResult.affected === 0) {
      throw new HttpException('Cart not found', HttpStatus.NOT_FOUND);
    }
    return 'Data deleted';
  }
}
