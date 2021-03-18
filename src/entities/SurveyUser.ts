import { IsInt, IsOptional, IsUUID, Max, Min } from 'class-validator'
import { Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { User } from './User'
import { Survey } from './Survey'

@Entity('surveys_users')
export class SurveyUser {
  @PrimaryColumn()
  readonly id: string

  @Column()
  @IsUUID()
  user_id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column()
  @IsUUID()
  survey_id: string

  @ManyToOne(() => Survey)
  @JoinColumn({ name: 'survey_id' })
  survey: Survey

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
