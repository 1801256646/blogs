import { registerAs } from '@nestjs/config';
const { DB_HOST, DB_PORT, DB_NAME, DB_PASSWORD, DB_DATABASE } = process.env;

export default registerAs('database', () => ({
  host: DB_HOST || '127.0.0.1',
  port: DB_PORT || 3306,
  username: DB_NAME || 'root',
  password: DB_PASSWORD || '000000raftx',
  database: DB_DATABASE || 'blog',
}));
