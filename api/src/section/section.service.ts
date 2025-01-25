import { BadRequestException, Injectable } from '@nestjs/common';

import * as moment from 'moment';

import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSectionDto, FilterSectionsDto } from './dto/section.dto';

import { Day } from 'src/types/enum/days';
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

    async schedule(sectionId: number, classroomId: number, day: Day, startHour: number, startMinute: number, duration: number) {
        const startTime = moment(0).utc().add({ hour: startHour, minute: startMinute});
        const endTime = startTime.clone().add(duration, 'minutes');

        const hasOverlap = await this.hasOverlapSectionsByClassroom(classroomId, day, startTime, endTime);

        if (hasOverlap) {
            throw new BadRequestException('The classroom is already taken');
        }

        const schedule = await this.prisma.sectionSchedule.create({
            data: {
                sectionId,
                classroomId,
                day,
                startTime: startTime.toDate(),
                endTime: endTime.toDate()
            }
        });

        return schedule;
    }

    async removeSchedule(scheduleId: number) {
        await this.prisma.sectionSchedule.delete({
            where: {
                id: scheduleId
            }
        });
    }

    private async hasOverlapSectionsByClassroom(classroomId: number, day: Day, startTime: moment.Moment, endTime: moment.Moment) {
        const res: Array<{ exist: 1 }> = await this.prisma.$queryRaw`
            select 1 exist
            from "SectionSchedule"
            where
                "classroomId" = ${classroomId} and
                "day" = ${day}::"Day" and
                "timeRange" && tsrange(${startTime.format('YYYY-MM-DD HH:mm:ss')}::timestamp, ${endTime.format('YYYY-MM-DD HH:mm:ss')}::timestamp, '[)')
            limit 1
        `;

        return Boolean(res[0]);
    }
}
