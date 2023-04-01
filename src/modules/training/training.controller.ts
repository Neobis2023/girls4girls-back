import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Get,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { TrainingsService } from './training.service';
import { CreateTrainingDto } from './dto/create-training.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ListParamsDto } from 'src/base/dto/list-params.dto';

@ApiTags('Тренинги')
@Controller('training')
export class TrainingsController {
  constructor(private readonly trainingsService: TrainingsService) {}

  @Post()
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          example: 'Female body',
          description: 'Название тренинга',
        },
        description: {
          type: 'string',
          example:
            'From high peaks to lush valleys, hard planes, and soft edges',
          description: 'Описание тренинга',
        },
        address: {
          type: 'string',
          example: 'Bokonbaeva 101',
          description: 'Адрес по котрому будет проходить тренинг',
        },
        image: {
          type: 'string',
          format: 'binary',
        },
        eventDate: {
          type: 'string',
          format: 'date-time',
          example: '2023-03-22T10:30:40.000Z',
          description: 'Дата проведения тренинга',
        },
        endDate: {
          type: 'string',
          format: 'date-time',
          example: '2023-03-22T10:30:40.000Z',
          description: 'Дедлайн подачи заявки',
        },
        ru: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'Title of the training in Russian version',
            },
            description: {
              type: 'string',
              description: 'Description of the training in Russian version',
            },
          },
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Создание нового тренинга' })
  async create(
    @Body() createTrainingDto: CreateTrainingDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.trainingsService.createNewTraining(
      createTrainingDto,
      file,
    );
  }

  @Get('past/trainings')
  @ApiOperation({
    summary: 'Получить прошедшие тренинги по дедлайну подачи заявки',
  })
  async pastTraining() {
    return await this.trainingsService.pastList();
  }

  @Get('future/trainings')
  @ApiOperation({
    summary: 'Получить будущие тренинги по дедлайну подачи заявки',
  })
  async future() {
    return await this.trainingsService.listFuture();
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех тренингов' })
  async list(@Query() listParamsDto: ListParamsDto) {
    return await this.trainingsService.list(listParamsDto);
  }

  @Get(':title')
  @ApiOperation({ summary: 'Получить один тренинг по его названию' })
  findOneById(@Param('title') title: string) {
    return this.trainingsService.getOneByTitle(title);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Удаление тренинга по ID' })
  remove(@Param('id') training_id: number) {
    return this.trainingsService.deleteTraining(training_id);
  }
}
