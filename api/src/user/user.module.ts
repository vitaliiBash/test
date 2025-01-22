import { Module } from '@nestjs/common'

import { PrismaModule } from 'src/prisma/prisma.module'
import { AuthModule } from 'src/auth/auth.module'

import { UserService } from './user.service'
import { UserController } from './user.controller'

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
