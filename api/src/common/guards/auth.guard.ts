import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Request } from 'express';

import { PrismaService } from 'src/prisma/prisma.service';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public-auth.decorator';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor (
        private prisma: PrismaService,
        private reflector: Reflector
    ) {}

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean>  {
        const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());

        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest<Request>();

        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('No token provided');
        }

        try {
            const [email, password] = Buffer.from(token, 'base64').toString().split(':')

            const user = await this.prisma.user.findFirst({
                where: {
                    email,
                    password
                }
            });

            request.user = user;

            return true;
        } catch {
            throw new UnauthorizedException('Invalid token');
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request?.headers?.authorization?.split(' ') ?? [];

        return type === 'Basic' ? token : undefined;
    }
}
