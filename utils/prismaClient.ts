import { PrismaClient } from '@prisma/client';

const prismaClient = () =>
  new PrismaClient({
    errorFormat: 'pretty',
    log: ['query', 'info', 'warn', 'error'],
  });

export default prismaClient;
