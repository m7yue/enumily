import {describe, expect, test} from '@jest/globals';
import { createEnum } from '../src'

describe('validate use', () => {
  test('throws on octopus', () => {
    expect(() => {
      createEnum({
        Success: 1,
        Error: 0,
        Other: 1
      })
    }).toThrow('Enum values must be unique');
  });
});