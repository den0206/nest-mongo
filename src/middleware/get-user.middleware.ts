import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class GetUserMiddleWare implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: any) => void) {
    const authJwtToken = req.headers.authrization as string;
    if (!authJwtToken) {
      next();
      return;
    }

    try {
      const user = jwt.verify(authJwtToken, 'secret');
      if (user) {
        console.log(user);
        req['user'] = user;
      }
    } catch (e) {}
  }
}
