import { Module } from '@nestjs/common'

import { PrismaModule } from 'src/prisma/prisma.module'
import { AuthModule } from 'src/auth/auth.module'
import { SectionModule } from 'src/section/section.module'

import { UserService } from './user.service'
import { UserController } from './user.controller'

@Module({
  imports: [PrismaModule, AuthModule, SectionModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
