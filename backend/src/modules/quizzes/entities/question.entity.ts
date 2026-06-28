import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Quiz } from './quiz.entity';

export enum QuestionType {
  MULTIPLE_CHOICE = 'multiple_choice',
  TRUE_FALSE = 'true_false',
  FILL_BLANK = 'fill_blank',
}

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  questionText: string;

  @Column({ type: 'enum', enum: QuestionType })
  type: QuestionType;

  @Column('json')
  options: string[];

  @Column('simple-array')
  correctAnswers: string[];

  @Column('text', { nullable: true })
  explanation: string;

  @Column({ default: 0 })
  order: number;

  @Column({ default: 1 })
  points: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Quiz, (q) => q.questions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'quizId' })
  quiz: Quiz;

  @Column()
  quizId: string;
}
