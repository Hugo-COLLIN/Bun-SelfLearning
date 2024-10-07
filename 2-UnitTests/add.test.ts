// > bun test
import { describe, expect, it } from "bun:test";
import {add} from "./index.ts";

describe('add', () => {
  it('should add two numbers', () => {
    expect(add(1, 2)).toBe(3)
    expect(add(1, 2)).toBeDefined()
    expect(add(1, 2)).not.toBeArray()
  })

  it('should throw an error if a negative number is provided', () => {
    expect(() => add(-1, 2)).toThrowError(/Negative NUMBERS/i)
  })
});
