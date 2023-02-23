import { Controller, Get, Query, Delete } from '@nestjs/common';
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

  @Delete()
  @ApiOperation({ summary: 'Удаление пользователя' })
  async deleteUser(@Query('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
