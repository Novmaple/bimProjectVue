const { exec } = require('../db/mysql')
const jwt = require('jsonwebtoken');  //用来生成token

const login = (username, password) => {
    const sql = `
        select id, name, address, contactName, contactTelNumber, username from users where username = '${username}' and password='${password}'
    `
    // exec 函数返回 promise 对象
    return exec(sql).then(rows => {
        if (rows[0]!=null){
            let content = {
                id: rows[0].id || '',
                name: rows[0].name || '',
                address: rows[0].address || '',
                contactName: rows[0].contactName || '',
                contactTelNumber: rows[0].contactTelNumber || '',
                username: rows[0].username || ''
            };
            let secretOrPrivateKey = "jwt";// 这是加密的key（密钥）
            let token = jwt.sign(content, secretOrPrivateKey, {
                expiresIn: 60 * 60 * 1  // 1小时过期
            });
            rows[0].token = token
        }
        // console.log(typeof(rows[0]))
        // console.log(rows[0])
        // console.log(token)
        return rows[0] || {}
    })
}

module.exports = {
    login
}