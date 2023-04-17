import {
  Controller,
  Get,
  Query,
  Delete,
  Req,
  UseGuards,
  Patch,
  Body,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ListParamsDto } from '../../base/dto/list-params.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { StatusEnum } from './enums/user-status.enum';
import { User } from './entities/user.entity';

@ApiTags('Пользователи')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Получение списка пользователей' })
  async list(@Query() listParamsDto: ListParamsDto) {
    return this.userService.listWithRelations(listParamsDto, 'user', ['image']);
  }

  @Get('search')
  @ApiOperation({ summary: 'Поиск пользователей' })
  async searchUsers(@Query('searchTerm') searchTerm: string) {
    return this.userService.searchUsers(searchTerm);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  @ApiOperation({ summary: 'Получение профиля пользователя' })
  async getProfile(@Req() req) {
    console.log(req.user);
    return this.userService.getProfile(req?.user?.id);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch('profile')
  @ApiOperation({ summary: 'Изменение данных в пофиле' })
  async updateProfile(
    @Req() req: any,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.userService.updateProfile(req.user?.id, updateProfileDto);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Добавление фотки для профиля' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  addProfileImage(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
    console.log(req.user);
    return this.userService.addProfileImage(req.user?.id, file);
  }

  @Delete()
  @ApiOperation({ summary: 'Удаление пользователя' })
  async deleteUser(@Query('id') id: number) {
    return this.userService.deleteUser(id);
  }

  @Get('regions')
  @ApiOperation({ summary: 'Получение регионов' })
  async getRegions() {
    return this.userService.getRegions();
  }

  @Get('statuses')
  @ApiOperation({ summary: 'Получить список статусов пользователей' })
  async getStatus() {
    return await this.userService.getUsersStatuses();
  }

  @Get('/sorted/by/status')
  @ApiOperation({
    summary: 'Получить сортированный по статусу список пользователей',
  })
  async findUsersByStatus(
    @Query('status') status: StatusEnum,
    @Query() listParamsDto: ListParamsDto,
  ) {
    return await this.userService.listByStatus(listParamsDto, status);
  }

  @Patch('status/:id')
  @ApiOperation({ summary: 'Админ : Поменять статус пользователя ' })
  async changeStatus(
    @Query('id') user_id: number,
    @Query('status') status: StatusEnum,
  ): Promise<User> {
    return this.userService.changeUsersStatus(user_id, status);
  }

  @Patch('block/:id')
  @ApiOperation({ summary: 'Админ : Блокировать пользователя' })
  async blockUser(@Query('user_id') user_id: number) {
    return this.userService.blockUser(user_id);
  }

  @Patch('unlock/:id')
  @ApiOperation({ summary: 'Админ : Разблокировать пользователя' })
  async unlockUser(@Query('id') user_id: number) {
    await this.userService.unblockUser(user_id);
  }
}
