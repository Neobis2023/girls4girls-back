import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/auth-constants';
import { JwtStrategy } from './jwt/jwt.strategy';
import { MailModule } from '../mail/mail.module';
import { SmsNikitaModule } from '../../services/sms-nikita/sms-nikita.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfirmCode } from './entities/confirm-code.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConfirmCode, User]),
    UserModule,
    PassportModule,
    MailModule,
    SmsNikitaModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
