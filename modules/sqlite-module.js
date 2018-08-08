/**
* @Author: fiyc
* @Date : 2018-08-07 10:26
* @FileName : sqlite-module.js
* @Description : 
    - sqlite数据库模块
*/

const config = require('../config');
let log = require('../common/Log');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.dbName, '', '', {
    host: 'localhost',
    dialect: 'sqlite',
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },

    storage: config.dbFilePath
});

/**
 * 视频信息
 */
const videoSource = sequelize.define('video_source', {

    /**
     * 主键
     */
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },

    /**
     * 视频名
     */
    name: {
        type: Sequelize.TEXT,
        primaryKey: false,
        autoIncrement: false
    },

    /**
     * 视频路径
     */
    path: {
        type: Sequelize.TEXT,
        primaryKey: false,
        autoIncrement: false
    },


    /**
     * 状态-  无效: 0  有效: 1
     */
    status: {
        type: Sequelize.INTEGER
    }

});
videoSource.sync();

/**
 * 视频类型
 */
const videoType = sequelize.define('video_type', {

    /**
     * 主键
     */
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true
    },

    /**
     * 类型名
     */
    name: {
        type: Sequelize.TEXT,
        primaryKey: false,
        autoIncrement: false
    },

    /**
     * 变量ID
     */
    valId: {
        type: Sequelize.BIGINT,
        primaryKey: false,
        autoIncrement: false
    },


    /**
     * 状态-  无效: 0  有效: 1
     */
    status: {
        type: Sequelize.INTEGER
    }

});
videoType.sync();




module.exports = {
    videoSource,
    videoType,
}