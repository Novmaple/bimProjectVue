# 1. 建筑评审平台后台API接口文档

## 1.1. API V1 接口说明

- 接口基准地址（BaseUrl）：`http://localhost:8888/api/`
- 数据返回格式统一使用JSON
- API V1 认证统一使用 Token 认证
- 服务端已开启 CORS 跨域支持

### 1.1.1 支持的请求方法

- GET（SELECT）：从服务器取出资源（一项或多项）。
- POST（CREATE）：在服务器新建一个资源。

### 1.1.2. 通用返回状态说明

| *状态码* | *含义*                | *说明*                               |
| -------- | --------------------- | ------------------------------------ |
| 200      | OK                    | 请求成功                             |
| 404      | NOT FOUND             | 请求的资源不存在                     |

## 1.2. 登录

### 1.2.1. 登录验证接口

- 请求路径：`users/login`

- 请求方法：POST

- 请求参数

| 参数名   | 参数说明 | 备注     |
| -------- | -------- | -------- |
| username | 用户名   | 不能为空 |
| password | 密码     | 不能为空 |

- 响应参数

| 参数名           | 参数说明     |
| ---------------- | ------------ |
| id               | 用户名       |
| name             | 业主公司名   |
| address          | 业主公司地址 |
| contactName      | 联系人名     |
| contactTelNumber | 联系人电话   |
| username         | 用户名       |

- 请求成功

```json
{
    "data": {
        "id": 4,
        "name": "admin",
        "address": "admin",
        "contactName": "admin",
        "contactTelNumber": "84684384354",
        "username": "admin",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwibmFtZSI6ImFkbWluIiwiYWRkcmVzcyI6ImFkbWluIiwiY29udGFjdE5hbWUiOiJhZG1pbiIsImNvbnRhY3RUZWxOdW1iZXIiOiI4NDY4NDM4NDM1NCIsInVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2MzQwMTcxMjMsImV4cCI6MTYzNDAyMDcyM30.yVS7Cbv1ZdSLu0U3G2rIG92enynQVtsBNzwOCZP_55M"
    },
    "meta": {
        "msg": "登录成功",
        "status": 200
    }
}
```

- 请求失败

```json
{
    "data": {},
    "meta": {
        "msg": "登录失败",
        "status": 404
    }
}
```

## 1.3. 业主主页

### 1.3.1 评价专家组成情况/评价专家团队占比

- 请求路径：`experts/getComposition`
- 请求方法：GET
- 请求参数：无
- 响应参数：

| 参数名 | 参数说明                       |
| ------ | ------------------------------ |
| parts  | 专家类型                       |
| count  | 对应单位的人数，按从小到大排序 |

- 响应示例：

```json
{
    "data": {
        "parts": [
            "建设单位成员",
            "专家组成员",
            "设计单位成员"
        ],
        "count": [
            3,
            7,
            20
        ]
    },
    "meta": {
        "msg": "获取数据成功",
        "status": 200
    }
}
```

### 1.3.2 各星级占比

- 请求路径：`experts/getStar`
- 请求方法：GET
- 请求参数：无
- 响应参数：键值对形式，见示例
- 响应示例：

```json
{
    "data": [
        {
            "star": "4",
            "count": 14
        },
        {
            "star": "3",
            "count": 7
        },
        {
            "star": "5",
            "count": 4
        },
        {
            "star": "2",
            "count": 3
        },
        {
            "star": "1",
            "count": 2
        }
    ],
    "meta": {
        "msg": "获取数据成功",
        "status": 200
    }
}
```

### 1.3.3 整体成绩评价(信息)

- 请求路径：`review/getQuestion`
- 请求方法：POST
- 请求参数：

| 参数名 | 参数说明 |
| ------ | -------- |
| userId | 用户 ID  |

- 响应参数

| 参数名       | 参数说明           |
| ------------ | ------------------ |
| userId       | 用户 ID            |
| activitiesId | 评审活动 ID        |
| createTime   | 创建时间           |
| buildingName | 评审活动的建筑名   |
| version      | 评审活动的建筑版本 |
| stem         | 评审问题的题干     |
| branch       | 评审问题的分支     |

- 响应示例

```json
{
    "data": [
        {
            "userId": 1,
            "activitiesId": 8,
            "createTime": "1634171627232",
            "buildingName": "建筑一",
            "version": "1.3",
            "stem": [
                "修缮设计整体评价成绩：",
                "修缮设计整体评价成绩："
            ],
            "branch": [
                [
                    "总体环境保护整治设计评价成绩：",
                    "外立面的保护设计评价成绩：",
                    "内部空间设计评价成绩：",
                    "内装修保护评价成绩：",
                    "结构加固设计评价成绩：",
                    "设备修缮更新设计评价成绩：",
                    "消防设计评价成绩：",
                    "节能设计评价成绩：",
                    "环保及白蚁防止设计评价成绩：",
                    "其他一般性评价成绩："
                ],
                [
                    "重点保护部位、重难点及保护措施：",
                    "施工准备与资源配置计划：",
                    "主要分部分项施工方案：",
                    "施工现场平面布置：",
                    "应急预案和安全文明施工等内容："
                ]
            ]
        },
        {
            "userId": 1,
            "activitiesId": 5,
            "createTime": "1634171627231",
            "buildingName": "建筑一",
            "version": "1.2",
            "stem": [
                "修缮设计整体评价成绩：",
                "修缮设计整体评价成绩："
            ],
            "branch": [
                [
                    "总体环境保护整治设计评价成绩：",
                    "外立面的保护设计评价成绩：",
                    "内部空间设计评价成绩：",
                    "内装修保护评价成绩：",
                    "结构加固设计评价成绩：",
                    "设备修缮更新设计评价成绩：",
                    "消防设计评价成绩：",
                    "节能设计评价成绩：",
                    "环保及白蚁防止设计评价成绩：",
                    "其他一般性评价成绩："
                ],
                [
                    "重点保护部位、重难点及保护措施：",
                    "施工准备与资源配置计划：",
                    "主要分部分项施工方案：",
                    "施工现场平面布置：",
                    "应急预案和安全文明施工等内容："
                ]
            ]
        },
        {
            "userId": 1,
            "activitiesId": 1,
            "createTime": "1634171627227",
            "buildingName": "建筑一",
            "version": "1.1",
            "stem": [
                "修缮设计整体评价成绩：",
                "修缮设计整体评价成绩："
            ],
            "branch": [
                [
                    "总体环境保护整治设计评价成绩：",
                    "外立面的保护设计评价成绩：",
                    "内部空间设计评价成绩：",
                    "内装修保护评价成绩：",
                    "结构加固设计评价成绩：",
                    "设备修缮更新设计评价成绩：",
                    "消防设计评价成绩：",
                    "节能设计评价成绩：",
                    "环保及白蚁防止设计评价成绩：",
                    "其他一般性评价成绩："
                ],
                [
                    "重点保护部位、重难点及保护措施：",
                    "施工准备与资源配置计划：",
                    "主要分部分项施工方案：",
                    "施工现场平面布置：",
                    "应急预案和安全文明施工等内容："
                ]
            ]
        }
    ],
    "meta": {
        "msg": "获取数据成功",
        "status": 200
    }
}
```

### 1.3.4 整体成绩评价(得分)

- 请求路径：`review/getScore`
- 请求方法：POST
- 请求参数

| 参数名     | 参数说明    |
| ---------- | ----------- |
| userId     | 用户 ID     |
| activityId | 评审活动 ID |

- 响应参数

| 参数名         | 参数说明 |
| -------------- | -------- |
| questionNumber | 问题题号 |
| score          | 平均得分 |

- 响应示例

```json
{
    "data": [
        {
            "questionNumber": 1,
            "avgScore": 1.3333
        },
        {
            "questionNumber": 2,
            "avgScore": 2.3333
        },
        {
            "questionNumber": 3,
            "avgScore": 2.6667
        },
        {
            "questionNumber": 4,
            "avgScore": 1
        },
        {
            "questionNumber": 5,
            "avgScore": 3
        },
        {
            "questionNumber": 6,
            "avgScore": 2.6667
        },
        {
            "questionNumber": 7,
            "avgScore": 3.3333
        },
        {
            "questionNumber": 8,
            "avgScore": 0
        },
        {
            "questionNumber": 9,
            "avgScore": 2.3333
        },
        {
            "questionNumber": 10,
            "avgScore": 2
        },
        {
            "questionNumber": 11,
            "avgScore": 1.3333
        },
        {
            "questionNumber": 12,
            "avgScore": 2
        },
        {
            "questionNumber": 13,
            "avgScore": 2.3333
        },
        {
            "questionNumber": 14,
            "avgScore": 3
        },
        {
            "questionNumber": 15,
            "avgScore": 2.3333
        }
    ],
    "meta": {
        "msg": "获取数据成功",
        "status": 200
    }
}
```

### 1.3.5 历史评价记录

- 请求路径：`review/record`
- 请求方法：POST
- 请求参数：

| 参数名     | 参数说明    |
| ---------- | ----------- |
| userId     | 用户 ID     |
| activityId | 评审活动 ID |

- 响应参数：

| 参数名     | 参数说明                 |
| ---------- | ------------------------ |
| name       | 评价专家名               |
| isVisible  | 是否匿名，1不匿名，0匿名 |
| unitType   | 专家所属单位             |
| reviewTime | 时间戳，精确到毫秒       |
| result     | 评价结果                 |

