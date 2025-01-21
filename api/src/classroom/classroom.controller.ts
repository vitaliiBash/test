import { Controller, Post, Body, UseGuards } from '@nestjs/common'

import { Serialize } from 'src/interceptors/serialize.interceptor'

import { ClassroomService } from './classroom.service'
import { ClassroomDto, CreateClassroomDto } from './dto/classroom.dto'

import { RolesGuard } from 'src/common/guards/roles.quard';

import { AllowedRoles } from 'src/common/decorators/roles.decorator';

import { Roles } from 'src/types/enum/roles';

@Controller({
  version: '1',
  path: 'classroom',
})
@UseGuards(RolesGuard)
export class ClassroomController {
  constructor(private readonly classroomService: ClassroomService) {}

  @Post()
  @AllowedRoles([Roles.admin])
  @Serialize(ClassroomDto)
  async createClassRoom(@Body() body: CreateClassroomDto) {
    const data = await this.classroomService.createClassRoom(body);

    return { data };
  }
}
