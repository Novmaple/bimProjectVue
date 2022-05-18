class BaseModel {
    constructor(data, message) {
        if (typeof data === 'string') {
            this.message = data
            data = null
            message = null
        }
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }
}

class SuccessModel extends BaseModel {
    constructor(data, message) {
        // super 在子构造器中调用父构造器
        super(data, message)
        this.meta = {
            "msg": "获取数据成功",
            "status": 200
        }
        // this.errno = 0
        // this.meta.msg = "登录成功"
        // this.meta.status = 200
    }
}

class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.meta = {
            "msg": "获取数据失败",
            "status": 404
        }
        // this.errno = -1
        // this.meta.msg = "登录失败"
        // this.meta.status = 404
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}