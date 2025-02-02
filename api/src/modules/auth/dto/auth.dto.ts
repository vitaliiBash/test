import { Equals, IsEnum } from 'class-validator'
import { InvitationTokenPayload } from '../types/auth'

import { Roles } from 'src/types/enum/roles'
import { TokenType } from '../types/enum'

export class InvitationPayloadDto implements InvitationTokenPayload {
  @Equals(TokenType.INVITATION)
  type: TokenType.INVITATION

  @IsEnum(Roles)
  role: Roles
}
