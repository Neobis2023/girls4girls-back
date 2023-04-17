import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  Query,
  UseGuards,
  Patch,
  Req,
} from '@nestjs/common';
import { ForumService } from './forum.service';
import { CreateForumDto } from './dto/create-forum.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ListParamsDto } from 'src/base/dto/list-params.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { ApplyUserToForumDto } from './dto/apply-user-to-forum.dto';
import { UpdateUserApplicationDto } from './dto/update-user-application.dto';

@ApiTags('Форумы')
@Controller('forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
        title: {
          type: 'string',
          example: 'Женское тело',
          description: 'Тема форума',
        },
        titleKG: {
          type: 'string',
          example: 'Аял денеси',
          description: 'Тема форума на кыргызском',
        },
        description: {
          type: 'string',
          example: 'Описание форума женское тело',
          description: 'Описание форума',
        },
        descriptionKG: {
          type: 'string',
          example: 'Аял денеси форумунун суроттомосу',
          description: 'Описание форума на кыргызском',
        },
        address: {
          type: 'string',
          example: 'Bokonbaeva 101',
          description: 'Адрес по которому будет проводится форум',
        },
        eventDate: {
          type: 'string',
          format: 'date-time',
          example: '2023-03-22T10:30:40.000Z',
          description: 'Дата проведения форума',
        },
        deadlineDate: {
          type: 'string',
          format: 'date-time',
          example: '2023-03-22T10:30:40.000Z',
          description: 'Дедлайн подачи заявки',
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
          description: 'ID анкеты для форума',
        },
        lecturers: {
          type: 'string',
          example: '[1, 2]',
          description:
            'Массив айдишек лекоторов, надо обычный массив превращать в строку черерз JSON.stringify()',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  @ApiOperation({ summary: 'Создание нового форума' })
  async create(
    @Body() createForumDto: CreateForumDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.forumService.createNewForum(createForumDto, file);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех форумов' })
  async list(@Query() listParamsDto: ListParamsDto) {
    return await this.forumService.listForums(listParamsDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить форум по ID' })
  async getById(@Param('id') id: number) {
    return await this.forumService.getForumById(id);
  }

  @Post('apply')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Подать заявку на форум' })
  async applyUserToTraining(
    @Req() req: any,
    @Query() applyUserToForumDto: ApplyUserToForumDto,
  ) {
    applyUserToForumDto.userId = req.user?.id;
    return this.forumService.applyUserToForum(applyUserToForumDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Админ: Удаление форума по его ID' })
  remove(@Param('id') forum_id: number) {
    return this.forumService.softDeleteForumById(forum_id);
  }

  @Get('apply/:id')
  @ApiOperation({
    summary:
      'Админ: Получить список подавших заявку пользователей по ID форума',
  })
  async getAppliedUsers(@Param('id') id: number) {
    return this.forumService.getAppliedUsers(id);
  }

  @Patch('apply')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Админ: Изменить подачу пользователя на форум' })
  async updateUserApplication(
    @Body() updateUserApplication: UpdateUserApplicationDto,
  ) {
    return this.forumService.updateUserApplication(updateUserApplication);
  }

  @Get('past/forums')
  @ApiOperation({ summary: 'Получить прошедшие форумы' })
  async pastTraining(@Query() listParamsDto: ListParamsDto) {
    return await this.forumService.listPastForums(listParamsDto);
  }

  @Get('future/forums')
  @ApiOperation({ summary: 'Получить будущие форумы' })
  async future(@Query() listParamsDto: ListParamsDto) {
    return await this.forumService.listFutureForums(listParamsDto);
  }
}
