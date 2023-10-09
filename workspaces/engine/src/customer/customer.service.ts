import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity'

@Injectable()
export class CustomerService {

  constructor(@InjectRepository(Customer) private repo: Repository<Customer>) {}

  async create(createCustomerDto: CreateCustomerDto) {
    
    try {
      const customer = await this.repo.save(createCustomerDto)

      return customer
    }
    catch(fault) {
      throw new HttpException('Алдаа гарлаа' + fault.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findAll() {

    try {
      const customers = await this.repo.find();

      return customers;
    } 
    catch (fault) {
      throw new HttpException('Алдаа гарлаа' + fault.message, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(mark: string) {
    
    try {
      const customer = await this.repo.findOne({ where: { mark } })

      if (!customer) {
        throw new HttpException('Илэрц олдсонгүй', HttpStatus.NOT_FOUND);
      }

      return customer;
    } 
    catch (fault) {
      throw new HttpException('Мэдээлэлээ дахин шалгана уу', HttpStatus.BAD_REQUEST)
    }
  }

  async update(updateCustomerDto: UpdateCustomerDto) {
    
    try {
      const customer = await this.repo.findOne({
        where: { mark: updateCustomerDto.mark },
      });

      if (!customer) {
        throw new HttpException('Илэрц олдсонгүй', HttpStatus.NOT_FOUND);
      }

      customer.email = updateCustomerDto.email;
      customer.mobile = updateCustomerDto.mobile;
      customer.given_name = updateCustomerDto.given_name;
      customer.parent_name = updateCustomerDto.parent_name;
      customer.facebook_id = updateCustomerDto.facebook_id;
      customer.google_id = updateCustomerDto.google_id;

      const updated = await this.repo.save(customer);

      return updated;
    } catch (fault) {
      throw new HttpException('Мэдээлэлээ дахин шалгана уу: ' + fault.message, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(mark: string) {
    
    try {

      await this.repo.delete(mark);

      return 'Мэдээлэл устгагдлаа';
    } catch (fault) {
      throw new HttpException('Мэдээлэлээ дахин шалгана уу: ' + fault.message, HttpStatus.BAD_REQUEST)
    }
  }
}
