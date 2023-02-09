import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../base/base.entity';
import { IsString } from 'class-validator';

@Entity()
export class Image extends BaseEntity {
  @Column()
  @IsString()
  url: string;

  @IsString()
  publicId: string;
}
