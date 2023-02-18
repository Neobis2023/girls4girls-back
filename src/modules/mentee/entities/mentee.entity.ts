import { IsEmail, IsNotEmpty, IsString } from "class-validator";
import { MentorEntity } from "src/modules/mentor/entities/mentor.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class MenteeEntity{
    @PrimaryGeneratedColumn()
    @IsNotEmpty()
    id: number
    
    @Column()
    @IsString()
    @IsNotEmpty()
    mentee_name: string

    // @Column()
    // @IsEmail()
    // @IsNotEmpty()
    // mentee_email: string
    
    @ManyToOne(() => MentorEntity, (mentor) => mentor.mentees)
    @IsNotEmpty()
    mentor: MentorEntity
}

