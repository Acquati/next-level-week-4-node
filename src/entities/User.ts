import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique } from 'typeorm'

@Entity('users')
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  @IsString()
  @IsNotEmpty()
  @Length(5, 100)
  name: string

  @Column()
  @IsEmail()
  @IsNotEmpty()
  @Length(5, 254)
  email: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date
}
