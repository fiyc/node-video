/**
* @Author: fiyc
* @Date : 2018-08-07 10:26
* @FileName : data-service.js
* @Description : 
    - 数据获取模块
*/

let sf = require('../common/safe-function');
let r = require('../common/r');
let log = require('../common/Log');
let orm = require('../modules/sqlite-module');


let dataUtil = {

    /**
     * 查询videoSource
     * @param pageNumber 页码
     * @param pageSie 每页显示数量
     * @param id 主键
     * @param name 视频名
     * @param path 视频路径
     */
    findvideoSources: function (param) {
        let defaultParam = {
            id: 0,
            name: null,
            path: null,
        };
        param = Object.assign(defaultParam, param);

        let searchParam = {
            where: {
                status: 1
            }
        };

        if (param.pageNumber > 0 && param.pageSize > 0) {
            searchParam.offset = (param.pageNumber - 1) * param.pageSize;
            searchParam.limit = param.pageSize;
        }

        if(param.id){
            searchParam.where.id = param.id;            
        }

        if(param.name){
            searchParam.where.name = param.name;            
        }

        if(param.path){
            searchParam.where.path = param.path;            
        }


        return orm.videoSource.findAll(searchParam);
    },

    /**
     * 查询videoSource总数
     * @param id 主键
     * @param name 视频名
     * @param path 视频路径
     */
    findvideoSourceCount: function(param){
        let defaultParam = {
            id: 0,
            name: null,
            path: null,
        };
        param = Object.assign(defaultParam, param);

        let searchParam = {
            where: {
                status: 1
            }
        };

        if(param.id){
            searchParam.where.id = param.id;            
        }

        if(param.name){
            searchParam.where.name = param.name;            
        }

        if(param.path){
            searchParam.where.path = param.path;            
        }


        return orm.videoSource.count(searchParam);
    },

    /**
     * 保存videoSource
     * @param id 主键
     * @param name 视频名
     * @param path 视频路径
     */
    savevideoSource: function (param) {
        let defaultParam = {
            id: 0,
            name: null,
            path: null,
            status: 1
        };
        param = Object.assign(defaultParam, param);

        if (param.id > 0) {
            return orm.videoSource.update(param, { where: { id: param.id } });
        } else {
            return orm.videoSource.create(param);
        }
    },

    /**
     * 删除videoSource
     * @param id 主键
     * @param name 视频名
     * @param path 视频路径
     */
    deletevideoSource: function (param) {
        let deleteParam = {
            status: 0
        };

        let defaultParam = {
            id: 0,
            name: null,
            path: null,
        };
        param = Object.assign(defaultParam, param);

        let deleteFilter = {
            where: {
                status: 1
            }
        };

        if(param.id){
            deleteFilter.where.id = param.id;            
        }

        if(param.name){
            deleteFilter.where.name = param.name;            
        }

        if(param.path){
            deleteFilter.where.path = param.path;            
        }


        // return orm.videoSource.update(deleteParam, deleteFilter);
        return orm.videoSource.destroy(deleteFilter);
    },

    /**
     * 查询videoType
     * @param pageNumber 页码
     * @param pageSie 每页显示数量
     * @param id 主键
     * @param name 类型名
     * @param valId 变量ID
     */
    findvideoTypes: function (param) {
        let defaultParam = {
            id: 0,
            name: null,
            valId: 0,
        };
        param = Object.assign(defaultParam, param);

        let searchParam = {
            where: {
                status: 1
            }
        };

        if (param.pageNumber > 0 && param.pageSize > 0) {
            searchParam.offset = (param.pageNumber - 1) * param.pageSize;
            searchParam.limit = param.pageSize;
        }

        if(param.id){
            searchParam.where.id = param.id;            
        }

        if(param.name){
            searchParam.where.name = param.name;            
        }

        if(param.valId){
            searchParam.where.valId = param.valId;            
        }


        return orm.videoType.findAll(searchParam);
    },

    /**
     * 查询videoType总数
     * @param id 主键
     * @param name 类型名
     * @param valId 变量ID
     */
    findvideoTypeCount: function(param){
        let defaultParam = {
            id: 0,
            name: null,
            valId: 0,
        };
        param = Object.assign(defaultParam, param);

        let searchParam = {
            where: {
                status: 1
            }
        };

        if(param.id){
            searchParam.where.id = param.id;            
        }

        if(param.name){
            searchParam.where.name = param.name;            
        }

        if(param.valId){
            searchParam.where.valId = param.valId;            
        }


        return orm.videoType.count(searchParam);
    },

    /**
     * 保存videoType
     * @param id 主键
     * @param name 类型名
     * @param valId 变量ID
     */
    savevideoType: function (param) {
        let defaultParam = {
            id: 0,
            name: null,
            valId: 0,
            status: 1
        };
        param = Object.assign(defaultParam, param);

        if (param.id > 0) {
            return orm.videoType.update(param, { where: { id: param.id } });
        } else {
            return orm.videoType.create(param);
        }
    },

    /**
     * 删除videoType
     * @param id 主键
     * @param name 类型名
     * @param valId 变量ID
     */
    deletevideoType: function (param) {
        let deleteParam = {
            status: 0
        };

        let defaultParam = {
            id: 0,
            name: null,
            valId: 0,
        };
        param = Object.assign(defaultParam, param);

        let deleteFilter = {
            where: {
                status: 1
            }
        };

        if(param.id){
            deleteFilter.where.id = param.id;            
        }

        if(param.name){
            deleteFilter.where.name = param.name;            
        }

        if(param.valId){
            deleteFilter.where.valId = param.valId;            
        }


        return orm.videoType.update(deleteParam, deleteFilter);
    },

}



dataUtil = sf.convertSafeFn(dataUtil);
module.exports = dataUtil;