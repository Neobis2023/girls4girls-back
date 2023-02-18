import { IsNotEmpty, IsString } from "class-validator";
import { MenteeEntity } from "src/modules/mentee/entities/mentee.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()

export class MentorEntity{
    @PrimaryGeneratedColumn()
    @IsNotEmpty()
    id: number

    // @Column()
    // user_id: number

    @Column()
    @IsNotEmpty()
    @IsString()
    mentor_name: string

    @Column()
    @IsNotEmpty()
    @IsString()
    job_title: string

    @Column()
    @IsNotEmpty()
    @IsString()
    info: string

    @OneToMany(() => MenteeEntity, (mentee) => mentee.mentor)
    mentees: MenteeEntity[]
}

