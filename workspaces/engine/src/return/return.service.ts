import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateReturnDto } from './dto/create-return.dto';
import { UpdateReturnDto } from './dto/update-return.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Return } from './entities/return.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReturnService {
  constructor(@InjectRepository(Return) private repo: Repository<Return>) { }

  async create(createReturnDto: CreateReturnDto) {
    const ret = await this.repo.save(createReturnDto);
    return ret;
  }

  async findAll() {
    return this.repo.find();
  }

  async findOne(mark: number) {
    try {
      const ret = await this.repo.findOneOrFail({ where: { mark } });
      return ret;
    } catch (error) {
      throw new HttpException('Return not found', HttpStatus.NOT_FOUND);
    }
  }

  async update(updateReturnDto: UpdateReturnDto) {
    try {
      const existingRet = await this.repo.findOneOrFail({
        where: { mark: updateReturnDto.mark },
      });

      const updatedRet = await this.repo.save({
        ...existingRet,
        ...updateReturnDto,
      });

      return updatedRet;
    } catch (error) {
      throw new HttpException('Return not found', HttpStatus.NOT_FOUND);
    }
  }

  async remove(mark: number): Promise<string> {
    const deleteResult = await this.repo.delete(mark);
    if (deleteResult.affected === 0) {
      throw new HttpException('Return not found', HttpStatus.NOT_FOUND);
    }
    return 'Data deleted';
  }
}

