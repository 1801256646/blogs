import axios, { AxiosResponse } from 'axios';
import qs from 'qs';

export interface CommonAPI<T = {}> {
    code: number;
    message: string;
    data: T;
}

const request = axios.create({
    baseURL: '/api',
    timeout: 60000,
});

request.interceptors.request.use();

request.interceptors.response.use((res: AxiosResponse<CommonAPI>) => {
    const { code, message } = res.data;
    if (code !== 0) {
        return Promise.reject(message);
    }
    return Promise.resolve(res);
})

export interface Request<T> {
    data?: T;
    url: string;
}
export enum Method {
    Get = 'GET',
    Post = 'POST',
}
export class HttpClient {
    post<T>(dto: Request<T>) {
        const { data, url } = dto;
        return request.post(url, data);
    }
    get<T>(dto: Request<T>) {
        const { data, url } = dto;
        const query = qs.stringify(data);
        return request.get(`${url}?${query}`);
    }
}
const client = new HttpClient();
export default client;
