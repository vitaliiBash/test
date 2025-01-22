import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { FilterUserDto } from './dto/user.dto'
import { createInvitationDto } from './dto/invite.dto'
import { AuthService } from 'src/auth/auth.service'

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

  async createInvitationToken(params: createInvitationDto) {
    const token = this.auth.generateToken({ role: params.role });

    return { token };
  }

}
