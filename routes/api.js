/**
* @Author: fiyc
* @Date : 2018-07-26 14:28
* @FileName : api.js
* @Description : 
    - 接口路由模块
*/


var express = require('express');
var router = express.Router();

let videoSourceApi = require('../controller/videoSource-controller');
let videoTypeApi = require('../controller/videoType-controller');


router.get('/video/source', videoSourceApi.source);
///////////////////////////videoSource接口/////////////////////////////
router.get('/videoSource/find', videoSourceApi.findAll);
router.get('/videoSource/detail', videoSourceApi.findDetail);
router.post('/videoSource/insert', videoSourceApi.insert);
router.put('/videoSource/update', videoSourceApi.update);
router.delete('/videoSource/delete', videoSourceApi.delete);

///////////////////////////videoType接口/////////////////////////////
router.get('/videoType/find', videoTypeApi.findAll);
router.get('/videoType/detail', videoTypeApi.findDetail);
router.post('/videoType/insert', videoTypeApi.insert);
router.put('/videoType/update', videoTypeApi.update);
router.delete('/videoType/delete', videoTypeApi.delete);


module.exports = router;