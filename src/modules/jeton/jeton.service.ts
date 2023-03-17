import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateJetonDto } from './dto/create-jeton.dto';
import { BaseService } from '../../base/base.service';
import { Jeton } from './entities/jeton.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SearchJetonDto } from './dto/search-jeton.dto';
import { UpdateJetonDto } from './dto/update-jeton.dto';

@Injectable()
export class JetonService extends BaseService<Jeton> {
  constructor(
    @InjectRepository(Jeton)
    private readonly jetonsRepository: Repository<Jeton>,
  ) {
    super(jetonsRepository);
  }

  async create(createJetonDto: CreateJetonDto) {
    const existingJeton = await this.findBy({ title: createJetonDto.title });
    if (existingJeton) {
      throw new BadRequestException('Jeton with this title already exists');
    }

    const newJeton = this.jetonsRepository.create(createJetonDto);
    return this.jetonsRepository.save(newJeton);
  }

  async update(id: number, updateJetonDto: UpdateJetonDto) {
    const jeton = await this.get(id);
    if (!jeton) {
      throw new BadRequestException(`Jeton with id: ${id} not found`);
    }

    return await this.jetonsRepository.update({ id }, updateJetonDto);
  }

  async delete(id: number) {
    return await this.jetonsRepository.delete({ id });
  }

  async findBy(searchJetonDto: SearchJetonDto) {
    return await this.jetonsRepository.findOneBy(searchJetonDto);
  }
}
