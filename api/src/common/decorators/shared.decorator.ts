import { Reflector } from '@nestjs/core';
import { TokenType } from 'src/auth/types/enum';

export const Shared = Reflector.createDecorator<TokenType>();
