import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.repo.save(createProductDto);
    return product;
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(mark: string) {
    try {
      const product = await this.repo.findOneOrFail({ where: { mark } });
      return product;
    } catch (error) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
  }

  async update(updateProductDto: UpdateProductDto) {
    try {
      const existingProduct = await this.repo.findOneOrFail({
        where: { mark: updateProductDto.mark },
      });

      const updatedProduct = await this.repo.save({
        ...existingProduct,
        ...updateProductDto,
      });

      return updatedProduct;
    } catch (error) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
  }

  async remove(mark: string) {
    const deleteResult = await this.repo.delete(mark);
    if (deleteResult.affected === 0) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return 'Data deleted';
  }
}

