import { Reflector } from '@nestjs/core'
import { TokenType } from 'src/modules/auth/types/enum'

export const Shared = Reflector.createDecorator<TokenType>()
