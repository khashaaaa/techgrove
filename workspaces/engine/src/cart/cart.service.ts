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
    const cart = await this.repo.findOne({ where: { mark } });
    if (!cart) {
      throw new HttpException('Илэрц олдсонгүй', HttpStatus.NOT_FOUND);
    }
    return cart;
  }

  async update(updateCartDto: UpdateCartDto) {
    const cart = await this.repo.findOne({
      where: { mark: updateCartDto.mark },
    })
    if (!cart) {
      throw new HttpException('Илэрц олдсонгүй', HttpStatus.NOT_FOUND);
    }
    const updated = await this.repo.update(updateCartDto.mark, updateCartDto);
    return updated;
  }

  async remove(mark: number): Promise<string> {
    await this.repo.delete(mark);
    return 'Мэдээлэл устгагдлаа';
  }
}
