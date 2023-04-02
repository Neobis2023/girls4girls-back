import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { Image } from '../image/entities/image.entity';
import { ImageService } from '../image/image.service';
import { CreateTrainingDto } from './dto';
import { SearchTrainingDto } from './dto';
import { Training } from './entities';
import { ListParamsDto } from '../../base/dto/list-params.dto';
import { ListDto } from '../../base/dto/list.dto';

@Injectable()
export class TrainingsService extends BaseService<Training> {
  constructor(
    @InjectRepository(Training)
    private readonly trainingRepo: Repository<Training>,
    @InjectRepository(Image)
    private readonly imageRepo: Repository<Image>,
    private readonly imageService: ImageService,
  ) {
    super(trainingRepo);
  }

  async createNewTraining(
    createTrainingDto: CreateTrainingDto,
    file: Express.Multer.File,
  ) {
    const training = new Training();
    if (file) {
      const images: Image[] = [];
      const image = await this.imageService.createImage(file);
      images.push(image);
      createTrainingDto.images = images;
    }
    training.absorbFromDto(createTrainingDto);
    return await this.trainingRepo.save(training);
  }

  async listTrainings(listParamsDto: ListParamsDto) {
    const array = await this.trainingRepo
      .createQueryBuilder('training')
      .leftJoinAndSelect('training.images', 'images')
      .limit(listParamsDto.limit)
      .offset(listParamsDto.countOffset())
      .orderBy(
        `training.${listParamsDto.getOrderedField()}`,
        listParamsDto.order,
      )
      .getMany();
    const itemsCount = await this.repository.createQueryBuilder().getCount();
    return new ListDto(array, {
      page: listParamsDto.page,
      itemsCount,
      limit: listParamsDto.limit,
      order: listParamsDto.order,
      orderField: listParamsDto.orderField,
    });
  }

  async findOne(searchTrainingDto: SearchTrainingDto) {
    return await this.trainingRepo.findOneBy(searchTrainingDto);
  }

  async checkIfTrainingExist(searchTrainingDto: SearchTrainingDto) {
    const training = await this.trainingRepo
      .createQueryBuilder('training')
      .where('training.title = : title', { title: searchTrainingDto.title })
      .orWhere('training.description = :description', {
        description: searchTrainingDto.description,
      })
      .getOne();
    if (!training) {
      return false;
    }
    return true;
  }

  async deleteTraining(training_id: number) {
    const training = await this.trainingRepo.findOneBy({ id: training_id });
    if (training) {
      await this.trainingRepo.delete({ id: training?.id });
      return `Training is successfully removed! `;
    }
    return `Training is not found!`;
  }

  async pastList() {
    return await this.repository
      .createQueryBuilder('training')
      .where('training.endDate < :currentDate', { currentDate: new Date() })
      .getMany();
  }

  async listFuture() {
    return await this.repository
      .createQueryBuilder('training')
      .where('training.endDate > :currentDate', { currentDate: new Date() })
      .getMany();
  }
}
