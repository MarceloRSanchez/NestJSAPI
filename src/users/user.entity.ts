import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Unique,
    CreateDateColumn,
    UpdateDateColumn
  } from "typeorm";
  import { Length, IsNotEmpty } from "class-validator";
  import { ApiProperty } from '@nestjs/swagger';
 
  
  @Entity()
  @Unique(["username"])
  export class User {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;
  
    @ApiProperty()
    @Column()
    @Length(4, 20)
    username: string;
  
    @ApiProperty()
    @Column()
    @Length(4, 100)
    password: string;
  
    @ApiProperty()
    @Column()
    @IsNotEmpty()
    role: string;
  
    @ApiProperty()
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @ApiProperty()
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
  
  }