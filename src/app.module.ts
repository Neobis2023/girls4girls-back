import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from './modules/mail/mail.module';
import { ImageModule } from './modules/image/image.module';
import { CloudinaryModule } from './services/cloudinary/cloudinary.module';
import { SmsNikitaModule } from './services/sms-nikita/sms-nikita.module';
import { MenteeModule } from './modules/mentee/mentee.module';
import { MentorModule } from './modules/mentor/mentor.module';
import { TrainingsModule } from './modules/training/training.module';
import { NewsModule } from './modules/news/news.module';
import { ForumModule } from './modules/forum/forum.module';
import { JetonModule } from './modules/jeton/jeton.module';
import { LikeModule } from './modules/likes/like.module';
import { VideoBlogModule } from './modules/video-blog/video-blog.module';
import { CategoryModule } from './modules/categories/category.module';
import { QuizModule } from './modules/quiz/quiz.module';
import { QuestionnaireModule } from './modules/questionnaire/questionnaire.module';
import { CharacterModule } from './modules/character/character.module';
import { ContentModule } from './modules/content/content.module';
import { TranslateModule } from './modules/translate/translate.module';
import { LecturerModule } from './modules/lecturers/lecturers.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    MentorModule,
    MenteeModule,
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
        ssl: {
          rejectUnauthorized: false,
        },
        entities: ['dist/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    MailModule,
    ImageModule,
    CloudinaryModule,
    SmsNikitaModule,
    TrainingsModule,
    NewsModule,
    ForumModule,
    TrainingsModule,
    JetonModule,
    VideoBlogModule,
    LikeModule,
    CategoryModule,
    QuizModule,
    QuestionnaireModule,
    CharacterModule,
    ContentModule,
    TranslateModule,
    LecturerModule,
  ],
  controllers: [],
})
export class AppModule {}
