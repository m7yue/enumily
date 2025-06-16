"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValueLabelMap = exports.listOmit = exports.listPick = exports.getAllEnumerableEntities = void 0;
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
/**
 * 从列表中选择特定值的类型安全实现 (Type-safe implementation for picking specific values from a list)
 * @template VS - 选择的值类型 (Value type to pick)
 * @param values - 要选择的值数组 (Array of values to pick)
 * @returns 包含匹配项的标签列表 (Label list containing matched items)
 * @example
 * const myEnum = createEnum({ A: 1, B: 2 });
 * const list = myEnum.$toList(
 *   [[1, 'Label A'], [2, 'Label B']],
 *   { fieldNames: { key: 'id', value: 'val', label: 'desc' } }
 * );
 * console.log(listPick(list, [1])); // 输出: [{ id: 'A', val: 1, desc: 'Label A' }]
 */
function listPick(list, values) {
    return list.filter((item) => {
        const v = item['value'];
        return values.includes(v);
    });
}
exports.listPick = listPick;
/**
 * 从列表中排除特定值的类型安全实现 (Type-safe implementation for excluding specific values from a list)
 * @template VS - 要排除的值类型 (Value type to exclude)
 * @param values - 要排除的值数组 (Array of values to exclude)
 * @returns 不包含排除项的标签列表 (Label list without excluded items)
 * @example
 * const myEnum = createEnum({ A: 1, B: 2 });
 * const list = myEnum.$toList(
 *   [[1, 'Label A'], [2, 'Label B']],
 *  { fieldNames: { key: 'id', value: 'val', label: 'desc' } }
 * );
 * console.log(listOmit(list, [1])); // 输出: [{ id: 'B', val: 2, desc: 'Label B' }]
 */
function listOmit(list, values) {
    return list.filter((item) => {
        const v = item['value'];
        return !values.includes(v);
    });
}
exports.listOmit = listOmit;
/**
 * 获取值和标签的映射关系 (Get mapping between values and labels)
 * @returns 以值为key、标签为value的映射对象 (Map object with value as key and label as value)
 * @example
 * const myEnum = createEnum({ A: 1, B: 2 });
 * const list = myEnum.$toList(
 *   [[1, 'Label A'], [2, 'Label B']],
 *   { fieldNames: { key: 'id', value: 'val', label: 'desc' } }
 * );
 * console.log(getValueLabelMap(list)); // 输出: { 1: 'Label A', 2: 'Label B' }
 */
function getValueLabelMap(list, values) {
    return (values === null || values === void 0 ? void 0 : values.length) === 0
        ? Object.fromEntries(list.map((item) => [item['value'], item['label']]))
        : Object.fromEntries(list.filter((item) => {
            const v = item['value'];
            return values === null || values === void 0 ? void 0 : values.includes(v);
        }).map((item) => [item['value'], item['label']]));
}
exports.getValueLabelMap = getValueLabelMap;
