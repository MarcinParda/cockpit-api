import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['cockpit-api-key'];
    if (apiKey && apiKey === process.env.API_KEY) {
      return true;
    }
    throw new UnauthorizedException('Invalid API key');
  }
}
