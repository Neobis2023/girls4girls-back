import {
  Controller,
  Get,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { LecturerService } from './lecturers.service';
import { CreateLecturerDto } from './dto/create-lecturer.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ListParamsDto } from 'src/base/dto/list-params.dto';

@ApiTags('lecturers')
@Controller('lecturer')
export class LecturerController {
  constructor(private readonly lecturerService: LecturerService) {}

  @Post()
  @ApiOperation({ summary: 'Создание нового лектора' })
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        lecturerFullName: {
          type: 'string',
          example: 'Сыдыкова Айканыш',
          description: 'Фамилия и имя ведущего лектора'
        },
        jobTitle: {
          type: 'string',
          example: 'Mentor ,Co-Founder',
          description: 'Должность',
        },
        lecturerInfo: {
          type: 'string',
          example: 'Доктор медицинских наук, профессор и т.д.',
          description:
            'Информация о лекторе , где работает , стаж работы , опыт и т.д.',
        },
        lecturerInfoKG: {
          type: 'string',
          example: 'Медицина илимдеринин доктору, профессор',
          description:
            'Лектор жөнүндө маалымат, анын иштеген жери, иш стажы, тажрыйбасы ж.б.',
        },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  create(
    @Body() createLecturerDto: CreateLecturerDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.lecturerService.createLecturer(createLecturerDto, file);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех лекторов' })
  findAll(@Query() listParamsDto: ListParamsDto) {
    return this.lecturerService.listLecturers(listParamsDto);
  }
}
