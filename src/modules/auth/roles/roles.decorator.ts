import { UserRoleEnum } from '../../user/enums/user-role.enum';
import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY } from '../constants/auth-constants';

export const Roles = (...args: UserRoleEnum[]) => SetMetadata(ROLES_KEY, args);
