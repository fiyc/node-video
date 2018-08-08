/**
* @Author: fiyc
* @Date : 2018-07-24 14:50
* @FileName : config.js
* @Description : 
    - 项目配置文件
    - 由于json文件不好加注释, 所以使用单独一个模块来作为配置
*/


var path = require('path');

var globalConfig = {
    /**
     * sqlite数据库名
     */
    dbName: 'default.db',

    /**
     * 数据库文件路径
     */
    dbFilePath: path.join(__dirname, 'default.db'),

    /**
     * 视频资源存储根目录
     */
    sourcePath: 'C:\\Users\\fiyc\\Documents\\videos',

    /**
     * 会识别的媒体格式
     */
    mediaTypes: ['mp4'],

    /**
     * 更新扫描频率 ms
     */
    sourceScanInterval:  10000
};

module.exports = globalConfig;