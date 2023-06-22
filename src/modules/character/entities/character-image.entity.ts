import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../base/base.entity';
import { Image } from '../../image/entities/image.entity';
import { Character } from './character.entity';

@Entity()
export class CharacterImage extends BaseEntity {
  @Column()
  title: string;

  @Column({ default: false })
  isDeleted: boolean;

  @OneToMany(() => Character, (character) => character.characterImage)
  characters: Character[];

  @OneToMany(() => Image, (image) => image.characterImage, { cascade: true })
  images: Image[];
}
