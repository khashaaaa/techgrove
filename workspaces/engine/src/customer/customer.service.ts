import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(@InjectRepository(Customer) private repo: Repository<Customer>) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const customer = await this.repo.save(createCustomerDto);
    return customer;
  }

  async findAll() {
    return await this.repo.find();
  }

  async findOne(mark: string) {
    const customer = await this.repo.findOne({ where: { mark } });
    if (!customer) {
      throw new HttpException('Илэрц олдсонгүй', HttpStatus.NOT_FOUND);
    }
    return customer;
  }

  async update(updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.repo.findOne({
      where: { mark: updateCustomerDto.mark },
    });
    if (!customer) {
      throw new HttpException('Илэрц олдсонгүй', HttpStatus.NOT_FOUND);
    }
    const updated = await this.repo.update(updateCustomerDto.mark, updateCustomerDto);
    return updated;
  }

  async remove(mark: string) {
    await this.repo.delete(mark);
    return 'Мэдээлэл устгагдлаа';
  }
}