import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCourseProgress } from './entities/user-course-progress.entity';
import { UserLessonProgress } from './entities/user-lesson-progress.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserCourseProgress, UserLessonProgress])],
  exports: [TypeOrmModule],
})
export class ProgressModule {}
