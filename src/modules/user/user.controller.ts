import { Controller, Get, Query, Delete, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { ListParamsDto } from '../../base/dto/list-params.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Пользователи')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Получение списка пользователей' })
  async list(@Query() listParamsDto: ListParamsDto) {
    return this.userService.list(listParamsDto);
  }

  @Get('profile')
  @ApiOperation({ summary: 'Получение профиля пользователя' })
  async getProfile(@Req() req) {
    return this.userService.getProfile(req?.user?.id);
  }

  @Delete()
  @ApiOperation({ summary: 'Удаление пользователя' })
  async deleteUser(@Query('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
