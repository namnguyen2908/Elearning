import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Lesson } from '../../lessons/entities/lesson.entity';

export enum ExerciseType {
  CODING = 'coding',
  FILL_BLANK = 'fill_blank',
  MATCHING = 'matching',
  TRANSLATION = 'translation',
}

@Entity('exercises')
export class Exercise {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  instructions: string;

  @Column({ type: 'enum', enum: ExerciseType })
  type: ExerciseType;

  @Column({ nullable: true })
  language: string;

  @Column('text', { nullable: true })
  starterCode: string;

  @Column('text', { nullable: true })
  expectedOutput: string;

  @Column('json', { nullable: true })
  testCases: any;

  @Column('text', { nullable: true })
  solution: string;

  @Column({ default: 10 })
  xpReward: number;

  @Column({ default: 0 })
  order: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Lesson, (l) => l.exercises, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'lessonId' })
  lesson: Lesson;

  @Column()
  lessonId: string;
}
