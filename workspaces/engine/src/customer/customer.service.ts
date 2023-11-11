import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateCustomerDto } from './dto/create-customer.dto'
import { UpdateCustomerDto } from './dto/update-customer.dto'
import { Customer } from './entities/customer.entity'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer) private repo: Repository<Customer>,
    private jwts: JwtService,
  ) { }

  async login(createCustomerDto: CreateCustomerDto) {
    const { email, mobile, password } = createCustomerDto

    const customer = await this.repo.findOne({
      where: [{ email }, { mobile }],
    })

    if (!customer) {
      throw new HttpException(
        'Хэрэглэгч байхгүй байна. Бүртгүүлнэ үү',
        HttpStatus.NOT_FOUND,
      )
    }

    if (email !== customer.email && mobile !== customer.mobile) {
      throw new HttpException('Мэдээлэл таарахгүй байна', HttpStatus.FORBIDDEN)
    }

    const isPasswordValid = await bcrypt.compare(password, customer.password)

    if (!isPasswordValid) {
      throw new HttpException(
        'Нууц үг таарахгүй байна',
        HttpStatus.UNAUTHORIZED,
      )
    }

    const access_token = await this.jwts.signAsync(
      { email, mobile },
      { secret: process.env.JWT_SECRET },
    )

    return {
      message: 'Амжилттай нэвтэрлээ',
      ok: true,
      access_token,
      customer,
    }
  }

  async create(createCustomerDto: CreateCustomerDto) {
    try {
      const existingCustomer = await this.repo.findOne({
        where: {
          email: createCustomerDto.email,
          mobile: createCustomerDto.mobile,
        },
      })

      if (existingCustomer) {
        throw new HttpException('Мэдээлэл давхцаж байна', HttpStatus.CONFLICT)
      }

      const saltOrRounds = 10
      const hashedPassword = await bcrypt.hash(
        createCustomerDto.password,
        saltOrRounds,
      )

      const customer = await this.repo.save({
        ...createCustomerDto,
        password: hashedPassword,
      })

      return {
        customer,
        message: 'Амжилттай бүртгэгдлээ',
        ok: true,
      }
    } catch (error) {
      throw new HttpException(error.message, error.status)
    }
  }

  async findAll() {
    const customers = await this.repo.find()

    return customers
  }

  async findOne(mark: string) {
    try {
      const customer = await this.repo.findOneOrFail({ where: { mark } })
      return customer
    } catch (error) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND)
    }
  }

  async update(updateCustomerDto: UpdateCustomerDto) {
    try {
      const existingCustomer = await this.repo.findOneOrFail({
        where: { mark: updateCustomerDto.mark },
      })

      const updatedCustomer = await this.repo.save({
        ...existingCustomer,
        ...updateCustomerDto,
      })

      return updatedCustomer
    } catch (error) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND)
    }
  }

  async remove(mark: string) {
    const deleteResult = await this.repo.delete(mark)
    if (deleteResult.affected === 0) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND)
    }
    return 'Data deleted'
  }
}
