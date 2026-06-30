import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { ClerkAuthGuard } from '../../common/guards/clerk-auth.guard';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    { provide: APP_GUARD, useClass: ClerkAuthGuard },
  ],
  exports: [AuthService],
})
export class AuthModule {}
