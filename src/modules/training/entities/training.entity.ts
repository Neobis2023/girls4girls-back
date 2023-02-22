import { IsNotEmpty, IsNumber, IsOptional, IsString, isString } from "class-validator";
import { BaseEntity } from "src/base/base.entity";
import { Image } from "src/modules/image/entities/image.entity";
import { MentorEntity } from "src/modules/mentor/entities/mentor.entity";
import { text } from "stream/consumers";
import { Column, Entity, OneToMany } from "typeorm";

@Entity()
export class Training extends BaseEntity {
    @Column({type: 'varchar', nullable: true })
    @IsNotEmpty()
    @IsString()
    title: string

    @Column({ type: 'text', nullable: true })
    @IsNotEmpty()
    description: string 

    @Column({type: 'text'})
    @IsNotEmpty()
    @IsString()
    address: string  
    
    @OneToMany(()=> Image,(image)=>image.training, {cascade: true})
    @IsOptional()
    image: Image []                                    
}

