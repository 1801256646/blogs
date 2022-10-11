import { UserData } from '@/application/service/user';

export const isLogin = () => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    return !!(username && password)
}

export const getUsername = () => {
    return localStorage.getItem('username');
}

export const getUser = (): UserData => {
    try {
        return JSON.parse(localStorage.getItem('user') || '{}');
    } catch (err) {
        return {} as any;
    }
}