import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSectionDto, FilterSectionsDto } from './dto/section.dto';

import { Roles } from 'src/types/enum/roles';

@Injectable()
export class SectionService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async createSection(params: CreateSectionDto) {
        const teacher = await this.prisma.user.findFirst({
            where: {
                id: params.teacherId,
                userRole: {
                    role: Roles.teacher
                }
            },
            include: {
                userRole: true
            }
        });

        if (teacher === null) {
            throw new BadRequestException(`User ${params.teacherId} does not have ${Roles.teacher} role`);
        }

        const section = await this.prisma.section.create({
            data: params
        });

        return section;
    }

    async getSections(filter: FilterSectionsDto) {
        const sections = await this.prisma.section.findMany({
            where: {
                teacherId: filter.teacherId,
                subjectId: filter.subjectId,
            }
        });

        return sections;
    }

    async getSection(id: number) {
        const section = await this.prisma.section.findFirst({
            where: {
                id,
            },
        });

        return section;
    }

    async deleteSection(id: number) {
        await this.prisma.section.delete({
            where: {
                id
            }
        });
    }
}
