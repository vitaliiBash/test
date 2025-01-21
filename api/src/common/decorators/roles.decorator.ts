import { Reflector } from '@nestjs/core';
import PrismClient from '@prisma/client';

export const AllowedRoles = Reflector.createDecorator<PrismClient.Roles[]>();
