import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ReturnService } from './return.service';
import { CreateReturnDto } from './dto/create-return.dto';
import { UpdateReturnDto } from './dto/update-return.dto';

@Controller('return')
export class ReturnController {
  constructor(private readonly returnService: ReturnService) { }

  @Post()
  async create(@Body() createReturnDto: CreateReturnDto) {
    return await this.returnService.create(createReturnDto);
  }

  @Get()
  async findAll() {
    return await this.returnService.findAll();
  }

  @Get(':mark')
  async findOne(@Param('mark') mark: number) {
    return await this.returnService.findOne(mark);
  }

  @Patch(':mark')
  async update(@Param('mark') @Body() updateReturnDto: UpdateReturnDto) {
    return await this.returnService.update(updateReturnDto);
  }

  @Delete(':mark')
  async remove(@Param('mark') mark: number) {
    return await this.returnService.remove(mark);
  }
}
