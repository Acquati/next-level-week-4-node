import { IsString, Length } from 'class-validator'
import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity('surveys')
export class Survey {
  @PrimaryColumn()
  readonly id: string

  @Column()
  @IsString()
  @Length(1, 300)
  title: string

  @Column()
  @IsString()
  @Length(1, 1000)
  description: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}
