import {
  Controller,
  Get,
  Query,
  Delete,
  Req,
  UseGuards,
  Patch,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ListParamsDto } from '../../base/dto/list-params.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';

@ApiTags('Пользователи')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Получение списка пользователей' })
  async list(@Query() listParamsDto: ListParamsDto) {
    return this.userService.list(listParamsDto);
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
  async updateProfile(@Body() updateProfileDto: UpdateProfileDto) {
    return this.userService.updateProfile(updateProfileDto);
  }

  @Delete()
  @ApiOperation({ summary: 'Удаление пользователя' })
  async deleteUser(@Query('id') id: number) {
    return this.userService.deleteUser(id);
  }
}
