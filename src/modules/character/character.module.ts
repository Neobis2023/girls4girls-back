import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './entities/character.entity';
import { CharacterImage } from './entities/character-image.entity';
import { ImageModule } from '../image/image.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Character, CharacterImage]),
    ImageModule,
    UserModule,
  ],
  controllers: [CharacterController],
  providers: [CharacterService],
})
export class CharacterModule {}
