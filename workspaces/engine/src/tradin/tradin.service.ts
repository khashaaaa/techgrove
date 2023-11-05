import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTradinDto } from './dto/create-tradin.dto';
import { UpdateTradinDto } from './dto/update-tradin.dto';
import { Tradin } from './entities/tradin.entity';

@Injectable()
export class TradinService {
  constructor(@InjectRepository(Tradin) private readonly tradinRepository: Repository<Tradin>) {}

  async create(createTradinDto: CreateTradinDto) {
    const tradin = await this.tradinRepository.save(createTradinDto);
    return {
      ok: true,
      tradin,
      message: 'Хүсэлт үүсгэгдлээ',
    };
  }

  async findAll() {
    return this.tradinRepository.find();
  }

  async findOne(mark: number) {
    const tradin = await this.tradinRepository.findOne({ where: { mark } });
    if (!tradin) {
      throw new HttpException('Мэдээлэл олдсонгүй', HttpStatus.NOT_FOUND);
    }
    return tradin;
  }

  async update(updateTradinDto: UpdateTradinDto) {
    const existingTradin = await this.tradinRepository.findOne({
      where: { mark: updateTradinDto.mark },
    });

    if (!existingTradin) {
      throw new HttpException('Мэдээлэл олдсонгүй', HttpStatus.NOT_FOUND);
    }

    const updatedTradin = await this.tradinRepository.save({
      ...existingTradin,
      ...updateTradinDto,
    });

    return updatedTradin;
  }

  async remove(mark: number) {
    const deleteResult = await this.tradinRepository.delete(mark);
    if (deleteResult.affected === 0) {
      throw new HttpException('Мэдээлэл олдсонгүй', HttpStatus.NOT_FOUND);
    }
    return {
      ok: true,
      deleteResult,
      message: 'Мэдээлэл устгагдлаа',
    };
  }
}
