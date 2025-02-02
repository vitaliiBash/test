import { Body, Controller, Param, Get, Post, Query, UseGuards, StreamableFile } from '@nestjs/common'

import { Serialize } from 'src/common/interceptors/serialize.interceptor'

import { UserService } from './user.service'
import { SectionService } from '../section/section.service'
import { FilterUserDto, UserDto } from './dto/user.dto'
import { InvitationPayloadDto } from 'src/modules/auth/dto/auth.dto'
import { CreateInvitationDto, InviteDto, RegisterByTokenDto } from './dto/invite.dto'
import { FilterSectionScheduleDto, SectionScheduledDto } from 'src/modules/section/dto/section.dto'

import { RolesGuard } from 'src/common/guards/roles.quard'
import { SharedGuard } from 'src/common/guards/shared.guard'

import { Invitation } from 'src/common/decorators/invitation-param.decorator'
import { AllowedRoles } from 'src/common/decorators/roles.decorator'
import { Public } from 'src/common/decorators/public-auth.decorator'
import { Shared } from 'src/common/decorators/shared.decorator'
import { ReqUser } from 'src/common/decorators/user.decorator'

import { User } from '@prisma/client'
import { Roles } from 'src/types/enum/roles'
import { TokenType } from 'src/modules/auth/types/enum'

@Controller({
  version: '1',
  path: 'user',
})
@UseGuards(RolesGuard, SharedGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly sectionService: SectionService,
  ) {}

  @Get()
  @Serialize(UserDto)
  async getUsers(@Query() filter: FilterUserDto) {
    const data = await this.userService.getUsers(filter)

    return { data }
  }

  @Post('invite')
  @AllowedRoles([Roles.admin])
  @Serialize(InviteDto)
  async createInvitationToken(@Body() body: CreateInvitationDto) {
    const data = await this.userService.createInvitationToken(body)

    return { data }
  }

  @Post('register')
  @Public()
  @Shared(TokenType.INVITATION)
  @Serialize(UserDto)
  async register(@Invitation() invite: InvitationPayloadDto, @Body() body: RegisterByTokenDto) {
    const data = await this.userService.registerUser(body.email, body.password, invite.role)

    return { data }
  }

  @Post('me/section/:id/enroll')
  @AllowedRoles([Roles.student])
  async enrollToSection(@ReqUser() user: User, @Param('id') id: string) {
    await this.sectionService.enroll(user, Number(id))
  }

  @Post('me/section/:id/unenroll')
  @AllowedRoles([Roles.student])
  async unenrollToSection(@ReqUser() user: User, @Param('id') id: string) {
    await this.sectionService.unenroll(user, Number(id))
  }

  @Get('me/schedule')
  @Serialize(SectionScheduledDto)
  async getSchedule(@ReqUser() user: User, @Query() filter: FilterSectionScheduleDto) {
    const data = await this.userService.getSchedule(user.id, filter)

    return { data }
  }

  @Post('me/schedule/export')
  async exportSchedule(@ReqUser() user: User) {
    const stream = await this.userService.exportSchedule(user)

    return new StreamableFile(stream)
  }
}
