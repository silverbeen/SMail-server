import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constants';

export const Authorization = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const jwtService = new JwtService({});

    const request = ctx.switchToHttp().getRequest();
    const token: string = request.headers.authorization;

    if (token === undefined) {
      return '';
    } else {
      const content = jwtService.verify(token.split(' ')[1], {
        secret: jwtConstants.secret,
      });

      return content;
    }
  },
);
