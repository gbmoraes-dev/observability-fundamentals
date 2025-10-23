import { pino } from 'pino';

export const log = pino({
  level: 'debug',
  transport: {
    targets: [
      {
        target: 'pino-pretty',
        level: 'error',
        options: {
          name: 'dev-terminal',
          colorize: true,
          levelFirst: true,
          translateTime: 'SYS:dd/mm/yyyy HH:MM:ss Z',
          include: 'level,time',
          ignore: 'pid,hostname',
        },
      },
    ],
  },
});
