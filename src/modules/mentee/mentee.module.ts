import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenteeEntity } from './entities/mentee.entity';
import { MenteeService } from './mentee.service';

@Module({
    imports: [TypeOrmModule.forFeature([MenteeEntity])],
    providers:[MenteeService]
})
export class MenteeModule {}
