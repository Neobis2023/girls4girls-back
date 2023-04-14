import { BaseEntity } from '../../../base/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { CharacterImage } from './character-image.entity';

@Entity()
export class Character extends BaseEntity {
  @Column()
  name: string;

  @Column({
    default: 10,
  })
  age: number;

  @OneToMany(() => CharacterImage, (characterImage) => characterImage.character)
  @JoinColumn()
  characterImage: CharacterImage[];

  @OneToOne(() => User, (user) => user.character, { onDelete: 'CASCADE' })
  user: User;
}
