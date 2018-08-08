/**
* @Author: fiyc
* @Date : 2018-08-07 10:26
* @FileName : constants.js
* @Description : 
    - 常量模块
*/

const constants = {
    /**
     * 缓存层级
     */
    CACHE_LEVELS: {
        videoSource_LIST: ['videoSource', 'LSIT'],

        videoSource_DETAIL: ['videoSource'],

        videoType_LIST: ['videoType', 'LSIT'],

        videoType_DETAIL: ['videoType'],

    },

    /**
     * 缓存key前缀
     */
    CACHE_KEYFLAG: {
        videoSource_LIST: 'videoSource_LIST',

        videoSource_DETAIL: 'videoSource_DETAIL',

        videoType_LIST: 'videoType_LIST',

        videoType_DETAIL: 'videoType_DETAIL',

    },

    REGULAR: {
        IP: /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/
    }
};

module.exports = constants;