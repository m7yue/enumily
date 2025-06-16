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
    var _a;
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
    const inverted = (_a = option === null || option === void 0 ? void 0 : option.inverted) !== null && _a !== void 0 ? _a : defaultEnumOptions.inverted;
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
    const $toList = (arr) => {
        const list = arr.map((v) => {
            const key = $getKey(v[0]);
            const label = v[1];
            const value = v[0];
            return {
                key,
                value,
                label,
            };
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
        $getKeys: Object.assign({ value: $getKeys }, baseDescription),
        $getValues: Object.assign({ value: $getValues }, baseDescription),
        $length: Object.assign({ value: $length }, baseDescription),
        $getValue: Object.assign({ value: $getValue }, baseDescription),
        $getKey: Object.assign({ value: $getKey }, baseDescription),
        $toList: Object.assign({ value: $toList }, baseDescription),
        $extend: Object.assign({ value: $extend }, baseDescription),
    });
    if (inverted === true) {
        const invertedObject = Object.fromEntries([...invertedMap.entries()].filter(([value, key]) => {
            return typeof value === 'number';
        }));
        Object.assign(source, invertedObject);
        Object.defineProperties(source, {
            $inverted: Object.assign({ value: invertedObject }, baseDescription),
        });
        return source;
    }
    else {
        return source;
    }
};
exports.createEnum = createEnum;
