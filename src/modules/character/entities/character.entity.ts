import { BaseEntity } from '../../../base/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { CharacterImage } from './character-image.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Character extends BaseEntity {
  @Column()
  name: string;

  @Column({
    default: 1,
  })
  age: number;

  @ManyToOne(
    () => CharacterImage,
    (characterImage) => characterImage.characters,
  )
  characterImage: CharacterImage;

  @OneToOne(() => User, (user) => user.character, { onDelete: 'CASCADE' })
  user: User;
}
