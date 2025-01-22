import { Roles } from 'src/types/enum/roles';

import { TokenType } from './enum';

export type InvitationTokenPayload = {
    type: TokenType.INVITATION,
    role: Roles
}

export type TokenPayload = {
    type: TokenType,
    [key: string]: unknown
}
