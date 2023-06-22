import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/base.service';
import { CharacterImage } from './entities/character-image.entity';
import { CreateCharacterImageDto } from './dto/create-character-image.dto';
import { ImageService } from '../image/image.service';
import { UserService } from '../user/user.service';
import { Image } from '../image/entities/image.entity';
import { AddCharacterToUserDto } from './dto/add-character-to-user.dto';

@Injectable()
export class CharacterService extends BaseService<Character> {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
    @InjectRepository(CharacterImage)
    private readonly characterImageRepository: Repository<CharacterImage>,
    private readonly imageService: ImageService,
    private readonly userService: UserService,
  ) {
    super(characterRepository);
  }

  async getCharacterImages() {
    return this.characterImageRepository.find({
      where: {
        isDeleted: false,
      },
      relations: ['images'],
    });
  }

  async findCharacterImage(id: number): Promise<CharacterImage> {
    const characterImage = await this.characterImageRepository.findOne({
      where: {
        id,
      },
    });

    if (!characterImage) {
      throw new BadRequestException('Not found!');
    }

    return characterImage;
  }

  async softDeleteCharacterImage(id: number) {
    const characterImage = await this.findCharacterImage(id);
    characterImage.isDeleted = true;
    return this.characterImageRepository.save(characterImage);
  }

  async addCharacterToUser(
    addCharacterToUser: AddCharacterToUserDto,
    userId: number,
  ) {
    const { name, characterImageId } = addCharacterToUser;

    const user = await this.userService.getProfile(userId);
    const characterImage = await this.findCharacterImage(characterImageId);

    const character = new Character();
    character.name = name;
    character.characterImage = characterImage;
    character.user = user;
    return this.characterRepository.save(character);
  }

  async createCharacterImage(
    createCharacterImage: CreateCharacterImageDto,
    files: Express.Multer.File[],
  ) {
    if (!files) {
      throw new BadRequestException('Images are not provided!');
    }

    const images: Image[] = [];
    for await (const file of files) {
      const image = await this.imageService.createImage(file);
      images.push(image);
    }
    createCharacterImage.images = images;
    const characterImage = new CharacterImage();
    characterImage.absorbFromDto(createCharacterImage);
    return this.characterImageRepository.save(characterImage);
  }
}
