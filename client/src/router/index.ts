import { RouteConfig } from 'react-router-config'
import Home from '../presentation/page/home';

export const router: RouteConfig[] = [
    {
        path: '/',
        component: Home,
        exact: true,
    }
];
