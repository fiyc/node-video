/**
* @Author: fiyc
* @Date : 2018-08-07 10:26 
* @FileName : videoType-service.js
* @Description : 
    - 视频类型配置服务层
*/

let log = require('../common/Log');
let constants = require('../common/constants');
let r = require('../common/r');
let sf = require('../common/safe-function');

let cache = require('./cache-service');
let dataService = require('./data-service');

let service = {
    /**
     * 查询集合
     * @param param 查询参数
     *  -- @param pageNumber 页码
     *  -- @param pageSize 每页显示数量
     * @param id 主键
     * @param name 类型名
     * @param valId 变量ID
     */
    findAll: async function (param) {
        let defaultParam = {
            id: 0,
            name: null,
            valId: 0,
        };
        param = Object.assign(defaultParam, param);

        let cacheKey = cache.makeCacheKey(constants.CACHE_KEYFLAG.videoType_LIST,
            param.id,
            param.name,
            param.valId,
            param.pageNumber,
            param.pageSize
        );

        let cacheResult = cache.getCache(constants.CACHE_LEVELS.videoType_LIST, cacheKey);

        if (cacheResult) {
            return cacheResult;
        }

        let dataResult = await dataService.findvideoTypes(param);
        let total = await dataService.findvideoTypeCount(param);

        let resultData = {
            list: [],
            total: total
        };

        dataResult = dataResult || [];


        for (let i in dataResult) {
            let item = dataResult[i];

            resultData.list.push({
                id: item.id,
                name: item.name,
                valId: item.valId,
            });
        }

        let result = r.success('success', resultData);
        cache.pushCache(constants.CACHE_LEVELS.videoType_LIST, cacheKey, result);
        return result;
    },

    /**
     * 查询详情
     * @param id 
     */
    findDetail: async function (id) {
        id = id || 0;

        let cacheKey = cache.makeCacheKey(constants.CACHE_KEYFLAG.videoType_DETAIL, id);
        let cacheResult = cache.getCache(constants.CACHE_LEVELS.videoType_DETAIL, cacheKey);

        if (cacheResult) {
            return cacheResult;
        }

        let detailInfo = await dataService.findvideoTypes({ id });
        if (!detailInfo || detailInfo.length === 0) {
            return r.error('未查询到有效的信息');
        }

        detailInfo = detailInfo[0];
        let resultData = {
            id: detailInfo.id,
            name: detailInfo.name,
            valId: detailInfo.valId,
        };

        let result = r.success('success', resultData);
        cache.pushCache(constants.CACHE_LEVELS.videoType_DETAIL, cacheKey, result);
        return result;
    },

    /**
     * 插入
     * @param id 主键
     * @param name 类型名
     * @param valId 变量ID
     */
    insert: async function (param) {
        let defaultParam = {
            id: 0,
            name: null,
            valId: 0,
        };
        param = Object.assign(defaultParam, param);

        let result = await dataService.savevideoType(param);
        cache.clearCache(constants.CACHE_LEVELS.videoType_LIST);
        return r.success('插入成功', result.id);
    },

    /**
     * 修改
     * @param id 主键
     * @param name 类型名
     * @param valId 变量ID
     */
    update: async function (param) {
        let defaultParam = {
            id: 0,
            name: null,
            valId: 0,
        };
        param = Object.assign(defaultParam, param);

        if (!param.id) {
            return r.error('无效的修改参数');
        }

        await dataService.savevideoType(param);

        /**
        * 删除相关会受影响的缓存
        *  - 列表查询缓存
        *  - 详情查询缓存
        */
        cache.clearCache(constants.CACHE_LEVELS.videoType_LIST);
        let detailCacheKey = cache.makeCacheKey(constants.CACHE_KEYFLAG.videoType_DETAIL, param.id);
        cache.clearCache(constants.CACHE_LEVELS.videoType_DETAIL, detailCacheKey);
        return r.success('修改成功', param.id);
    },

    /**
     * 删除
     * @param id 主键
     * @param name 类型名
     * @param valId 变量ID
     */
    delete: async function (param) {
        let defaultParam = {
            id: 0,
            name: null,
            valId: 0,
        };
        param = Object.assign(defaultParam, param);

        await dataService.deletevideoType(param);

        /**
        * 删除相关会受影响的缓存
        *  - 列表查询缓存
        *  - 详情查询缓存
        */
       cache.clearCache(constants.CACHE_LEVELS.videoType_LIST);
       let detailCacheKey = cache.makeCacheKey(constants.CACHE_KEYFLAG.videoType_DETAIL, param.id);
       cache.clearCache(constants.CACHE_LEVELS.videoType_DETAIL, detailCacheKey);
       return r.success('删除成功', param.id);
    }
};


service = sf.convertSafeFn(service, function () {
    let error = arguments[arguments.length - 1];
    return r.error(error);
});
module.exports = service;