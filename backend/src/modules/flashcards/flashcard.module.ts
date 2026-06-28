import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Flashcard } from './entities/flashcard.entity';
import { UserFlashcard } from './entities/user-flashcard.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Flashcard, UserFlashcard])],
  exports: [TypeOrmModule],
})
export class FlashcardModule {}
