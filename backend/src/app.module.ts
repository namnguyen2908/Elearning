import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getTypeOrmConfig } from './config/typeorm.config';
import { ResponseTransformInterceptor } from './common/interceptors/response-transform.interceptor';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { CourseModule } from './modules/courses/course.module';
import { LessonModule } from './modules/lessons/lesson.module';
import { ExerciseModule } from './modules/exercises/exercise.module';
import { QuizModule } from './modules/quizzes/quiz.module';
import { FlashcardModule } from './modules/flashcards/flashcard.module';
import { PlaygroundModule } from './modules/playground/playground.module';
import { AiModule } from './modules/ai/ai.module';
import { ProgressModule } from './modules/progress/progress.module';
import { AchievementModule } from './modules/achievements/achievement.module';
import { NoteModule } from './modules/notes/note.module';
import { BookmarkModule } from './modules/bookmarks/bookmark.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),

    AuthModule,
    UsersModule,
    CourseModule,
    LessonModule,
    ExerciseModule,
    QuizModule,
    FlashcardModule,
    PlaygroundModule,
    AiModule,
    ProgressModule,
    AchievementModule,
    NoteModule,
    BookmarkModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: ResponseTransformInterceptor },
  ],
})
export class AppModule {}
