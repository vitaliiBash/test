import { Module } from '@nestjs/common'

import { PrismaModule } from 'src/prisma/prisma.module'

import { ClassroomService } from './classroom.service'
import { ClassroomController } from './classroom.controller';

@Module({
  imports: [PrismaModule],
  providers: [ClassroomService],
  controllers: [ClassroomController],
  exports: [ClassroomService],
})
export class ClassroomModule {}
