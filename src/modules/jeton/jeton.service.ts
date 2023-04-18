import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateJetonDto } from './dto/create-jeton.dto';
import { BaseService } from '../../base/base.service';
import { Jeton } from './entities/jeton.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, LessThanOrEqual, Repository } from 'typeorm';
import { SearchJetonDto } from './dto/search-jeton.dto';
import { UpdateJetonDto } from './dto/update-jeton.dto';
import { Image } from '../image/entities/image.entity';
import { ImageService } from '../image/image.service';
import { UserService } from '../user/user.service';
import { UpdateProfileDto } from '../user/dto/update-profile.dto';
import { CreateCardInfoDto } from './dto/create-card-info.dto';
import { CardInfo } from './entities/card-info.entity';

@Injectable()
export class JetonService extends BaseService<Jeton> {
  constructor(
    @InjectRepository(Jeton)
    private readonly jetonsRepository: Repository<Jeton>,
    @InjectRepository(CardInfo)
    private readonly cardInfoRepository: Repository<CardInfo>,
    private readonly imageService: ImageService,
    private readonly userService: UserService,
  ) {
    super(jetonsRepository);
  }

  async create(createJetonDto: CreateJetonDto, file: Express.Multer.File) {
    const existingJeton = await this.findBy({ title: createJetonDto.title });
    if (existingJeton) {
      throw new BadRequestException('Jeton with this title already exists');
    }

    const newJeton = this.jetonsRepository.create(createJetonDto);

    if (file) {
      const image: Image = await this.imageService.createImage(file);
      newJeton.image = image;
    }

    if (createJetonDto.cardInfoId) {
      const card = await this.cardInfoRepository.findOneBy({
        id: createJetonDto.cardInfoId,
      });
      if (card) {
        newJeton.cardInfo = card;
      }
    }

    return this.jetonsRepository.save(newJeton);
  }

  async createCardInfo(
    createCardInfoDto: CreateCardInfoDto,
    file: Express.Multer.File,
  ) {
    const newCardInfo = this.cardInfoRepository.create(createCardInfoDto);
    if (file) {
      const image: Image = await this.imageService.createImage(file);
      newCardInfo.image = image;
    }

    return this.cardInfoRepository.save(newCardInfo);
  }

  async update(id: number, updateJetonDto: UpdateJetonDto) {
    const jeton = await this.get(id);
    if (!jeton) {
      throw new BadRequestException(`Jeton with id: ${id} not found`);
    }

    const result = await this.assignJetonForWatchedVideos(66, 6);
    console.log(result);
    return await this.jetonsRepository.update({ id }, updateJetonDto);
  }

  async delete(id: number) {
    const jeton = await this.get(id);
    jeton.isDeleted = true;
    return await this.jetonsRepository.delete({ id });
  }

  async assignJetonForWatchedVideos(
    userId: number,
    watchedVideosQuantity: number,
  ) {
    const user = await this.userService.getProfile(userId);
    const jetonForWatchedVideos = await this.jetonsRepository.findOne({
      where: {
        quantityToGet: LessThanOrEqual(watchedVideosQuantity),
      },
      order: {
        quantityToGet: 'DESC',
      },
    });
    const isUserAlreadyHaveJeton = user.jetons.find(
      (jeton) => jeton.id === jetonForWatchedVideos.id,
    );

    if (!isUserAlreadyHaveJeton) {
      user.jetons.push(jetonForWatchedVideos);
      user.updatedAt = new Date();
      await this.userService.justSaveUser(user);
    }
    console.log(isUserAlreadyHaveJeton);

    return jetonForWatchedVideos;
  }

  async findBy(searchJetonDto: SearchJetonDto) {
    return await this.jetonsRepository.findOneBy(searchJetonDto);
  }
}
