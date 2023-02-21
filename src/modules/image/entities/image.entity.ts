import { Column, Entity , ManyToOne} from 'typeorm';
import { BaseEntity } from '../../../base/base.entity';
import { IsString } from 'class-validator';
import { Training } from 'src/modules/training/entities/training.entity';

@Entity()
export class Image extends BaseEntity {
  @Column()
  @IsString()
  url: string;

  @IsString()
  publicId: string;

  @ManyToOne(()=>Training,(training)=>training.image)
  training: Training[]
}
