/**
 * 表示枚举的元数据类型 (Enum metadata type)
 * 可以是数字或字符串 (Can be number | string primitive type)
 *
 * @type {number | string} 基础数据类型 (Primitive data type)
 */
export type EnumMetaType = number | string;
/**
 * 表示枚举的源类型 (Enum source type)
 * 定义为键值对的记录，用于编译时类型推导和运行时对象映射 (Defined as key-value record for compile-time type inference and runtime object mapping)
 * @typedef {Record<string | number, string | number>} 枚举底层数据类型 (Enum underlying data type)
 */
export type SourceType = Record<EnumMetaType, EnumMetaType>;
/**
 * 创建数值枚举的双向映射对象 (Create bidirectional mapping for numeric enums)
 * @template T - 必须为数值型枚举类型对象 (Must be numeric enum type object)
 */
export type InvertedType<T extends SourceType> = {
    [P in keyof T as T[P] extends number ? T[P] : never]: P;
};
/**
 * 递归展开类型，用于解析嵌套结构 (Recursively unwrap types to parse nested structures)
 * @template T - 要展开的类型 (Type to be unwrapped)
 */
export type ExpandRecursively<T> = T extends [infer F, ...infer Rest] ? [ExpandRecursively<F>, ...ExpandRecursively<Rest>] : T extends (...args: any[]) => any ? T : T extends Record<string, any> ? {
    [K in keyof T]: ExpandRecursively<T[K]>;
} : T;
/**
 * 严格检查两个类型是否完全相等 (Check if two types are strictly equal)
 * @template X - 第一个类型 (First type parameter)
 * @template Y - 第二个类型 (Second type parameter)
 */
export type IsEqual<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;
/**
 * 将联合类型转换为交叉类型 (Convert union type to intersection type)
 * @template U - 联合类型 (Union type to be converted)
 */
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
/**
 * 从联合类型中提取最后一个类型 (Extracts the last type from a union type)
 * @template U - 联合类型 (Union type to process)
 */
export type LastInUnion<U extends any> = UnionToIntersection<U extends U ? (x: U) => 0 : never> extends (x: infer L) => 0 ? L : never;
/**
 * 将联合类型转换为元组类型 (Convert union type to tuple type)
 * @template U - 联合类型 (Union type to be converted)
 * @template Last - 联合类型中的最后一个类型 (Last type in the union)
 */
export type UnionToTuple<U extends any, Last = LastInUnion<U>> = [U] extends [never] ? [] : [...UnionToTuple<Exclude<U, Last>>, Last];
/**
 * 将枚举的键值对转换为带有自定义字段名称的对象列表 (Convert enum key-value pairs to an object list with custom field names)
 * @template Source - 枚举的源类型 (Source enum type)
 * @template LabelEntities - 表示值和标签对的元组数组 (Tuple array of value-label pairs)
 * @template Option - 自定义字段名称的选项类型 (Options for custom field names)
 * @template Res - 结果列表的类型 (Result list type)
 * @template KeyField - 自定义键字段名称 (Custom key field name)
 * @template ValueField - 自定义值字段名称 (Custom value field name)
 * @template LabelField - 自定义标签字段名称 (Custom label field name)
 * @template Key - 源的键类型 (Source key type)
 */
type ToLabelList<Source extends SourceType, LabelEntities extends [Source[keyof Source], string][], Option extends ToListOptions = DefaultListOptions, Res extends any[] = [], KeyField extends string = Option['fieldNames']['key'], ValueField extends string = Option['fieldNames']['value'], LabelField extends string = Option['fieldNames']['label'], Key extends keyof Source = keyof Source> = LabelEntities extends [infer F, ...infer Rest] ? F extends [infer V, infer L] ? V extends Source[Key] ? Rest extends [any, string][] ? ToLabelList<Source, Rest, Option, [
    ...Res,
    {
        [P in KeyField | ValueField | LabelField]: P extends KeyField ? Key extends Key ? IsEqual<V, Source[Key]> extends true ? Key : never : never : P extends ValueField ? V : P extends LabelField ? L : never;
    }
]> : Res : Res : Res : Res;
/**
 * 配置枚举的选项类型 (Options for configuring enum properties)
 */
export type EnumOptions = {
    /**
     * 是否启用反向映射 (Whether to enable reverse mapping)
     * @default false
     */
    inverted?: boolean;
};
/**
 * 枚举的默认选项 (Default options for enumeration)
 */
export type DefaultEnumOptions = {
    inverted: false;
};
/**
 * 将枚举转换为列表的选项 (Options for converting enum to optionList)
 */
export type ToListOptions = {
    fieldNames: {
        key: string;
        value: string;
        label: string;
    };
};
/**
 * 将枚举转换为列表的默认选项 (Default options for converting enum to list)
 */
export type DefaultListOptions = {
    fieldNames: {
        key: 'key';
        value: 'value';
        label: 'label';
    };
};
/**
 * 枚举中需要排除的键 (Keys to exclude from enumeration)
 */
type ExcludeKeys = '$getKeys' | '$getValues' | '$length' | '$getValue' | '$getKey' | '$toList' | '$extend' | "$inverted";
/**
 * 表示纯枚举类型 (Represents pure enum type)
 * @template E - 基础枚举类型 (Base enum type)
 */
export type EnumType<E extends BaseResult> = Omit<E, ExcludeKeys>;
/**
 * 提取枚举的键类型 (Extracts the key type of an enum)
 * @template E - 基础枚举类型(Base enum type)
 */
export type EnumKey<E extends BaseResult> = Exclude<keyof E, ExcludeKeys>;
/**
 * 提取枚举的值类型 (Extracts the value type of an enum)
 * @template E - 基础枚举类型 (Base enum type)
 */
export type EnumValue<E extends BaseResult> = E[EnumKey<E>];
/**
 * 从列表中选择特定值的结果类型 (Result type for selecting specific values from a list)
 * @template LabelList - 标签列表类型 (Label list type)
 * @template Options - 列表选项类型 (List options type)
 * @template VS - 选择的值类型 (Selected value type)
 * @template Result - 结果类型 (Result type)
 */
type PickLabelListResult<LabelList extends any[], Options extends ToListOptions, VS extends LabelList[number][Options['fieldNames']['value']][], Result extends any[] = []> = LabelList extends [infer F, ...infer Rest] ? F extends Record<Options['fieldNames']['value'], infer V> ? V extends VS[number] ? PickLabelListResult<Rest, Options, VS, [...Result, F]> : PickLabelListResult<Rest, Options, VS, Result> : Result : Result;
/**
 * 从列表中排除特定值的结果类型 (Result type for excluding specific values from a list)
 * @template LabelList - 标签列表类型 (Label list type)
 * @template Options - 列表选项类型 (List options type)
 * @template VS - 要排除的值类型 (Value type to exclude)
 * @template Result - 结果类型 (Result type)
 */
type OmitLabelListResult<LabelList extends any[], Options extends ToListOptions, VS extends LabelList[number][Options['fieldNames']['value']][], Result extends any[] = []> = LabelList extends [infer F, ...infer Rest] ? F extends Record<Options['fieldNames']['value'], infer V> ? V extends VS[number] ? OmitLabelListResult<Rest, Options, VS, Result> : OmitLabelListResult<Rest, Options, VS, [...Result, F]> : Result : Result;
/**
 * 根据列表获取特定值的value和label映射 (Gets value-label mapping for specific values from a list)
 * @template LabelList - 标签列表类型 (Label list type)
 * @template Options - 列表选项类型 (List options type)
 * @template VS - 选择的值类型 (Selected value type)
 * @template Result - 结果类型 (Result type)
 */
type GetValueLabelMap<LabelList extends any[], Options extends ToListOptions, VS extends any[], PickList = PickLabelListResult<LabelList, Options, VS>, Result extends Record<any, any> = {}> = PickList extends [infer F, ...infer Rest] ? F extends Record<Options['fieldNames']['value'], infer V> & Record<Options['fieldNames']['label'], infer L> ? V extends LabelList[number][Options['fieldNames']['value']] ? L extends LabelList[number][Options['fieldNames']['label']] ? GetValueLabelMap<Rest, Options, VS, PickLabelListResult<Rest, Options, VS>, Result & {
    [K in V]: L;
}> : Result : Result : Result : Result;
/**
 * 将枚举转换为标签列表的结果类型 (Result type for converting enum to label list)
 * @template M - 源枚举类型 (Source enum type)
 * @template ValueLabelEntities - 值和标签对的元组数组 (Array of value-label tuples)
 * @template O - 生成的列表选项类型 (Generated list options type)
 * @template List - 生成的标签列表类型 (Generated label list type)
 */
type ToLabelListResult<M extends SourceType, ValueLabelEntities extends [any, any][], O extends ToListOptions, List extends any[] = ToLabelList<M, ValueLabelEntities, O>, Values extends any[] = UnionToTuple<M[keyof M]>> = List & {
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
     * console.log(list.pick(1)); // 输出: [{ id: 'A', val: 1, desc: 'Label A' }]
     */
    pick: <const VS extends M[keyof M][]>(...values: VS) => PickLabelListResult<List, O, VS>;
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
     * console.log(list.omit(1)); // 输出: [{ id: 'B', val: 2, desc: 'Label B' }]
     */
    omit: <const VS extends M[keyof M][]>(...values: VS) => OmitLabelListResult<List, O, VS>;
    /**
     * 获取值和标签的映射关系 (Get mapping between values and labels)
     * @returns 以值为key、标签为value的映射对象 (Map object with value as key and label as value)
     * @example
     * const myEnum = createEnum({ A: 1, B: 2 });
     * const list = myEnum.$toList(
     *   [[1, 'Label A'], [2, 'Label B']],
     *   { fieldNames: { key: 'id', value: 'val', label: 'desc' } }
     * );
     * console.log(list.getValueLabelMap()); // 输出: { 1: 'Label A', 2: 'Label B' }
     */
    getValueLabelMap: <const VS extends M[keyof M][]>(...values: VS) => VS['length'] extends 0 ? ExpandRecursively<GetValueLabelMap<List, O, Values>> : ExpandRecursively<GetValueLabelMap<List, O, VS>>;
};
/**
 * 枚举基础结构定义 (Fundamental structure definition for Enum)
 *
 * @template M - 枚举的源类型（通常为键值对对象）(Source type of the enum)
 * @template ValueLabelEntities - 值和标签对的元组数组 (Tuple array of value-label pairs)
 */
type BaseResult<M extends SourceType = any, ValueLabelEntities extends [any, any][] = [M[keyof M], string][]> = M & {
    /**
     * 获取枚举的所有键 (Get all keys of the enum)
     * @returns 包含所有键的数组 (Array containing all keys)
     * @example
     * const myEnum = createEnum({ A: 1, B: 2 });
     * console.log(myEnum.$getKeys()); // 输出: ['A', 'B']
     */
    $getKeys: () => UnionToTuple<Exclude<keyof M, symbol>>;
    /**
     * 获取枚举的所有值 (Get all values of the enum)
     * @returns 包含所有值的数组 (Array containing all enum values)
     * @example
     * const myEnum = createEnum({ A: 1, B: 2 });
     * console.log(myEnum.$getValues()); // 输出: [1, 2]
     */
    $getValues: () => UnionToTuple<M[keyof M]>;
    /**
     * 获取枚举的长度（键的数量） (Get the length of enum (count of keys))
     * @returns 枚举键的数量 (Number of enum keys)
     * @example
     * const myEnum = createEnum({ A: 1, B: 2 });
     * console.log(myEnum.$length); // 输出: 2
     */
    $length: UnionToTuple<Exclude<keyof M, symbol>>['length'];
    /**
     * 根据键获取对应的枚举值 (Get enum value by key)
     * @template K - 枚举键的类型 (Type of enum key)
     * @param key - 要查询的枚举键 (Target enum key)
     * @returns 对应的枚举值 (Corresponding enum value)
     * @example
     * const myEnum = createEnum({ A: 1, B: 2 });
     * console.log(myEnum.$getValue('A')); // 输出: 1
     */
    $getValue: <K extends keyof M>(key: K) => M[K];
    /**
     * 根据枚举值反向查找对应的键 (Get enum key by value (reverse lookup))
     * @template V - 枚举值的类型约束 (Constraint for enum value type)
     * @param value - 要查找的枚举值 (Target enum value)
     * @returns 对应的枚举键 (Corresponding enum key)
     * @example
     * const myEnum = createEnum({ A: 1, B: 2 });
     * console.log(myEnum.$getKey(2)); // 输出: 'B'
     */
    $getKey: <V extends M[keyof M], Key extends keyof M = keyof M>(value: V) => Key extends Key ? IsEqual<V, M[Key]> extends true ? Key : never : never;
    /**
     * 将枚举转换为可配置字段的对象数组 (Transform enum into configurable object array with dynamic field mapping)
     *
     * @template T - 原始枚举类型 (Source enum type)
     * @template ES - 值-标签元组数组类型 (Array of [value, label] tuples)
     * @template O - 字段配置选项类型 (Field configuration options)
     *
     * @param entities - 值-标签映射数组 (Value-label mapping array)
     * @param options - 字段命名配置（可选）(Field naming config (optional))
     * @returns 结构化对象数组 (Structured object array)
     * @example
     * const myEnum = createEnum({ A: 1, B: 2 });
     * const list = myEnum.$toList(
     *   [[1, 'Label A'], [2, 'Label B']],
     *   { fieldNames: { key: 'id', value: 'val', label: 'desc' } }
     * );
     * console.log(list);
     * // 输出:
     * // [
     * //   { id: 'A', val: 1, desc: 'Label A' },
     * //   { id: 'B', val: 2, desc: 'Label B' }
     * // ]
     */
    $toList: <const ES extends ValueLabelEntities, const O extends ToListOptions = DefaultListOptions>(entities: ES, options?: O) => ToLabelListResult<M, ES, O>;
    /**
     * 扩展当前枚举，添加新的键值对 (Extend current enum with new key-value pairs)
     * @template NE - 新枚举键值对的类型约束 (Type constraint for new enum entries)
     * @param newEnum - 要合并的新枚举对象 (New enum object to merge)
     * @returns 包含合并后枚举的新实例 (New instance containing merged enum)
     * @example
     * const myEnum = createEnum({ A: 1, B: 2 });
     * const extendedEnum = myEnum.$extend({ C: 3 });
     * console.log(extendedEnum.$getKeys()); // 输出: ['A', 'B', 'C']
     */
    $extend: <const NE extends SourceType>(newEnum: NE) => ExpandRecursively<BaseResult<NE & M, [(NE & M)[keyof NE | keyof M], string][]>>;
};
type InvertedResult<M extends SourceType> = InvertedType<M> & {
    $inverted: InvertedType<M>;
} & BaseResult<M>;
type EnumResult<M extends Record<EnumMetaType, EnumMetaType>, O extends EnumOptions> = O['inverted'] extends true ? ExpandRecursively<InvertedResult<M>> : ExpandRecursively<BaseResult<M>>;
export declare const createEnum: <const S extends SourceType, const EO extends EnumOptions = DefaultEnumOptions>(source: S, option?: EO | undefined) => EnumResult<S, EO>;
export {};
