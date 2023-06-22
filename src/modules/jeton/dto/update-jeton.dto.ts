import { PartialType } from '@nestjs/swagger';
import { CreateJetonDto } from './create-jeton.dto';

export class UpdateJetonDto extends PartialType(CreateJetonDto) {}
