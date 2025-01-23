import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common'

import { Serialize } from 'src/interceptors/serialize.interceptor'

import { UserService } from './user.service'
import { FilterUserDto, UserDto } from './dto/user.dto'

import { CreateInvitationDto, InviteDto, RegisterByTokenDto } from './dto/invite.dto'

import { RolesGuard } from 'src/common/guards/roles.quard'
import { SharedGuard } from 'src/common/guards/shared.guard'

import { AllowedRoles } from 'src/common/decorators/roles.decorator'
import { Public } from 'src/common/decorators/public-auth.decorator'
import { Shared } from 'src/common/decorators/shared.decorator'

import { Roles } from 'src/types/enum/roles'
import { TokenType } from 'src/auth/types/enum'
import { Invitation } from 'src/common/decorators/invitation-param.decorator';
import { InvitationPayloadDto } from 'src/auth/dto/auth.dto';

@Controller({
  version: '1',
  path: 'user',
})
@UseGuards(RolesGuard, SharedGuard)
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
  async createInvitationToken(@Body() body: CreateInvitationDto) {
    const data = await this.userService.createInvitationToken(body);

    return { data };
  }

  @Post('register')
  @Public()
  @Shared(TokenType.INVITATION)
  @Serialize(UserDto)
  async register(@Invitation() invite: InvitationPayloadDto, @Body() body: RegisterByTokenDto) {
    const data = await this.userService.registerUser(body.email, body.password, invite.role);

    return { data };
  }
}
