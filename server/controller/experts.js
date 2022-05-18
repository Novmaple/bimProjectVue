const { exec } = require('../db/mysql')

const getComposition = () => {
    const sql = `
    select unit.unitType,count(*) count 
    from experts, unit 
    where experts.unitId = unit.id group by unit.unitType order by count asc;
    `
    // exec 函数返回 promise 对象
    return exec(sql).then(rows => {
        let result = [["", "", ""], [0, 0, 0]]
        for (let i = 0; i < rows.length; i++) {
            result[0][i] = rows[i].unitType
            result[1][i] = rows[i].count
        }
        for (let j = 0; j < result[0].length; j++) {
            if (result[0][j] === "建设单位") {
                result[0][j] = "建设单位成员"
            } else if (result[0][j] === "学校") {
                result[0][j] = "专家组成员"
            } else if (result[0][j] === "设计单位") {
                result[0][j] = "设计单位成员"
            }
        }
        // console.log(result)
        return result || {}
    })
}

const getStar = () => {
    const sql = `
    select star name, count(*) value from experts group by star order by name desc;
    `
    return exec(sql).then(rows => {
        return rows || {}
    })
}

module.exports = {
    getComposition,
    getStar
}