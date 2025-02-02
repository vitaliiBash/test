import { Injectable, NotFoundException } from '@nestjs/common'

import { PrismaService } from 'src/modules/prisma/prisma.service'

import { CreateClassroomDto } from './dto/classroom.dto'

@Injectable()
export class ClassroomService {
  constructor(private readonly prisma: PrismaService) {}

  public async createClassRoom(body: CreateClassroomDto) {
    const cr = await this.prisma.classRoom.create({
      data: body,
    })

    return cr
  }

  public async getClassRooms() {
    const crs = await this.prisma.classRoom.findMany()

    return crs
  }

  public async getClassRoom(id: number) {
    const cr = await this.prisma.classRoom.findFirst({
      where: {
        id,
      },
    })

    if (!cr) {
      throw new NotFoundException(`Classroom ${id} not found`)
    }

    return cr
  }

  public async deleteClassRoom(id: number) {
    await this.prisma.classRoom.delete({
      where: {
        id,
      },
    })
  }
}
