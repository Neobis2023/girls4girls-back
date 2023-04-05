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
  Patch,
  Req,
} from '@nestjs/common';
import { TrainingsService } from './training.service';
import { CreateTrainingDto } from './dto';
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
import { ApplyUserToTrainingDto } from './dto/apply-user-to-training.dto';
import { UpdateUserApplicationDto } from './dto/update-user-application.dto';

@ApiTags('Тренинги')
@Controller('training')
export class TrainingsController {
  constructor(private readonly trainingsService: TrainingsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
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
        deadlineDate: {
          type: 'string',
          format: 'date-time',
          example: '2023-03-22T10:30:40.000Z',
          description: 'Дедлайн подачи заявки на тренинг',
        },
        time: {
          type: 'string',
          example: '18:00',
          description: 'Время тренинга',
        },
        location: {
          type: 'string',
          example: 'Наарынская область',
          description: 'Локация тренинга',
        },
        questionnaireId: {
          type: 'string',
          example: 3,
          description: 'ID of a training',
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

  @Get()
  @ApiOperation({ summary: 'Получить список всех тренингов' })
  async list(@Query() listParamsDto: ListParamsDto) {
    return await this.trainingsService.listTrainings(listParamsDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить трейнинг по ID' })
  async getById(@Param('id') id: number) {
    return await this.trainingsService.getTrainingById(id);
  }

  @Post('apply')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Подать заявку на тренинг' })
  async applyUserToTraining(
    @Req() req: any,
    @Query() applyUserToTrainingDto: ApplyUserToTrainingDto,
  ) {
    applyUserToTrainingDto.userId = req.user?.id;
    return this.trainingsService.applyUserToTraining(applyUserToTrainingDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Админ: Удаление тренинга по ID' })
  remove(@Param('id') training_id: number) {
    return this.trainingsService.deleteTraining(training_id);
  }

  @Get('apply/:id')
  @ApiOperation({
    summary:
      'Админ: Получить список подавших заявку пользователей по ID тренинга',
  })
  async getAppliedUsers(@Param('id') id: number) {
    return this.trainingsService.getAppliedUsers(id);
  }

  @Patch('apply')
  @ApiOperation({ summary: 'Админ: Изменить подачу пользователя на тренинг' })
  async updateUserApplication(
    @Body() updateUserApplication: UpdateUserApplicationDto,
  ) {
    return this.trainingsService.updateUserApplication(updateUserApplication);
  }

  @Get('past/trainings')
  @ApiOperation({ summary: 'Получить прошедшие тренинги' })
  async pastTraining(@Query() listParamsDto: ListParamsDto) {
    return await this.trainingsService.listPastTrainings(listParamsDto);
  }

  @Get('future/trainings')
  @ApiOperation({ summary: 'Получить будущие тренинги' })
  async future(@Query() listParamsDto: ListParamsDto) {
    return await this.trainingsService.listFutureTrainings(listParamsDto);
  }
}
