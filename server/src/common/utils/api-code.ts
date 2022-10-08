export enum Code {
  API_ERROR = 400,
  SUCCESS = 0,
}

export const resultCode = <T>(params?: {
  code?: Code;
  message?: string;
  data?: T;
}) => {
  return {
    code: params?.code ?? Code.SUCCESS,
    message: params?.message ?? 'success',
    data: params?.data,
  };
};
