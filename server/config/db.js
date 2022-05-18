// process 就是 nodejs 的进程的一些信息
const env = process.env.NODE_ENV

// 配置
let MYSQL_CONF
let REDIS_CONF

if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mybimproject'
    }

    REDIS_CONF = {
        port: 6379,
        host: 'localhost'
    }
}

// 当部署到服务器上时需要独立配置
if (env === 'production') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: '123456',
        port: '3306',
        database: 'mybimproject'
    }

    REDIS_CONF = {
        port: 6379,
        host: 'localhost'
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}