var express = require('express');
var router = express.Router();

const { getQuestion, getScore, getRecord, getRecordCount } = require('../controller/review')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.post('/getQuestion', (req, res, next) => {
    const userId = req.body.userId
    let result = getQuestion(userId)
    return result.then(resultData => {
        if (resultData) {
            res.json(
                new SuccessModel(resultData)
            )
        } else {
            res.json(
                new ErrorModel()
            )
        }
    })
})

router.post('/getScore', (req, res, next) => {
    const activityId = req.body.activityId
    const userId = req.body.userId
    const result = getScore(userId, activityId)
    return result.then(resultData => {
        if (resultData) {
            res.json(
                new SuccessModel(resultData)
            )
        } else {
            res.json(
                new ErrorModel()
            )
        }
    })
})

router.post('/getRecord', (req, res, next) => {
    const activityId = req.body.activityId
    const userId = req.body.userId
    const result = getRecord(userId, activityId)
    return result.then(resultData => {
        if (resultData) {
            res.json(
                new SuccessModel(resultData)
            )
        } else {
            res.json(
                new ErrorModel()
            )
        }
    }) 
})

router.post('/getRecordCount', (req, res, next) => {
    const activityId = req.body.activityId
    const userId = req.body.userId
    const result = getRecordCount(userId, activityId)
    return result.then(resultData => {
        if (resultData) {
            res.json(
                new SuccessModel(resultData)
            )
        } else {
            res.json(
                new ErrorModel()
            )
        }
    })
})

module.exports = router;
