import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Request } from 'express';
import { AuthService } from 'src/modules/auth/auth.service';
import { InvitationTokenPayload } from 'src/modules/auth/types/auth';
import { TokenType } from 'src/modules/auth/types/enum';

import { Shared } from 'src/common/decorators/shared.decorator';

@Injectable()
export class SharedGuard implements CanActivate {

    constructor (
        private auth: AuthService,
        private reflector: Reflector
    ) {}

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean>  {
        const request = context.switchToHttp().getRequest<Request>();
        const type = this.reflector.get<TokenType>(Shared, context.getHandler());

        if (!type) {
            return true;
        }

        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('No token provided');
        }

        try {
            const payload = this.auth.veifyToken(token) as InvitationTokenPayload;
            const payloadType = payload.type;

            if (type !== payloadType) {
                throw new UnauthorizedException('Invalid token');
            }

            request.sharedTokenPayload = payload;

            return true;
        } catch {
            throw new UnauthorizedException('Invalid token');
        }
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request?.headers?.['x-shared-authorization']?.split(' ') ?? [];

        return type === 'Bearer' ? token : undefined;
    }
}
