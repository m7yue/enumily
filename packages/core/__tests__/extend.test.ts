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
})

const NewDirectionEnum = DirectionEnum.$extend({
    /** 左上 */
    LeftTop: 5,
    /** 左下 */
    LeftDown: 6,
    /** 右上 */
    RightTop: 7,
    /** 右下 */
    RightDown: 8
})

describe('extend use test', () => {
  test('value', () => {
    const value = NewDirectionEnum.LeftTop
    expect(value).toBe(5);
  });

  test('length', () => {
    const length = NewDirectionEnum.$length
    expect(length).toBe(8);
  });

  test('keys', () => {
    const keys = NewDirectionEnum.$getKeys()
    expect(keys).toEqual([ "Up", "Down", "Left", "Right", "LeftTop", "LeftDown", "RightTop", "RightDown"]);
  });

  test('values', () => {
    const values = NewDirectionEnum.$getValues()
    expect(values).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  test('getKey', () => {
    const key = NewDirectionEnum.$getKey(5)
    expect(key).toBe('LeftTop');
  });

  test('getValue', () => {
    const value = NewDirectionEnum.$getValue('RightTop')
    expect(value).toBe(7);
  });

  test('toList', () => {
    const toList = NewDirectionEnum.$toList([
      [NewDirectionEnum.LeftTop, '左上'],
      [NewDirectionEnum.LeftDown, '左下'],
      [NewDirectionEnum.Left, '左'],
      [NewDirectionEnum.Right, '右'],
    ])
    expect(toList).toEqual( [{
      key: "LeftTop",
      value: 5,
      label: "左上",
    }, {
        key: "LeftDown",
        value: 6,
        label: "左下",
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
});