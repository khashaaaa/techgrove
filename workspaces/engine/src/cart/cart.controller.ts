import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { CartService } from './cart.service'
import { CreateCartDto } from './dto/create-cart.dto'
import { UpdateCartDto } from './dto/update-cart.dto'

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Post()
  async create(@Body() createCartDto: CreateCartDto) {
    return await this.cartService.create(createCartDto)
  }

  @Get()
  async findAll() {
    return await this.cartService.findAll()
  }

  @Get(':mark')
  async findOne(@Param('mark') mark: string) {
    return await this.cartService.findOne(mark)
  }

  @Patch(':mark')
  async update(@Param('mark') @Body() updateCartDto: UpdateCartDto) {
    return await this.cartService.update(updateCartDto)
  }

  @Delete(':mark')
  async remove(@Param('mark') mark: string) {
    return await this.cartService.remove(mark)
  }
}
