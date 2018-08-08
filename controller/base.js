/**
* @Author: fiyc
* @Date : 2018-07-26 10:29
* @FileName : base.js
* @Description : 
    - controller使用公共模块
*/


let r = require('../common/r');


/**
 * 返回结果, 包含对跨域的支持
 * @param {*} req 
 * @param {*} res 
 * @param {*} data  
 */
let send = function (req, res, data) {
    if (req.query.callback) {
        res.jsonp(data);
    } else {
        res.json(data);
    }
}

/**
 * 统一返回器构造
 */

 let init = function(req, res){
    /**
     * 返回错误信息
     * @param {*} msg 
     */
    let error = function(msg){
        let data = r.error(msg);
        send(req, res, data);        
    }

    /**
     * 返回成功信息
     * @param {*} msg 
     * @param {*} data 
     */
    let success = function(msg, data){
        let resData = r.success(msg, data);
        send(req, res, resData);
    }

    /**
     * 直接发送返回内容
     * @param {*} response 
     */
    let common = function(response){
        send(req, res, response);
    }

    return {
        error,
        success,
        common
    };
}

/**
 * controller 中对于异常情况下的统一处理
 * @param {*} req 
 * @param {*} res 
 * @param {*} data 
 */
let errorCallback = function(req, res, next){
    init(req, res).error("系统异常");
}

module.exports = {
    r: init,
    errorCallback
}


