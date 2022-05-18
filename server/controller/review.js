const { exec } = require('../db/mysql')

const getQuestion = (userId) => {
    const sql = `
    select users.id userId, review_activities.Id activitiesId, review_activities.createTime,
    design.buildingName, design.version,
    review_template.stem, review_template.branch
    from users, review_activities, review_template, 
    design
    where users.id = review_activities.usersId
    and review_activities.reviewTemplateId = review_template.id
    and review_activities.designId = design.id
    and users.id = '${userId}'
    order by review_activities.createTime desc;
    `
    return exec(sql).then(rows => {
        rows.forEach(element => {
            element.stem = element.stem.split(";")
            element.branch = element.branch.split(";")
            for (let i = 0; i < element.branch.length; i++) {
                element.branch[i] = element.branch[i].split(",")
            }
        });
        return rows || {}
    })
}

const getScore = (userId, activityId) => {
    const sql = `
    select questionNumber, round(avg(score), 2) avgScore
    from review_activities, review_score
    where review_activities.id = review_score.activityId
    and review_activities.id = '${activityId}'
    and review_activities.usersId = '${userId}'
    group by questionNumber;
    `
    return exec(sql).then(rows => {
        return rows || {}
    })
}

const getRecord = (userId, activityId) => {
    const sql = `
    select experts.name,
    review_list.isVisible, unit.unitType, 
    review_list.reviewTime, review_list.result
    from experts, unit, review_list, users, review_activities
    where experts.unitId = unit.id
    and review_list.expertId = experts.id
    and review_activities.usersId = users.id
    and review_activities.id = review_list.reviewActivityId
    and users.id = '${userId}'
    and review_list.reviewActivityId = '${activityId}'
    order by reviewTime desc;
    `
    return exec(sql).then(rows => {
        for( let item of rows) {
            if(item.isVisible === 1) {
                item.name = "匿名"
            }
            if(item.unitType === "学校"){
                item.unitType = "专家组"
            }
            var date = new Date(parseInt(item.reviewTime)).Format("yyyy-MM-dd HH:mm:ss")
            item.reviewTime = date
        }
        return rows || {}
    })
}

const getRecordCount = (userId, activityId) => {
    const sql = `
    select count(distinct expertId) count
    from review_score, review_activities
    where review_activities.id = review_score.activityId 
    and activityId = '${activityId}'
    and usersId = '${userId}';
    `
    return exec(sql).then(rows => {
        return rows || {}
    })
}

module.exports = {
    getQuestion,
    getScore,
    getRecord,
    getRecordCount
}

// 时间戳转换函数
Date.prototype.Format = function(fmt) { //author: meizz    
    if (this == "Invalid Date") { 
        return ""; 
    } 
    var o = { 
        "M+" : this.getMonth() + 1, //月份    
        "d+" : this.getDate(), //日    
        "H+" : this.getHours(), //小时    
        "m+" : this.getMinutes(), //分    
        "s+" : this.getSeconds(), //秒    
        "q+" : Math.floor((this.getMonth() + 3) / 3), //季度    
        "S" : this.getMilliseconds() 
    //毫秒    
    }; 
    if (/(y+)/.test(fmt)) 
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "") 
                .substr(4 - RegExp.$1.length)); 
    for ( var k in o) 
        if (new RegExp("(" + k + ")").test(fmt)) 
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) 
                    : (("00" + o[k]).substr(("" + o[k]).length))); 
    return fmt; 
}