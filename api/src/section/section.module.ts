import { Module } from '@nestjs/common'

import { PrismaModule } from 'src/prisma/prisma.module'

import { SectionService } from './section.service'
import { SectionController } from './section.controller'

@Module({
  imports: [PrismaModule],
  providers: [SectionService],
  controllers: [SectionController],
  exports: [SectionService],
})
export class SectionModule {}
