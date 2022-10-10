import { RouteConfig } from 'react-router-config'
import Home from '@/presentation/page/home';
import Login from '@/presentation/page/login';
import Register from '@/presentation/page/register';
import Release from '@/presentation/page/release';

export const router: RouteConfig[] = [
    {
        path: '/',
        component: Home,
        exact: true,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/register',
        component: Register,
    },
    {
        path: '/release',
        component: Release,
    }
];
