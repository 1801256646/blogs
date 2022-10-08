const { HOST, PORT } = process.env;

export default () => ({
  common: {
    ip: HOST || '127.0.0.1',
    port: PORT || 8080,
  },
});
