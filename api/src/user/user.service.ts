import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { FilterUserDto } from './dto/user.dto'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

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
}
