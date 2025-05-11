import { createEnum } from 'enumily'
import type { EnumKey, EnumValue } from 'enumily'

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

const DirectionOptionList = DirectionEnum.$toList([
  [DirectionEnum.Up, '上'],
  [DirectionEnum.Down, '下'],
  [DirectionEnum.Left, '左'],
  [DirectionEnum.Right, '右'],
])

export type DirectionValue = EnumValue<typeof DirectionEnum>

export type DirectionKey = EnumKey<typeof DirectionEnum>

export {
  DirectionEnum,
  DirectionOptionList
}