import { Controller, Get, Post, Delete, Body, UseGuards, Param } from '@nestjs/common'

import { Serialize } from 'src/common/interceptors/serialize.interceptor'

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

  @Get()
  @Serialize(ClassroomDto)
  async index() {
    const data = await this.classroomService.getClassRooms();

    return { data };
  }

  @Get(':id')
  @Serialize(ClassroomDto)
  async getClassRoom(@Param('id') id: string) {
    const data = await this.classroomService.getClassRoom(Number(id));

    return { data };
  }

  @Delete(':id')
  @AllowedRoles([Roles.admin])
  async deleteClassRoom(@Param('id') id: string) {
    await this.classroomService.deleteClassRoom(Number(id));
  }
}
