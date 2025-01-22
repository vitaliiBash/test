import { IsEnum, IsOptional, IsString } from 'class-validator'
import { Expose, Transform } from 'class-transformer'
import { Roles } from '@prisma/client'

export class FilterUserDto {
  @IsString()
  @IsOptional()
  email?: string
}

export class UserDto {
  @Expose()
  id: string

  @Expose()
  email: string

  @Expose()
  @Transform(({ obj }) => obj.userRole?.role, { toClassOnly: true })
  role: Roles;
}
