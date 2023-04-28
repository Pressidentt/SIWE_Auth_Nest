import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../user.entity';

export const Client = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request: any = ctx.switchToHttp().getRequest();
    const user = request.user
    if (data) {
      return user?.[data]
    }
    return user;
  }
)