import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Request } from 'express';

import { PrismaService } from 'src/modules/prisma/prisma.service';

import { AllowedRoles } from 'src/common/decorators/roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {

    constructor (
        private prisma: PrismaService,
        private reflector: Reflector
    ) {}

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean>  {
        const req = context.switchToHttp().getRequest<Request>();
        const roles = this.reflector.get(AllowedRoles, context.getHandler());

        if (!roles || roles.length === 0) {
            return true;
        }

        if (!req.user) {
            throw new UnauthorizedException(`Invalid user`);
        }

        const role = await this.prisma.userRole.findFirst({
            where: {
                userId: req.user.id,
                role: {
                    in: roles,
                }
            }
        });

        if (!role) {
            throw new ForbiddenException(`User is not allowed to perform the action`);
        }

        return true;
    }
}
