const { HOST, PORT } = process.env;
import { registerAs } from '@nestjs/config';

export default registerAs('global', () => ({
  ip: HOST || '8080',
  port: PORT || '127.0.0.1',
}));
