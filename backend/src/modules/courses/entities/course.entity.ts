import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Module } from './module.entity';

export enum CourseCategory {
  TECH_VOCAB = 'tech_vocab',
  READING_DOCS = 'reading_docs',
  CODING_ENGLISH = 'coding_english',
  GRAMMAR_FOR_DEV = 'grammar_for_dev',
  INTERVIEW_PREP = 'interview_prep',
}

export enum DifficultyLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
}

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column('text')
  description: string;

  @Column({ nullable: true })
  image: string;

  @Column({ type: 'enum', enum: CourseCategory })
  category: CourseCategory;

  @Column({ type: 'enum', enum: DifficultyLevel })
  difficulty: DifficultyLevel;

  @Column({ default: 0 })
  totalModules: number;

  @Column({ default: true })
  isPublished: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Module, (m) => m.course)
  modules: Module[];
}
