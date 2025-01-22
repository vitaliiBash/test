import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common'

import { Serialize } from 'src/interceptors/serialize.interceptor'

import { UserService } from './user.service'
import { FilterUserDto, UserDto } from './dto/user.dto'

import { createInvitationDto, InviteDto } from './dto/invite.dto'

import { RolesGuard } from 'src/common/guards/roles.quard'
import { AllowedRoles } from 'src/common/decorators/roles.decorator'

import { Roles } from 'src/types/enum/roles'

@Controller({
  version: '1',
  path: 'user',
})
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Serialize(UserDto)
  async getUsers(@Query() filter: FilterUserDto) {
    const data = await this.userService.getUsers(filter)

    return { data }
  }

  @Post('invite')
  @AllowedRoles([Roles.admin])
  @Serialize(InviteDto)
  async createInvitationToken(@Body() body: createInvitationDto) {
    const data = await this.userService.createInvitationToken(body);

    return { data };
  }
}
