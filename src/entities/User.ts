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

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  constructor() {
    const date = new Date()

    if (!this.id) {
      this.id = uuidv4()
    }

    if (!this.created_at) {
      this.created_at = date
    }

    if (!this.updated_at) {
      this.updated_at = date
    }
  }
}
