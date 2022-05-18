use mybimproject;
select username, `name` from users;
select * from users;
select * from experts;
select * from unit;
select experts.id, unit.id from experts, unit;

select experts.id, experts.`name`, unit.id, unit.`name`, unit.unitType
from experts, unit
where experts.unitId = unit.id;

select unit.unitType,count(*) count from experts, unit where experts.unitId = unit.id group by unit.unitType order by count asc;

select star name, count(*) value from experts group by star order by name desc;

select * from review_list;

select users.id userId, review_activities.Id activitiesId, review_activities.createTime,
design.buildingName, design.version,
review_template.stem, review_template.branch
from users, review_activities, review_template, 
design
where users.id = review_activities.usersId
and review_activities.reviewTemplateId = review_template.id
and review_activities.designId = design.id
and users.id = 1
order by review_activities.createTime desc;

-- branch平均分数
select questionNumber, round(avg(score), 2) avgScore
from review_activities, review_score
where review_activities.id = review_score.activityId
and review_activities.id = 5
and review_activities.usersId = 1
group by questionNumber;

select * from buildings;
select * from design;
select * from design_file;
select * from experts;
select * from review_activities;
select * from review_list;
select * from review_score;
select * from review_template;
select * from unit;
select * from users;

-- 总评价人数
select count(distinct expertId) count
from review_score, review_activities
where review_activities.id = review_score.activityId 
and activityId = 8
and usersId = 1;

-- 历史记录
select  experts.`name`, 
review_list.isVisible, unit.unitType, 
review_list.reviewTime, review_list.result
from experts, unit, review_list, users, review_activities
where experts.unitId = unit.id
and review_list.expertId = experts.id
and review_activities.usersId = users.id
and review_activities.id = review_list.reviewActivityId
and users.id = 1
and review_list.reviewActivityId = 1
order by reviewTime desc;

