import { IsEmail, IsEnum, MaxLength, MinLength } from 'class-validator'
import { Expose } from 'class-transformer'
import { Roles } from '@prisma/client'

export class CreateInvitationDto {
  @IsEnum(Roles)
  role: Roles;
}

export class RegisterByTokenDto {
    @IsEmail()
    email: string;

    @MinLength(6)
    @MaxLength(24)
    password: string;
}

export class InviteDto {
    @Expose()
    token: string;
}

