import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common'

import { SubjectService } from './subject.service'

import { RolesGuard } from 'src/common/guards/roles.quard'
import { AllowedRoles } from 'src/common/decorators/roles.decorator'

import { Roles } from 'src/types/enum/roles'
import { Serialize } from 'src/common/interceptors/serialize.interceptor'

import { CreateSubjectDto, SubjectDto } from './dto/subject.dto'

@Controller({
  version: '1',
  path: 'subject',
})
@UseGuards(RolesGuard)
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  @AllowedRoles([Roles.admin, Roles.teacher])
  @Serialize(SubjectDto)
  async createSubject(@Body() body: CreateSubjectDto) {
    const data = await this.subjectService.createSubject(body)

    return { data }
  }

  @Get()
  @Serialize(SubjectDto)
  async index() {
    const data = await this.subjectService.getSubjects()

    return { data }
  }

  @Get(':id')
  @Serialize(SubjectDto)
  async getSubject(@Param('id') id: string) {
    const data = await this.subjectService.getSubject(Number(id))

    return { data }
  }

  @Delete(':id')
  async deleteSubject(@Param('id') id: string) {
    await this.subjectService.deleteSubject(Number(id))
  }
}
