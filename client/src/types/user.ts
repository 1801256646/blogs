export const rule = {
    username: [
        {
            min: 6,
            message: '用户名不能少于6位'
        },
        {
            max: 15,
            message: '用户名长度不能超过15位'
        },
        {
            required: true,
            message: '用户名不能为空'
        },
    ],
    password: [
        {
            min: 6,
            message: '密码不能少于6位'
        },
        {
            max: 15,
            message: '密码长度不能超过15位'
        },
        {
            required: true,
            message: '密码不能为空'
        },
    ],
    cname: [
        {
            min: 2,
            message: '昵称不能少于2位'
        },
        {
            max: 15,
            message: '昵称长度不能超过15位'
        },
        {
            required: true,
            message: '昵称不能为空'
        },
    ]
};