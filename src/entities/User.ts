import { IsEmail, IsString, Length } from 'class-validator'
import { Entity, Column, CreateDateColumn, UpdateDateColumn, Unique, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity('users')
@Unique(['email'])
export class User {
  @PrimaryColumn()
  readonly id: string

  @Column()
  @IsString()
  @Length(5, 100)
  name: string

  @Column()
  @IsEmail()
  @Length(5, 254)
  email: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  constructor() {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}