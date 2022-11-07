const { HOST, PORT } = process.env;
import { registerAs } from '@nestjs/config';

export default registerAs('global', () => ({
  host: HOST || '127.0.0.1',
  port: PORT || '8080',
}));
