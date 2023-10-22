import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { JwtAuthGuard } from 'src/auth/auth.guard';

@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) { }

  @Post('login')
  async login(@Body() createCustomerDto: CreateCustomerDto) {
    return await this.customerService.login(createCustomerDto)
  }

  @Post()
  async create(@Body() createCustomerDto: CreateCustomerDto) {
    return await this.customerService.create(createCustomerDto)
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return await this.customerService.findAll();
  }

  @Get(':mark')
  async findOne(@Param('mark') mark: string) {
    return await this.customerService.findOne(mark);
  }

  @Patch(':mark')
  async update(@Param('mark') @Body() updateCustomerDto: UpdateCustomerDto) {
    return await this.customerService.update(updateCustomerDto);
  }

  @Delete(':mark')
  async remove(@Param('mark') mark: string) {
    return await this.customerService.remove(mark);
  }
}