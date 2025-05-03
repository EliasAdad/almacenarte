import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { CoursesModule } from './modules/courses/courses.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UsersModule, CoursesModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
