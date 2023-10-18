import { SetMetadata } from '@nestjs/common';
import { jwtConstants } from './auth.constants';

export const IS_PUBLIC_KEY = jwtConstants.secret;
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);