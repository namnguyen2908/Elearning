import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Lesson } from '../../lessons/entities/lesson.entity';
import { Question } from './question.entity';

@Entity('quizzes')
export class Quiz {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column({ default: 10 })
  xpReward: number;

  @Column({ default: 0 })
  timeLimit: number;

  @Column({ default: false })
  isTimed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Lesson, (l) => l.quizzes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lessonId' })
  lesson: Lesson;

  @Column()
  lessonId: string;

  @OneToMany(() => Question, (q) => q.quiz)
  questions: Question[];
}
