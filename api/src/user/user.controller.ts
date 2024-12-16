import { Controller, Get, Query } from '@nestjs/common'

import { Serialize } from 'src/interceptors/serialize.interceptor'

import { UserService } from './user.service'
import { FilterUserDto, UserDto } from './dto/user.dto'

@Controller({
  version: '1',
  path: 'user',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Serialize(UserDto)
  async getUsers(@Query() filter: FilterUserDto) {
    const data = await this.userService.getUsers(filter)

    return { data }
  }
}
