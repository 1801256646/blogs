import React from 'react';
import { observable, computed, action, runInAction, makeObservable } from 'mobx';
import { UserData, LoginUser } from '@/application/service/user';

class AuthStore {
    @observable
    user: UserData | null = null;

    @computed
    get isLogin() {
        return !!this.user;
    }

    constructor() {
        makeObservable(this);
    }

    @action
    loginUser = async () => {
        try {
            const data: UserData = JSON.parse(localStorage.getItem('user') || '{}');
            if (data?.username) {
                const { data: userData } = await LoginUser({
                    username: data?.username,
                    password: data?.password,
                });
                localStorage.setItem('user', JSON.stringify(userData));
                runInAction(() => {
                    console.log(userData);
                    this.user = userData;
                })
            }
        } catch (err) {
            localStorage.removeItem('user');
        }
    }
}

const context = React.createContext(new AuthStore());

export default () => React.useContext(context);
