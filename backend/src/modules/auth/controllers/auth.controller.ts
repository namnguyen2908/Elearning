import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { User } from '../../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  @Get('me')
  getProfile(@CurrentUser() user: User) {
    return user;
  }
}
