import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Module as CourseModuleEntity } from './entities/module.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, CourseModuleEntity])],
  exports: [TypeOrmModule],
})
export class CourseModule {}
