import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Module } from '../../courses/entities/module.entity';
import { Exercise } from '../../exercises/entities/exercise.entity';
import { Quiz } from '../../quizzes/entities/quiz.entity';

export enum LessonType {
  VIDEO = 'video',
  READING = 'reading',
  CODING = 'coding',
  QUIZ = 'quiz',
  FLASHCARD = 'flashcard',
}

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text', { nullable: true })
  content: string;

  @Column({ type: 'enum', enum: LessonType })
  type: LessonType;

  @Column({ default: 0 })
  order: number;

  @Column({ default: 10 })
  xpReward: number;

  @Column({ nullable: true })
  videoUrl: string;

  @Column('text', { nullable: true })
  readingContent: string;

  @Column({ nullable: true })
  duration: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Module, (m) => m.lessons, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'moduleId' })
  module: Module;

  @Column()
  moduleId: string;

  @OneToMany(() => Exercise, (e) => e.lesson)
  exercises: Exercise[];

  @OneToMany(() => Quiz, (q) => q.lesson)
  quizzes: Quiz[];
}
