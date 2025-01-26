import { BadRequestException, Injectable } from '@nestjs/common'

import { SectionService } from '../section/section.service';
import { PrismaService } from 'src/prisma/prisma.service'
import { FilterUserDto } from './dto/user.dto'
import { CreateInvitationDto } from './dto/invite.dto'
import { AuthService } from 'src/auth/auth.service'

import { Roles } from 'src/types/enum/roles'
import { TokenType } from 'src/auth/types/enum'
import { FilterSectionScheduleDto } from 'src/section/dto/section.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly sectionService: SectionService,
    private readonly prisma: PrismaService,
    private readonly auth: AuthService
  ) {}

  async getUsers(filter: FilterUserDto) {
    const users = await this.prisma.user.findMany({
      where: {
        email: filter.email,
      },
      include: {
        userRole: {
          select: {
            role: true
          }
        }
      }
    })

    return users
  }

  async createInvitationToken(params: CreateInvitationDto) {
    const token = this.auth.generateToken({ type: TokenType.INVITATION, role: params.role });

    return { token };
  }

  async registerUser(email: string, password: string, role: Roles) {
    const user = await this.prisma.user.create({
      data: {
        email,
        password,
        userRole: {
          create: {
            role
          },
        }
      },
      include: {
        userRole: true
      }
    });

    return user;
  }

  async getSchedule(userId: string, filters: FilterSectionScheduleDto) {
    const { role } = await this.prisma.userRole.findFirst({
      select: {
        role: true
      },
      where: {
        userId
      }
    });

    switch(role) {
    case Roles.teacher:
      return this.sectionService.getTeacherSchedule(userId, filters.sectionId);
    case Roles.student:
      return this.sectionService.getStudentSchedule(userId, filters.sectionId);
    default:
        throw new BadRequestException(`Unexpected user role ${role}`);
    }
  }

}
