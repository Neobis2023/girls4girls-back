import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLecturerDto } from './dto/create-lecturer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Lecturer } from './entities/lecturer.entity';
import { Repository } from 'typeorm';
import { Image } from '../image/entities/image.entity';
import { BaseService } from 'src/base/base.service';
import { ImageService } from '../image/image.service';
import { ListParamsDto } from 'src/base/dto/list-params.dto';
import { ListDto } from 'src/base/dto/list.dto';

@Injectable()
export class LecturerService extends BaseService<Lecturer> {
  constructor(
    @InjectRepository(Lecturer)
    private readonly lecturerRepository: Repository<Lecturer>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    private readonly imageService: ImageService,
  ) {
    super(lecturerRepository);
  }

  async createLecturer(
    createLecturerDto: CreateLecturerDto,
    file: Express.Multer.File,
  ) {
    const lecturer = new Lecturer();
    if (!file) {
      throw new BadRequestException('Image is not provided!');
    }
    const image = await this.imageService.createImage(file);
    lecturer.absorbFromDto(createLecturerDto);
    lecturer.image = image;
    return await this.lecturerRepository.save(lecturer);
  }

  async listLecturers(listParamsDto: ListParamsDto) {
    const array = await this.lecturerRepository
      .createQueryBuilder('lecturer')
      .leftJoinAndSelect('lecturer.image', 'image')
      .limit(listParamsDto.limit)
      .offset(listParamsDto.countOffset())
      .orderBy(
        `lecturer.${listParamsDto.getOrderedField()}`,
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

  async softDeleteLecturer(lecturer_id: number) {
    const lecturer = await this.lecturerRepository.findOne({
      where: { id: lecturer_id },
    });
    if (!lecturer) {
      throw new NotFoundException('Lecturer was not found!');
    }
    lecturer.isDeleted = true;
    await this.lecturerRepository.save(lecturer);
    return 'Lecturer was successfully removed!';
  }
}
