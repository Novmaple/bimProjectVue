var express = require('express');
var router = express.Router();

const { login } = require('../controller/users')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.post('/login', function (req, res, next) {
    const username = req.body.username || ''
    const password = req.body.password || ''
    let result = login(username, password)
    return result.then(usersData => {
        // let Data = usersData
        // Data.data.token = token
        if (usersData.id) {
            res.json(
                new SuccessModel(usersData)
            )
        } else {
            res.json(
                new ErrorModel()
            )
        }
    })
})

module.exports = router;
