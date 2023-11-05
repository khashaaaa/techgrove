import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TradinService } from './tradin.service';
import { CreateTradinDto } from './dto/create-tradin.dto';
import { UpdateTradinDto } from './dto/update-tradin.dto';

@Controller('tradin')
export class TradinController {
  constructor(private readonly tradinService: TradinService) {}

  @Post()
  create(@Body() createTradinDto: CreateTradinDto) {
    return this.tradinService.create(createTradinDto)
  }

  @Get()
  findAll() {
    return this.tradinService.findAll()
  }

  @Get(':mark')
  findOne(@Param('mark') mark: number) {
    return this.tradinService.findOne(mark)
  }

  @Patch(':mark')
  update(@Param('mark') @Body() updateTradinDto: UpdateTradinDto) {
    return this.tradinService.update(updateTradinDto)
  }

  @Delete(':mark')
  remove(@Param('mark') mark: number) {
    return this.tradinService.remove(mark)
  }
}
