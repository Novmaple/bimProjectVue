const redis = require('redis')
const { REDIS_CONF } = require('../config/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err => {
    console.error(err)
})

function set(key, value) {
    if (typeof value === 'object') {
        val = JSON.stringify(value)
    }
    redisClient.set(key, value, redis.print)
}

function get(key) {
    const promise = new Promise((resolve, reject) => {
        redisClient.get(key, (err, value) => {
            if (err) {
                reject(err)
                return
            }
            if (value == null) {
                resolve(null)
                return
            }

            try {
                resolve(
                    JSON.parse(value)
                )
            } catch (ex) {
                resolve(value)
            }
        })
    })
    return promise
}

module.exports = {
    set,
    get
}