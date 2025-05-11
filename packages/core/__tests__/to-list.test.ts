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

const toList = DirectionEnum.$toList([
  [DirectionEnum.Up, '上'],
  [DirectionEnum.Down, '下'],
  [DirectionEnum.Left, '左'],
  [DirectionEnum.Right, '右'],
])

describe('toList use', () => {
  test('toList', () => {
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
    }])
  });

  test('pick', () => {
    const pick = toList.pick(DirectionEnum.Up)
    expect(pick).toEqual([{
      key: "Up",
      value: 1,
      label: "上",
    }]);
  });

  test('omit', () => {
    const omit = toList.omit(DirectionEnum.Up)
    expect(omit).toEqual([{
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

  test('labelMap', () => {
    const allValueLabelMap = toList.getValueLabelMap()
    expect(allValueLabelMap).toEqual({
      1: '上',
      2: '下',
      3: '左',
      4: '右',
    });

    const pickValueLabelMap = toList.getValueLabelMap(
      DirectionEnum.Up,
      DirectionEnum.Left
    )
    expect(pickValueLabelMap).toEqual({
      1: '上',
      3: '左',
    });
  });
});