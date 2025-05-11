import {describe, expect, test} from '@jest/globals';
import { createEnum } from '../src'

const DirectionEnum = createEnum({
  /** 向上：1 */
  Up: 1,
  /** 向下：2 */
  Down: 2,
  /** 向左：3 */
  Left: 3,
  /** 向右 */
  Right: 4,
}, {
  inverted: true
})

describe('inverted use', () => {
  test('key', () => {
    const key = DirectionEnum[1]
    expect(key).toBe('Up');
  });

  test('value', () => {
    const value = DirectionEnum.Left
    expect(value).toBe(3);
  });

  test('length', () => {
    const length = DirectionEnum.$length
    expect(length).toBe(4);
  });

  test('keys', () => {
    const keys = DirectionEnum.$getKeys()
    expect(keys).toEqual(["Up", "Down", "Left", "Right"]);
  });

  test('values', () => {
    const values = DirectionEnum.$getValues()
    expect(values).toEqual([1, 2, 3, 4]);
  });

  test('getKey', () => {
    const key = DirectionEnum.$getKey(4)
    expect(key).toBe('Right');
  });

  test('getValue', () => {
    const value = DirectionEnum.$getValue('Down')
    expect(value).toBe(2);
  });

  test('toList', () => {
    const toList = DirectionEnum.$toList([
      [DirectionEnum.Up, '上'],
      [DirectionEnum.Down, '下'],
      [DirectionEnum.Left, '左'],
      [DirectionEnum.Right, '右'],
    ])
    expect(toList).toEqual( [{
      key: "Up",
      value: 1,
      label: "上",
    }, {
        key: "Down",
        value: 2,
        label: "下",
    }, {
        key: "Left",
        value: 3,
        label: "左",
    }, {
        key: "Right",
        value: 4,
        label: "右",
    }]);
  });

  test('inverted', () => {
    const inverted = DirectionEnum.$inverted
    expect(inverted).toEqual({
      1: "Up",
      2: "Down",
      3: "Left",
      4: "Right",
    });
  });
});