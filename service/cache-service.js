/**
* @Author: fiyc
* @Date : 2018-07-26 17:04
* @FileName : cache-service.js
* @Description : 
    - 缓存模块
*/

let globalCachePool = {};

/**
 * 生成缓存key
 */
let makeCacheKey = function(){
    let key = '';
    if(arguments.length === 0){
        key = 'default';
        return key;
    }

    for(let index in arguments){
        key = `${key}_${arguments[index]}`;
    }

    return key;
}

/**
 * 推入缓存
 * @param levels 缓存层级说明, 一个一维字符串数组
 * @param key 缓存key
 * @param object 缓存内容
 */
let pushCache = function(levels, key, object){
    if(!key){
        return;
    }

    let currentCache = globalCachePool;
    for(let index in levels){
        let level = levels[index];

        if(!currentCache[level]){
            currentCache[level] = {};
        }

        currentCache = currentCache[level];
    }

    currentCache[key] = object;
}

/**
 * 缓存清除函数
 * - 如果levels为null, key为null 则清空所有缓存
 * - 如果levels为null, key不为null, 则删除根节点指定key的缓存
 * - 如果levels不为null, key为null, 则删除指定层级的所有缓存
 * - 如果levels不为null, key不为null, 则删除指定层级指定key的缓存
 * @param {*} levels 缓存层级说明, 一个一维字符串数组
 * @param {*} key 缓存key
 */
let clearCache = function(levels, key){
    if(levels && levels.length === 0){
        levels = null;
    }

    if(!levels && !key){
        globalCachePool = {};
        return;
    }

    if(!levels && key){
        if(globalCachePool[key]){
            globalCachePool[key] = null;
        }

        return;
    }

    

    let targetCache = globalCachePool;
    for(let index = 0; index < levels.length -1; index++){
        let level = levels[index];
        if(!targetCache[level]){
            return;
        }

        targetCache = targetCache[level];
    }

    let finalLevel = levels[levels.length - 1];
    if(!targetCache[finalLevel]){
        return;
    }

    if(!key || key === ''){
        targetCache[finalLevel] = {};
        return;
    }

    targetCache[finalLevel][key] = null;
}

/**
 * 获取缓存内容
 * @param {*} levels 
 * @param {*} key 
 */
let getCache = function(levels, key){
    if(!levels){
        return globalCachePool[key];
    }

    let targetCache = globalCachePool;
    for(let index in levels){
        let level = levels[index];
        targetCache = targetCache[level]

        if(!targetCache){
            return;
        }
    }

    let json = JSON.stringify(targetCache[key]);
    if(!json){
        return;
    }
    
    return JSON.parse(json);
}


module.exports = {
    makeCacheKey,
    pushCache,
    clearCache,
    getCache
};
