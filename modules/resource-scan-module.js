/**
* @Author: fiyc
* @Date : 2018-08-07 10:35
* @FileName : resource-scan-module.js
* @Description : 
    - 视频扫描模块
    - 固定时间扫描
*/
const fs = require('fs');
const path = require('path');

const global = require('../config');
const sourceService = require('../service/videoSource-service');



/**
 * 获取目标路径下的所有文件
 * @param {*} rootPath 
 */
let getAllMedias = function (rootPath) {
    let result = [];
    if (!fs.existsSync(rootPath)) {
        return result;
    }

    let currentList = fs.readdirSync(rootPath);
    currentList.forEach(f => {
        let itemPath = path.join(rootPath, f);
        let state = fs.statSync(itemPath);

        if (state.isDirectory()) {
            let childFiles = getAllMedias(itemPath);
            result = result.concat(childFiles);
            return;
        }

        for (let i = 0; i < global.mediaTypes.length; i++) {
            if (itemPath.endsWith(global.mediaTypes[i])) {
                result.push({
                    path: itemPath,
                    name: f
                });

                break;
            }
        }
    });

    return result;
}

let scan = async function () {
    let allFiles = getAllMedias(global.sourcePath);

    let keys = [];
    allFiles.forEach(f => {
        keys.push(f.path);
    });

    let allDBFiles = await sourceService.findAll();
    if (allDBFiles && allDBFiles.success && allDBFiles.data) {
        for (let i in allDBFiles.data.list) {
            let id = allDBFiles.data.list[i].id;
            let itemPath = allDBFiles.data.list[i].path;
            if (!keys.includes(itemPath)) {
                await sourceService.delete({ id });
            }
        }
    }


    allFiles.forEach(async f => {
        let findResult = await sourceService.findAll({
            name: f.name,
            path: f.path
        });

        if (findResult && findResult.success && findResult.data.total > 0) {
            return;
        }

        sourceService.insert({
            name: f.name,
            path: f.path
        });
    });
}

/**
 * 循环扫描
 */
let scanLoop = async function () {
    await scan();

    setTimeout(scanLoop, global.sourceScanInterval);
}

scanLoop();


module.exports = scan;





