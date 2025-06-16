import { SourceType, ExpandRecursively } from '.';
export declare function getAllEnumerableEntities(obj: SourceType): import(".").EnumMetaType[][];
type Item = {
    key: string;
    value: string | number;
    label: string;
};
type LabelList = Item[];
/**
 * 从列表中选择特定值的结果类型 (Result type for selecting specific values from a list)
 * @template LabelList - 标签列表类型 (Label list type)
 * @template VS - 选择的值类型 (Selected value type)
 * @template Result - 结果类型 (Result type)
 */
type PickLabelListResult<LabelList extends any[], VS extends LabelList[number]['value'][], Result extends any[] = []> = LabelList extends [infer F, ...infer Rest] ? F extends Record<'value', infer V> ? V extends VS[number] ? PickLabelListResult<Rest, VS, [...Result, F]> : PickLabelListResult<Rest, VS, Result> : Result : Result;
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
export declare function listPick<const List extends LabelList, VS extends List[number]['value'][]>(list: List, values: VS): PickLabelListResult<List, VS, []>;
/**
 * 从列表中排除特定值的结果类型 (Result type for excluding specific values from a list)
 * @template LabelList - 标签列表类型 (Label list type)
 * @template VS - 要排除的值类型 (Value type to exclude)
 * @template Result - 结果类型 (Result type)
 */
type OmitLabelListResult<LabelList extends any[], VS extends LabelList[number]['value'][], Result extends any[] = []> = LabelList extends [infer F, ...infer Rest] ? F extends Record<'value', infer V> ? V extends VS[number] ? OmitLabelListResult<Rest, VS, Result> : OmitLabelListResult<Rest, VS, [...Result, F]> : Result : Result;
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
export declare function listOmit<const List extends LabelList, VS extends List[number]['value'][]>(list: List, values: VS): OmitLabelListResult<List, VS, []>;
/**
 * 根据列表获取特定值的value和label映射 (Gets value-label mapping for specific values from a list)
 * @template LabelList - 标签列表类型 (Label list type)
 * @template VS - 选择的值类型 (Selected value type)
 * @template Result - 结果类型 (Result type)
 */
type GetValueLabelMap<LabelList extends any[], VS extends any[], PickList = PickLabelListResult<LabelList, VS>, Result extends Record<any, any> = {}> = PickList extends [infer F, ...infer Rest] ? F extends Record<'value', infer V> & Record<'label', infer L> ? V extends LabelList[number]['value'] ? L extends LabelList[number]['label'] ? GetValueLabelMap<Rest, VS, PickLabelListResult<Rest, VS>, Result & {
    [K in V]: L;
}> : Result : Result : Result : Result;
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
export declare function getValueLabelMap<const List extends LabelList, VS extends List[number]['value'][]>(list: List, values?: VS): ExpandRecursively<GetValueLabelMap<List, VS, PickLabelListResult<List, VS, []>, {}>>;
export {};
