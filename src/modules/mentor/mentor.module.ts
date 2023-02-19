import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MentorEntity } from './entities/mentor.entity';
import { MentorService } from './mentor.service';


@Module({
    imports: [TypeOrmModule.forFeature([MentorEntity])],
    providers: [MentorService]
})
export class MentorModule {}
