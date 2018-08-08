/**
* @Author: fiyc
* @Date : 2018-07-24 15:12
* @FileName : Log.js
* @Description : 
    - 日志记录封装
*/



/**
 * 添加全局日期格式化
 */
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

let logFileLevel = 0;

const Level = {
    NONE: 0,
    DEBUG: 1,
    INFO: 2,
    ERROR: 3
}

var logInFile = function(msg, type){

}

var info = function(msg){
    msg = msg || '';
    const level = Level.INFO;
    let time = new Date().Format('yyyy-MM-dd hh:mm:ss');

    console.log(`${time}   ${msg}\r\n`);
    if(logFileLevel >= level){
        logInFile(msg, level);
    }
}

var debug = function(msg){
    msg = msg || '';
    const level = Level.DEBUG;
    let time = new Date().Format('yyyy-MM-dd hh:mm:ss');

    console.debug(`${time}   ${msg}\r\n`);
    if(logFileLevel >= level){
        logInFile(msg, level);
    }
}

var error = function(msg){
    msg = msg || '';
    const level = Level.ERROR;
    let time = new Date().Format('yyyy-MM-dd hh:mm:ss');

    console.error(`${time}   ${msg}\r\n`);
    if(logFileLevel >= level){
        logInFile(msg, level);
    }
}


module.exports = {
    setLevel : function(level){
        level = Number(level);
        if(!level || level < 0){
            level = 0;
        }

        if(level > 3){
            level = 3;
        }

        Level = level;
    },

    debug: debug,
    info: info,
    error: error
};
