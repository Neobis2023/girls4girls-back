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
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ListParamsDto } from 'src/base/dto/list-params.dto';
import { Roles } from '../auth/roles/roles.decorator';
import { UserRoleEnum } from '../user/enums/user-role.enum';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { RoleGuard } from '../auth/roles/role.guard';

@ApiTags('Форумы')
@Controller('forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Post()
  @Roles(UserRoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiConsumes('multypart/form-data')
  @ApiBearerAuth()
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

  @Roles(UserRoleEnum.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBearerAuth()
  @Delete(':id')
  @ApiOperation({ summary: 'Удаление форума по его ID' })
  remove(@Param('id') forum_id: number) {
    return this.forumService.deleteForumById(forum_id);
  }
}
