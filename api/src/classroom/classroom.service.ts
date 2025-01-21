import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import { CreateClassroomDto } from './dto/classroom.dto';

@Injectable()
export class ClassroomService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    public async createClassRoom(body: CreateClassroomDto) {
        const cr = await this.prisma.classRoom.create({
            data: body
        });

        return cr;
    }
};
