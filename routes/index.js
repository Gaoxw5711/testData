var express = require('express');
var router = express.Router();
// var db = require('../models/db');
var dbplus = require('../models/dbplus');
// var mssql = require('mssql');
// var bodyParser = require('body-parser');
// var moment = require('moment');
var momentZone = require('moment-timezone');

momentZone.tz.setDefault("Asia/Shanghai");

/* GET home page. */
router.get('/project/list', function(req, res, next) {
	var pageNum = req.query.pageNum;
	var pageSize = req.query.pageSize;
	// console.log(pageSize);
	dbplus.selectPage('projects', pageNum, pageSize, "", "", function(err, result) {
		//查询所有project表的数据
		// res.render('newsList', {results:result.recordset, moment:moment});
		// console.log(result.total);
		return res.send(result.recordset);
	});
});

// 新建项目
router.post('/project/addProject', function(req, res, next) {
	var params = req.body;
	var datetime = params.datetime;
	datetimeZ = momentZone.tz(datetime, "Asia/Shanghai").format();
	// console.log(datetime);
	params.datetime = datetimeZ.replace("+08:00", ".000Z");
	// console.log(params.datetime);
	dbplus.add(params, 'projects', function(err, result) {
		return res.send(result.recordset);
	});
});

// 更新项目
router.post('/project/updateProject', function(req, res, next) {
	var params = req.body;
	var id = req.body.id;
	delete(params["id"]);
	console.log(params);
	dbplus.update(params, {id:id}, 'projects', function(err, result) {
		return res.send(result.recordset);
	});
});

// 删除项目
router.get('/project/delProject', function (req, res, next) {
	var id = req.query.id;
	dbplus.del("where id = @id", {id:id}, "projects", function(err, result){
	    return res.send(result.recordset);
	});
});

// 获取测试任务
router.get('/testTask/list', function(req, res, next) {
	var pageNum = req.query.pageNum;
	var pageSize = req.query.pageSize;
	var projectName = req.query.projectName;
	console.log(pageSize);
	dbplus.selectPage('testtask', pageNum, pageSize, "where projectName = @projectName", {projectName: projectName}, function(err, result) {
		//查询所有project表的数据
		// res.render('newsList', {results:result.recordset, moment:moment});
		return res.send(result.recordset);
	});
});

// 新建测试任务
router.post('/testTask/addTask', function(req, res, next) {
	var params = req.body;
	dbplus.add(params, 'testtask', function(err, result) {
		return res.send(result.recordset);
	});
});
// 更新测试任务

// 删除测试任务
router.get('/testTask/delTask', function (req, res, next) {
	var id = req.query.id;
	dbplus.del("where id = @id", {id:id}, "testtask", function(err, result){
	    return res.send(result.recordset);
	});
});

module.exports = router;