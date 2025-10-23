import { Injectable } from '@nestjs/common';
import { log } from 'src/infra/logger';
import { request } from 'undici';

export interface User {
  name: string;
  email: string;
}

@Injectable()
export class UsersService {
  async list(): Promise<User[]> {
    const { statusCode, body } = await request('http://localhost:8081/users');

    const payload = (await body.json()) as User[];

    log.info(
      JSON.stringify({
        statusCode,
        users: payload,
      }),
    );

    return payload;
  }
}
