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

@ApiTags('Форумы')
@Controller('forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('multypart/form-data')
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
          example: 'Female body',
          description: 'Тема форума',
        },
        description: {
          type: 'string',
          example:
            'From high peaks to lush valleys, hard planes, and soft edges',
          description: 'Описание форума',
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
        endDate: {
          type: 'string',
          format: 'date-time',
          example: '2023-03-22T10:30:40.000Z',
          description: 'Дедлайн подачи заявки',
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
    return await this.forumService.list(listParamsDto);
  }

  @Get(':title')
  @ApiOperation({ summary: 'Получить один форум по названию' })
  async findOneById(@Param('title') title: string) {
    return await this.forumService.getOneByTitle(title);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Удаление форума по его ID' })
  remove(@Param('id') forum_id: number) {
    return this.forumService.deleteForumById(forum_id);
  }
}
