const { HOST, PORT } = process.env;
import { registerAs } from '@nestjs/config';

export default registerAs('global', () => ({
  ip: HOST,
  port: PORT,
}));
