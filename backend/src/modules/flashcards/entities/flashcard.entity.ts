import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { UserFlashcard } from './user-flashcard.entity';

export enum FlashcardCategory {
  VOCAB = 'vocab',
  TECH_TERM = 'tech_term',
  GRAMMAR = 'grammar',
  PHRASE = 'phrase',
  PRONUNCIATION = 'pronunciation',
}

export enum FlashcardSource {
  AI = 'ai',
  USER = 'user',
  SYSTEM = 'system',
}

@Entity('flashcards')
export class Flashcard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  frontContent: string;

  @Column('text')
  backContent: string;

  @Column('text', { nullable: true })
  exampleSentence: string;

  @Column('text', { nullable: true })
  exampleCode: string;

  @Column({ nullable: true })
  pronunciation: string;

  @Column({ nullable: true })
  audioUrl: string;

  @Column({ type: 'enum', enum: FlashcardCategory })
  category: FlashcardCategory;

  @Column({ type: 'enum', enum: FlashcardSource, default: FlashcardSource.SYSTEM })
  source: FlashcardSource;

  @Column({ nullable: true })
  createdBy: string;

  @Column({ default: false })
  isApproved: boolean;

  @Column({ default: 0 })
  votes: number;

  @Column({ nullable: true })
  lessonId: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => UserFlashcard, (uf) => uf.flashcard)
  userFlashcards: UserFlashcard[];
}
