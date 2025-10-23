import { Injectable } from '@nestjs/common';
import { log } from 'src/infra/logger';

@Injectable()
export class UsersService {
  list(): Array<{ name: string; email: string }> {
    log.info('Buscando usuários...');
    return [
      { name: 'John Doe', email: 'john.doe@example.com' },
      { name: 'Janet Doe', email: 'janet.doe@example.com' },
      { name: 'Mark Doe', email: 'mark.doe@example.com' },
    ];
  }
}
