import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'

import config from './config'

import { AppController } from './app.controller'
import { AppService } from './app.service'

import { UserModule } from './user/user.module'
import { ClassroomModule } from './classroom/classroom.module'
import { SubjectModule } from './subject/subject.module'
import { SectionModule } from './section/section.module'
import { PrismaModule } from './prisma/prisma.module'

import { AuthGuard } from './common/guards/auth.guard'

@Module({
  imports: [
    UserModule,
    ClassroomModule,
    SubjectModule,
    SectionModule,
    PrismaModule,
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`, '.env', `.env.${process.env.NODE_ENV}.local`, '.env.local'],
      isGlobal: true,
      load: [config],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ],
})
export class AppModule {}
