import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  ping(): any {
    return { ping: new Date() };
  }
}
