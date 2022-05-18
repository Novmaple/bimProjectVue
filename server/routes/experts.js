var express = require('express');
var router = express.Router();

const { getComposition,getStar } = require('../controller/experts')
const { SuccessModel, ErrorModel } = require('../model/resModel')

/* GET home page. */
router.get('/getComposition', function (req, res, next) {
  let result = getComposition()
  let data = {}
  // console.log(result)
  return result.then(resultData => {
    if (resultData) {
      data.parts = resultData[0]
      data.count = resultData[1]
      res.json(
        new SuccessModel(data)
      )
    } else {
      res.json(
        new ErrorModel()
      )
    }
  })
  // res.json({
  //     errno: 0,
  //     data: {
  //       parts: ["建设单位成员", "专家组成员", "设计单位成员"],
  //       number: result
  //     }
  // })
});

router.get('/getStar', function (req, res, next) {
  let result = getStar()
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
