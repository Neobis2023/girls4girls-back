import { BaseEntity } from 'src/base/base.entity';
import { Image } from 'src/modules/image/entities/image.entity';
import { Column, CreateDateColumn, Entity, OneToMany } from 'typeorm';

@Entity()
export class Forum extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  address: string;

  @OneToMany(() => Image, (image) => image.forum, {
    cascade: true,
  })
  image: Image[];

  @CreateDateColumn()
  eventDate?: Date;

  @CreateDateColumn()
  endDate?: Date;
}
