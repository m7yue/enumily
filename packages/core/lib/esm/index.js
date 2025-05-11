"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createEnum = void 0;
const util_1 = require("./util");
const defaultEnumOptions = {
    inverted: false
};
const defaultListOptions = {
    fieldNames: {
        key: 'key',
        value: 'value',
        label: 'label'
    }
};
const createEnum = (source, option) => {
    /**
     * validate same value
     * enum values must unique
     */
    const validate = () => {
        const values = Object.values(source);
        const uniqueValues = new Set(values);
        if (values.length !== uniqueValues.size) {
            throw new Error('Enum values must be unique');
        }
    };
    validate();
    const inverted = option?.inverted ?? defaultEnumOptions.inverted;
    const invertedMap = new Map((0, util_1.getAllEnumerableEntities)(source).map(([k, v]) => [v, k]));
    const $getKeys = () => [...invertedMap.values()];
    const $getValues = () => [...invertedMap.keys()];
    const $length = invertedMap.size;
    const $getValue = (key) => {
        return source[key];
    };
    const $getKey = (value) => {
        return invertedMap.get(value);
    };
    const $toList = (arr, options) => {
        const { fieldNames } = options || defaultListOptions;
        const { key: keyField, value: valueField, label: labelField } = fieldNames;
        const list = arr.map((v) => {
            const key = $getKey(v[0]);
            const label = v[1];
            const value = v[0];
            return {
                [keyField]: key,
                [valueField]: value,
                [labelField]: label,
            };
        });
        const pick = (...values) => {
            return list.filter((item) => {
                const v = item[valueField];
                return values.includes(v);
            });
        };
        const omit = (...values) => {
            return list.filter((item) => {
                const v = item[valueField];
                return !values.includes(v);
            });
        };
        const getValueLabelMap = (...values) => {
            return values.length === 0
                ? Object.fromEntries(list.map((item) => [item[valueField], item[labelField]]))
                : Object.fromEntries(list.filter((item) => {
                    const v = item[valueField];
                    return values.includes(v);
                }).map((item) => [item[valueField], item[labelField]]));
        };
        Object.defineProperties(list, {
            pick: {
                value: pick,
                writable: false,
                enumerable: false,
                configurable: false
            },
            omit: {
                value: omit,
                writable: false,
                enumerable: false,
                configurable: false
            },
            getValueLabelMap: {
                value: getValueLabelMap,
                writable: false,
                enumerable: false,
                configurable: false
            },
        });
        return list;
    };
    const $extend = (newEnum) => {
        const extendEnum = Object.create(source);
        Object.assign(extendEnum, newEnum);
        return (0, exports.createEnum)(extendEnum);
    };
    const baseDescription = {
        writable: false,
        enumerable: false,
        configurable: false
    };
    Object.defineProperties(source, {
        $getKeys: {
            value: $getKeys,
            ...baseDescription
        },
        $getValues: {
            value: $getValues,
            ...baseDescription
        },
        $length: {
            value: $length,
            ...baseDescription
        },
        $getValue: {
            value: $getValue,
            ...baseDescription
        },
        $getKey: {
            value: $getKey,
            ...baseDescription
        },
        $toList: {
            value: $toList,
            ...baseDescription
        },
        $extend: {
            value: $extend,
            ...baseDescription
        },
    });
    if (inverted === true) {
        const invertedObject = Object.fromEntries([...invertedMap.entries()].filter(([value, key]) => {
            return typeof value === 'number';
        }));
        Object.assign(source, invertedObject);
        Object.defineProperties(source, {
            $inverted: {
                value: invertedObject,
                ...baseDescription
            },
        });
        return source;
    }
    else {
        return source;
    }
};
exports.createEnum = createEnum;
