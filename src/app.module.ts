import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from './modules/mail/mail.module';
import { ImageModule } from './modules/image/image.module';
import { CloudinaryModule } from './services/cloudinary/cloudinary.module';
import { SmsNikitaModule } from './services/sms-nikita/sms-nikita.module';
import { MentorModule } from './modules/mentor/mentor.module';
import { MenteeModule } from './modules/mentee/mentee.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: ["dist/**/*.entity{.ts,.js}"],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    MentorModule,
    MenteeModule,
    MailModule,
    ImageModule,
    CloudinaryModule,
    SmsNikitaModule,
  ],
})
export class AppModule {}
