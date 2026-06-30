import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { createClerkClient } from '@clerk/clerk-sdk-node';
import { ConfigService } from '@nestjs/config';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { UsersService } from '../../modules/users/services/users.service';

@Injectable()
export class ClerkAuthGuard {
  private clerkClient: ReturnType<typeof createClerkClient>;

  constructor(
    private reflector: Reflector,
    private configService: ConfigService,
    private usersService: UsersService,
  ) {
    this.clerkClient = createClerkClient({
      secretKey: this.configService.getOrThrow<string>('CLERK_SECRET_KEY'),
    });
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);
    if (!token) {
      throw new UnauthorizedException('Missing authorization token');
    }

    try {
      const payload = (await this.clerkClient.verifyToken(token)) as {
        sub: string;
        email?: string;
        name?: string;
        picture?: string;
      };

      let user = await this.usersService.findByClerkId(payload.sub);
      if (!user) {
        user = await this.usersService.create({
          clerkId: payload.sub,
          email: payload.email ?? '',
          name: payload.name ?? payload.email?.split('@')[0] ?? 'User',
          avatar: payload.picture,
        });
      } else {
        await this.usersService.update(user.id, {
          email: payload.email ?? user.email,
          name: payload.name ?? user.name,
          avatar: payload.picture ?? user.avatar,
        });
      }

      request.user = user;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  private extractToken(request: any): string | null {
    const authHeader = request.headers.authorization;
    if (!authHeader) return null;
    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') return null;
    return parts[1];
  }
}
