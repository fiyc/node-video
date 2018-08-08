/**
* @Author: fiyc
* @Date : 2018-08-01 16:48
* @FileName : variable-controller.js
* @Description : 
    - 变量配置接口
*/

let fs = require('fs');
let base = require('./base');
let r = base.r;
let errorHandle = base.errorCallback;
let sf = require('../common/safe-function');

let constants = require('../common/constants');
let service = require('../service/videoSource-service');

let apis = {
    /**
     * 查询集合
     * @param pageNumber
     * @param pageSize
     */
    findAll: async function (req, res, next) {
        let pageNumber = Number(req.query.pageNumber);
        let pageSize = Number(req.query.pageSize);

        let result = await service.findAll({ pageNumber, pageSize });
        r(req, res).common(result);
    },

    /**
     * 查询详情
     * @param id MQ id
     */
    findDetail: async function (req, res, next) {
        let id = Number(req.query.id);
        if (!id) {
            r(req, res).error(res.__('invalid_variable_id'));
            return;
        }

        let result = await service.findDetail(id);
        r(req, res).common(result);
    },

    /**
     * 插入
     * @param id 主键
     * @param name 视频名
     * @param path 视频路径
     */
    insert: async function (req, res, next) {
        let id = req.body.id;
        let name = req.body.name;
        let path = req.body.path;

        let result = await service.insert({
            id,
            name,
            path,
        });
        r(req, res).common(result);
    },

    /**
     * 修改
     * @param id 主键
     * @param name 视频名
     * @param path 视频路径
     */
    update: async function (req, res, next) {
        let id = req.body.id;
        let name = req.body.name;
        let path = req.body.path;

        let result = await service.update({
            id,
            name,
            path,
        });
        r(req, res).common(result);
    },

    /**
     * 删除
     * @param id
     */
    delete: async function (req, res, next) {
        let id = Number(req.body.id);
        if (!id) {
            r(req, res).error(res.__('invalid_variable_id'));
            return;
        }

        let result = await service.delete({id});
        r(req, res).common(result);
    },

    /**
     * 视频播放
     */
    source: async function(req, res, next){
        let id = req.query.id || 0;

        let mediaInfo = await service.findDetail(id);
        if(!mediaInfo || !mediaInfo.success || !mediaInfo.data || !mediaInfo.data.id){
            r(req, res).error('请求的视频资源不存在');
            return;
        }

        res.writeHead(200, {'Content-Type': 'video/mp4'});
        let rs = fs.createReadStream(mediaInfo.data.path);
        rs.pipe(res);

        res.on('end', function(){
            res.end();
            console.log('end call');
        });
    }
};


//为接口进行装饰
apis = sf.convertSafeFn(apis, errorHandle);
module.exports = apis;