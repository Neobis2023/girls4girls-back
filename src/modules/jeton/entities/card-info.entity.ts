import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { Image } from '../../image/entities/image.entity';
import { BaseEntity } from '../../../base/base.entity';

@Entity()
export class CardInfo extends BaseEntity {
  @Column()
  name: string;

  @Column()
  info: string;

  @Column()
  infoKG: string;

  @OneToOne(() => Image, { cascade: true })
  @JoinColumn()
  image: Image;
}
