const { HOST, PORT } = process.env;
import { registerAs } from '@nestjs/config';

export default registerAs('global', () => ({
  host: HOST || '0.0.0.0',
  port: PORT || '8080',
}));
