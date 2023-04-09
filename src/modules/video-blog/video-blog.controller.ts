import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ListParamsDto } from 'src/base/dto/list-params.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { RoleGuard } from '../auth/roles/role.guard';
import { Roles } from '../auth/roles/roles.decorator';
import { UserRoleEnum } from '../user/enums/user-role.enum';
import { CreateBlogDto } from './dto/create-blog.dto';
import { EditBlogDto } from './dto/edit-blog.dto';
import { VideoBlogService } from './video-blog.service';
import { log } from 'console';

@ApiTags('Видеоблоги')
@Controller('video-blog')
export class VideoBlogController {
  constructor(private readonly videoBlogService: VideoBlogService) {}

  @ApiOperation({ summary: 'Вывести все видеоблоги' })
  @Get()
  async getBlogs(@Query() listParamsDto: ListParamsDto) {
    return await this.videoBlogService.listWithRelations(
      listParamsDto,
      'VideoBlog',
      ['category', 'lecturerImage'],
    );
  }

  @ApiOperation({ summary: 'Найти один видеоблог по id' })
  @Get(':id')
  async getBlog(@Param('id') id: number) {
    return await this.videoBlogService.getWithRelations(id, 'VideoBlog', [
      'lecturerImage',
      'category',
      'quiz',
    ]);
  }

  // @Roles(UserRoleEnum.ADMIN)
  // @UseGuards(JwtAuthGuard, RoleGuard)
  // @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @ApiOperation({ summary: 'Создать видеоблог' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        videoUrl: { type: 'string', example: 'https://youtu.be/dQw4w9WgXcQ' },
        title: { type: 'string', example: 'Название видео ' },
        description: { type: 'string', example: 'Это лекция про здоровье' },
        lecturerName: { type: 'string', example: 'Имя Фамилия' },
        lecturerInfo: { type: 'string', example: 'Ментор' },
        lecturerImage: {
          type: 'string',
          format: 'binary',
        },
        category: { type: 'string', example: 'Health' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('lecturerImage'))
  @Post('/post')
  async postBlog(
    @Body() body: CreateBlogDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('Image should not be empty');
    const blog = new CreateBlogDto();
    blog.lecturerImage = file;
    Object.assign(blog, body);
    return await this.videoBlogService.createOne(blog);
  }

  // @Roles(UserRoleEnum.ADMIN)
  // @UseGuards(JwtAuthGuard, RoleGuard)
  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Изменить содержание видео блога' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('lecturerImage'))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        videoUrl: { type: 'string', example: 'https://youtu.be/JojwHc1MKag' },
        title: { type: 'string', example: 'Новое название видео ' },
        description: {
          type: 'string',
          example: 'Это лекция про тайм менеджмент',
        },
        lecturerName: { type: 'string', example: 'Новое Имя и Фамилия' },
        lecturerInfo: { type: 'string', example: 'Бизнес-вумен' },
        lecturerImage: {
          type: 'string',
          format: 'binary',
        },
        category: { type: 'string', example: 'Business' },
      },
    },
  })
  @Put('/put/:id')
  async editBlog(
    @Param('id') id: number,
    @Body() newBlog: EditBlogDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    newBlog.lecturerImage = file;
    return await this.videoBlogService.editOne(id, newBlog);
  }

  // @Roles(UserRoleEnum.ADMIN)
  // @UseGuards(JwtAuthGuard, RoleGuard)
  // @ApiBearerAuth()
  @ApiOperation({ summary: 'Удалить блог' })
  @Delete(':blogId')
  async deleteBlog(@Param('blogId') blogId: number) {
    return await this.videoBlogService.deleteOne(blogId);
  }
}
