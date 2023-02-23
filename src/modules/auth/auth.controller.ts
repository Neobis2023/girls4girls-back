import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { RoleGuard } from './roles/role.guard';
import { Roles } from './roles/roles.decorator';
import { UserRoleEnum } from '../user/enums/user-role.enum';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ConfirmAccountDto } from './dto/confirm-account.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ConfirmCodeDto } from './dto/confirm-code.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@ApiTags('Aвторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Регистрация пользователя' })
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @Post('confirm')
  @ApiOperation({ summary: 'Активировать аккаунт' })
  async confirm(@Body() confirmAccountDto: ConfirmAccountDto) {
    return this.authService.confirm(confirmAccountDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Логин' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('forgot-password')
  @ApiOperation({ summary: 'Забыли пароль' })
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }

  @Post('forgot-password/confirm')
  @ApiOperation({ summary: 'Подтверждение кода для изменения пароля' })
  async confirmCodeToChangePassword(@Body() confirmCodeDto: ConfirmCodeDto) {
    return this.authService.confirmCodeToChangePassword(confirmCodeDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Изменение пароля' })
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Request() req: any,
  ) {
    return this.authService.changePassword(
      {
        email: req.user?.email,
        phoneNumber: req.user?.phoneNumber,
      },
      changePasswordDto,
    );
  }

  @Roles(UserRoleEnum.USER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiBearerAuth()
  @Get('profile')
  @ApiOperation({ summary: 'Получение профиля пользователя' })
  getProfile(@Request() req) {
    return req.user;
  }
}
