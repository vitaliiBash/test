import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/modules/prisma/prisma.service'
import { CreateSubjectDto } from './dto/subject.dto'

@Injectable()
export class SubjectService {
  constructor(private readonly prisma: PrismaService) {}

  async createSubject(params: CreateSubjectDto) {
    const subject = await this.prisma.subject.create({
      data: params,
    })

    return subject
  }

  async getSubjects() {
    return this.prisma.subject.findMany()
  }

  async getSubject(id: number) {
    const subject = await this.prisma.subject.findFirst({
      where: {
        id,
      },
    })

    if (!subject) {
      throw new NotFoundException(`Subject ${id} not found`)
    }

    return subject
  }

  async deleteSubject(id: number) {
    await this.prisma.subject.delete({
      where: {
        id,
      },
    })
  }
}
