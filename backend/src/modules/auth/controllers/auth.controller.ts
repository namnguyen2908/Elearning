import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../../users/services/users.service';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import { Public } from '../../../common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @Public()
  @Post('google')
  async googleLogin(@Body('token') token: string) {
    const profile = await this.verifyGoogleToken(token);
    let user = await this.usersService.findByGoogleId(profile.id);
    if (!user) {
      user = await this.usersService.create({
        email: profile.email,
        name: profile.name,
        avatar: profile.picture,
        googleId: profile.id,
      });
    }
    return this.authService.login(user);
  }

  @Public()
  @Post('facebook')
  async facebookLogin(@Body('token') token: string) {
    const profile = await this.verifyFacebookToken(token);
    let user = await this.usersService.findByFacebookId(profile.id);
    if (!user) {
      user = await this.usersService.create({
        email: profile.email,
        name: profile.name,
        facebookId: profile.id,
      });
    }
    return this.authService.login(user);
  }

  @Public()
  @Post('github')
  async githubLogin(@Body('token') token: string) {
    const profile = await this.verifyGithubToken(token);
    let user = await this.usersService.findByGithubId(profile.id);
    if (!user) {
      user = await this.usersService.create({
        email: profile.email,
        name: profile.name,
        avatar: profile.avatar_url,
        githubId: profile.id,
      });
    }
    return this.authService.login(user);
  }

  @Public()
  @Post('refresh')
  async refresh(@Body('refreshToken') refreshToken: string) {
    return this.authService.refresh(refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@CurrentUser() user: any) {
    return user;
  }

  private async verifyGoogleToken(token: string) {
    const response = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${token}`);
    return response.json();
  }

  private async verifyFacebookToken(token: string) {
    const response = await fetch(`https://graph.facebook.com/me?fields=id,name,email&access_token=${token}`);
    return response.json();
  }

  private async verifyGithubToken(token: string) {
    const response = await fetch('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  }
}
