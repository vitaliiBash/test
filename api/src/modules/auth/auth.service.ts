import * as jwt from 'jsonwebtoken'

import { ConfigService } from '@nestjs/config'
import { Injectable } from '@nestjs/common'

import { TokenPayload } from './types/auth'

@Injectable()
export class AuthService {
  private readonly secret: string

  constructor(private readonly config: ConfigService) {
    this.secret = this.config.get('JWT_SECRET')
  }

  generateToken(payload: TokenPayload, expiresIn?: number) {
    const options: jwt.SignOptions = {}

    if (expiresIn) {
      options.expiresIn = expiresIn
    }

    return jwt.sign(payload, this.secret, options)
  }

  veifyToken(token: string) {
    return jwt.verify(token, this.secret)
  }
}
