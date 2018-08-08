/**
* @Author: fiyc
* @Date : 2018-08-07 10:26 
* @FileName : videoSource-service.js
* @Description : 
    - 视频信息配置服务层
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
     * @param name 视频名
     * @param path 视频路径
     */
    findAll: async function (param) {
        let defaultParam = {
            id: 0,
            name: null,
            path: null,
        };
        param = Object.assign(defaultParam, param);

        let cacheKey = cache.makeCacheKey(constants.CACHE_KEYFLAG.videoSource_LIST,
            param.id,
            param.name,
            param.path,
            param.pageNumber,
            param.pageSize
        );

        let cacheResult = cache.getCache(constants.CACHE_LEVELS.videoSource_LIST, cacheKey);

        if (cacheResult) {
            return cacheResult;
        }

        let dataResult = await dataService.findvideoSources(param);
        let total = await dataService.findvideoSourceCount(param);

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
                path: item.path,
            });
        }

        let result = r.success('success', resultData);
        cache.pushCache(constants.CACHE_LEVELS.videoSource_LIST, cacheKey, result);
        return result;
    },

    /**
     * 查询详情
     * @param id 
     */
    findDetail: async function (id) {
        id = id || 0;

        let cacheKey = cache.makeCacheKey(constants.CACHE_KEYFLAG.videoSource_DETAIL, id);
        let cacheResult = cache.getCache(constants.CACHE_LEVELS.videoSource_DETAIL, cacheKey);

        if (cacheResult) {
            return cacheResult;
        }

        let detailInfo = await dataService.findvideoSources({ id });
        if (!detailInfo || detailInfo.length === 0) {
            return r.error('未查询到有效的信息');
        }

        detailInfo = detailInfo[0];
        let resultData = {
            id: detailInfo.id,
            name: detailInfo.name,
            path: detailInfo.path,
        };

        let result = r.success('success', resultData);
        cache.pushCache(constants.CACHE_LEVELS.videoSource_DETAIL, cacheKey, result);
        return result;
    },

    /**
     * 插入
     * @param id 主键
     * @param name 视频名
     * @param path 视频路径
     */
    insert: async function (param) {
        let defaultParam = {
            id: 0,
            name: null,
            path: null,
        };
        param = Object.assign(defaultParam, param);

        let result = await dataService.savevideoSource(param);
        cache.clearCache(constants.CACHE_LEVELS.videoSource_LIST);
        return r.success('插入成功', result.id);
    },

    /**
     * 修改
     * @param id 主键
     * @param name 视频名
     * @param path 视频路径
     */
    update: async function (param) {
        let defaultParam = {
            id: 0,
            name: null,
            path: null,
        };
        param = Object.assign(defaultParam, param);

        if (!param.id) {
            return r.error('无效的修改参数');
        }

        await dataService.savevideoSource(param);

        /**
        * 删除相关会受影响的缓存
        *  - 列表查询缓存
        *  - 详情查询缓存
        */
        cache.clearCache(constants.CACHE_LEVELS.videoSource_LIST);
        let detailCacheKey = cache.makeCacheKey(constants.CACHE_KEYFLAG.videoSource_DETAIL, param.id);
        cache.clearCache(constants.CACHE_LEVELS.videoSource_DETAIL, detailCacheKey);
        return r.success('修改成功', param.id);
    },

    /**
     * 删除
     * @param id 主键
     * @param name 视频名
     * @param path 视频路径
     */
    delete: async function (param) {
        let defaultParam = {
            id: 0,
            name: null,
            path: null,
        };
        param = Object.assign(defaultParam, param);

        await dataService.deletevideoSource(param);

        /**
        * 删除相关会受影响的缓存
        *  - 列表查询缓存
        *  - 详情查询缓存
        */
       cache.clearCache(constants.CACHE_LEVELS.videoSource_LIST);
       let detailCacheKey = cache.makeCacheKey(constants.CACHE_KEYFLAG.videoSource_DETAIL, param.id);
       cache.clearCache(constants.CACHE_LEVELS.videoSource_DETAIL, detailCacheKey);
       return r.success('删除成功', param.id);
    }
};


service = sf.convertSafeFn(service, function () {
    let error = arguments[arguments.length - 1];
    return r.error(error);
});
module.exports = service;