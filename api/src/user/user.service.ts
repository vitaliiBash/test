import { Injectable } from '@nestjs/common'

import { PrismaService } from 'src/prisma/prisma.service'
import { FilterUserDto } from './dto/user.dto'
import { CreateInvitationDto } from './dto/invite.dto'
import { AuthService } from 'src/auth/auth.service'

import { Roles } from 'src/types/enum/roles'
import { TokenType } from 'src/auth/types/enum'

@Injectable()
export class UserService {
  constructor(
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

}
