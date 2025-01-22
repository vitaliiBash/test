import { IsEnum } from 'class-validator'
import { Expose } from 'class-transformer'
import { Roles } from '@prisma/client'

export class createInvitationDto {
  @IsEnum(Roles)
  role: Roles;
}

export class InviteDto {
    @Expose()
    token: string;
}
