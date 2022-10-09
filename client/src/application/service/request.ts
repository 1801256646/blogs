import axios, { AxiosResponse} from 'axios';

export interface CommonAPI<T = {}> {
    code: number;
    message: string;
    data: T;
}

const request = axios.create({
    baseURL: 'http://127.0.0.1:8080',
    timeout: 60000,
});

request.interceptors.request.use();

request.interceptors.response.use((res: AxiosResponse<CommonAPI>) => {
    const { code, message } = res.data;
    if (code !== 0) {
        return Promise.reject(new Error(message));
    }
    return Promise.resolve(res);
})

export default request;