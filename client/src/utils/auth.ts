export const isLogin = () => {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    return !!(username && password)
}

export const getUsername = () => {
    return localStorage.getItem('username');
}