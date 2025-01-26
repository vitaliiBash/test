import { Module } from '@nestjs/common'

import { PrismaModule } from 'src/modules/prisma/prisma.module'
import { AuthModule } from 'src/modules/auth/auth.module'
import { SectionModule } from 'src/modules/section/section.module'

import { UserService } from './user.service'
import { UserController } from './user.controller'

import { PdfHelper } from 'src/common/helpers/pdf.helper'

@Module({
  imports: [PrismaModule, AuthModule, SectionModule],
  providers: [UserService, PdfHelper],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
