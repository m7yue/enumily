"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEnumerableEntities = void 0;
function getAllEnumerableEntities(obj) {
    const selfEntities = [];
    const protoEntities = [];
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            selfEntities.push([key, obj[key]]);
        }
        else {
            protoEntities.push([key, obj[key]]);
        }
    }
    return [...protoEntities, ...selfEntities];
}
exports.getAllEnumerableEntities = getAllEnumerableEntities;
