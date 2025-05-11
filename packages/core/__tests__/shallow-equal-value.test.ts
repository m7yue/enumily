import {describe, expect, test} from '@jest/globals';
import { createEnum } from '../src'

const StatusEnum = createEnum({
  Success: 1,
  Error: 0,
  Other: '1'
}, {
  inverted: true
})

describe('shallow equal value use', () => {
  test('key', () => {
    // 双向映射只在数字值时生效，和 typescript enum 保持一致
    const keyWithNumber = StatusEnum[1]
    const keyString = StatusEnum['1']
    expect(keyWithNumber).toBe('Success');
    expect(keyString).toBe('Success');
  });

  test('value', () => {
    const valueSuccess = StatusEnum.Success
    expect(valueSuccess).toBe(1);

    const valueOther = StatusEnum.Other
    expect(valueOther).toBe('1');
  });

  test('length', () => {
    const length = StatusEnum.$length
    expect(length).toBe(3);
  });

  test('keys', () => {
    const keys = StatusEnum.$getKeys()
    expect(keys).toEqual(["Success", "Error", "Other"]);
  });

  test('values', () => {
    const values = StatusEnum.$getValues()
    expect(values).toEqual([1, 0, "1"]);
  });

  test('getKey', () => {
    // 和直接通过 StatusEnum['1'] 不同的是，$getKey 结果是原始 key
    const keyWithNumber = StatusEnum.$getKey(1)
    const keyWithString = StatusEnum.$getKey('1')
    expect(keyWithNumber).toBe('Success');
    expect(keyWithString).toBe('Other');
  });

  test('getValue', () => {
    const value = StatusEnum.$getValue('Other')
    expect(value).toBe('1');
  });

  test('toList', () => {
    const toList = StatusEnum.$toList([
      [StatusEnum.Success, '成功'],
      [StatusEnum.Error, '失败'],
      [StatusEnum.Other, '其他'],
    ])
    expect(toList).toEqual([
      {
          key: "Success",
          value: 1,
          label: "成功",
      }, 
      {
          key: "Error",
          value: 0,
          label: "失败"
      },
      {
        key: "Other",
        value: '1',
        label: "其他"
    }
    ]);
  });
});