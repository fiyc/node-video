/**
* @Author: fiyc
* @Date : 2018-07-26 09:44
* @FileName : r.js
* @Description : 
    - 对接口返回结果封装模块
    - error
    - success
    - data
*/



/**
 * 返回结果封装
 */
let makeResponse = function(isSuccess, msg, data){
    return {
        success: isSuccess,
        message: msg,
        data: data
    }
}

module.exports = {
    /**
     * 返回成功信息
     */
    success : function(msg, data){
        if(data === undefined || data === null){
            data = {};
        }
        return makeResponse(true, msg, data);
    },

    /**
     * 返回错误信息
     */
    error: function(msg){
        return makeResponse(false, msg, {});
    }
}