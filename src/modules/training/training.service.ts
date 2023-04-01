import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/base.service';
import { Repository } from 'typeorm';
import { Image } from '../image/entities/image.entity';
import { ImageService } from '../image/image.service';
import { CreateTrainingDto } from './dto/create-training.dto';
import { SearchTrainingDto } from './dto/search-training.dto';
import { Training } from './entities/training.entity';

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

  getOneByTitle(title: string) {
    const findByTitle = this.trainingRepo.findOne({
      where: { title },
      relations: ['image'],
    });
    if (!findByTitle) {
      throw new BadRequestException(` Training with such title is not found!`);
    }
    return findByTitle;
  }

  async createNewTraining(
    createTrainingDto: CreateTrainingDto,
    file: Express.Multer.File,
  ) {
    const images: Image[] = [];
    const image = await this.imageService.createImage(file);
    images.push(image);

    const training = new Training();
    training.absorbFromDto(createTrainingDto);
    training.image = images;
    return await this.trainingRepo.save(training);
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
