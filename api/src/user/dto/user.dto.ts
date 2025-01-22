import { IsEnum, IsOptional, IsString } from 'class-validator'
import { Expose } from 'class-transformer'
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
  get role (): Roles {
    return this.userRole?.role
  }

  userRole?: { role: Roles }
}
