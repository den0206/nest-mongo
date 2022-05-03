import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthoraizationGuard implements CanActivate {
  constructor(private allowedRoles: string[]) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const host = context.switchToHttp(),
      request = host.getRequest();

    const user = request['user'];
    const allow = this.isAllow(user.roles);

    if (!allow) {
      throw new ForbiddenException();
    }

    return true;
  }

  isAllow(userRoles: string[]) {
    let allowed = false;

    userRoles.forEach((role) => {
      if (this.allowedRoles.includes(role)) {
        allowed = true;
      }
    });

    return allowed;
  }
}
