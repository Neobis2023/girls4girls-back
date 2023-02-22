import { BadRequestException, Injectable } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { title } from 'process';
import { BaseService } from 'src/base/base.service';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import { Repository } from 'typeorm';
import { Image } from '../image/entities/image.entity';
import { ImageService } from '../image/image.service';
import { CreateTrainingDto } from './dto/create-training.dto';
import { SearchTrainingDto } from './dto/search-training.dto';
import { Training } from './entities/training.entity';

@Injectable()
export class TrainingsService extends BaseService<Training>{
  constructor(
    @InjectRepository(Training) private readonly trainingRepo: Repository<Training>,
    private readonly imageService: ImageService
  ){
    super(trainingRepo)
  }

  async getOneByTitle(title: string){
    const findByTitle  = await this.trainingRepo.findOne({where:{title}})
    console.log(findByTitle)
    if(findByTitle === null){
      throw new BadRequestException(` Training with such title is not found!`)
    }
    return findByTitle
  }

  async createNewTraining(createTrainingDto: CreateTrainingDto, file: Express.Multer.File){
    const images: Image[] = []
    const image = await this.imageService.createImage(file)
    images.push(image)
    console.log(image)

    const training = new Training()
    training.absorbFromDto(createTrainingDto)
    training.image = images
    return await this.trainingRepo.save(training)
  }

  async findOne(searchTrainingDto: SearchTrainingDto){
    return await this.trainingRepo.findOneBy(searchTrainingDto)
  }

  async checkIfTrainingExist(searchTrainingDto: SearchTrainingDto){
    const training = await this.trainingRepo
                    .createQueryBuilder('training')
                    .where('training.title = : title',{title: searchTrainingDto.title})
                    .orWhere('training.description = :description',{description : searchTrainingDto.description})
                    .getOne()
    if(!training){
      return false
    }
    return true
  }

  async deleteTraining(title: string){
    const training = await this.trainingRepo.findOneBy({title})
    if(training){
      await this.trainingRepo.remove(training)
      return `Training is successfully removed! `
    }
    return `Training is not found!`
  }
}
