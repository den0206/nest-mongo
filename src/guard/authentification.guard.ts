import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as request from 'supertest';

@Injectable()
export class AuthentificatnGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const host = context.switchToHttp(),
      request = host.getRequest();

    const user = request['user'];
    if (!user) {
      throw new UnauthorizedException();
    }

    return true;
  }
}
