import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { Request } from 'express';
import { plainToInstance } from 'class-transformer';

import { InvitationPayloadDto } from 'src/auth/dto/auth.dto';

export const Invitation = createParamDecorator(
  (_, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const payload = request.sharedTokenPayload;

    return plainToInstance(InvitationPayloadDto, payload, { enableImplicitConversion: true });
  },
);
