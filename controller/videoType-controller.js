/**
* @Author: fiyc
* @Date : 2018-08-01 16:48
* @FileName : variable-controller.js
* @Description : 
    - 变量配置接口
*/

let base = require('./base');
let r = base.r;
let errorHandle = base.errorCallback;
let sf = require('../common/safe-function');

let constants = require('../common/constants');
let service = require('../service/videoType-service');

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
     * @param name 类型名
     * @param valId 变量ID
     */
    insert: async function (req, res, next) {
        let id = req.body.id;
        let name = req.body.name;
        let valId = req.body.valId;

        let result = await service.insert({
            id,
            name,
            valId,
        });
        r(req, res).common(result);
    },

    /**
     * 修改
     * @param id 主键
     * @param name 类型名
     * @param valId 变量ID
     */
    update: async function (req, res, next) {
        let id = req.body.id;
        let name = req.body.name;
        let valId = req.body.valId;

        let result = await service.update({
            id,
            name,
            valId,
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
    }
};


//为接口进行装饰
apis = sf.convertSafeFn(apis, errorHandle);
module.exports = apis;