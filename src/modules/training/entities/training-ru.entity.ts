import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "src/base/base.entity";
import { Column, Entity, JoinTable,OneToOne } from "typeorm";
import { Training } from "./training.entity";

@Entity()
export class TrainingRuEntity extends BaseEntity{
    @ApiProperty()
    @Column()
    training_id:number

    @ApiProperty()
    @Column()
    title: string

    @ApiProperty()
    @Column()
    description:string

    // @OneToOne(()=>Training,(training)=>training.ru)
    // @JoinTable()
    // training: Training

}