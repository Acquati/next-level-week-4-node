import { IsInt, IsOptional, IsUUID, Max, Min } from 'class-validator'
import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity('surveys_users')
export class SurveyUser {
  @PrimaryColumn()
  readonly id: string

  @Column()
  @IsUUID()
  user_id: string

  @Column()
  @IsUUID()
  survey_id: string

  @Column()
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(10)
  value: number

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
