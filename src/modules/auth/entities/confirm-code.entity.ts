import { BaseEntity } from '../../../base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class ConfirmCode extends BaseEntity {
  @Column()
  phoneNumber: string;

  @Column({
    nullable: true,
  })
  email: string;

  @Column()
  code: string;
}
