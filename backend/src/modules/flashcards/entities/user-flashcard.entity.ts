import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Flashcard } from './flashcard.entity';

@Entity('user_flashcards')
export class UserFlashcard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'float', default: 2.5 })
  ease: number;

  @Column({ default: 0 })
  interval: number;

  @Column({ default: 0 })
  repetitions: number;

  @Column({ default: 0 })
  lapses: number;

  @Column({ type: 'date', nullable: true })
  nextReviewDate: Date;

  @Column({ type: 'date', nullable: true })
  lastReviewDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: string;

  @ManyToOne(() => Flashcard, (f) => f.userFlashcards, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'flashcardId' })
  flashcard: Flashcard;

  @Column()
  flashcardId: string;
}
