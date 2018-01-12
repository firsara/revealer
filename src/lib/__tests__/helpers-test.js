
import { assert } from 'chai';

import { getItemOptionValue } from '../helpers';

describe('lib helpers', () => {
  describe('getItemOptionValue()', () => {
    it('should return the original value as number', () => {
      const actual = getItemOptionValue('whatever', 3, { whatever: 5 });
      assert.strictEqual(actual, 3);
    });

    it('should return the original value as string', () => {
      const actual = getItemOptionValue('whatever', '3', { whatever: '5' });
      assert.strictEqual(actual, '3');
    });

    it('should transform number values', () => {
      const actual = getItemOptionValue('duration', '3', { duration: 5 });
      assert.strictEqual(actual, 3);
    });

    it('should transform boolean values', () => {
      const actual1 = getItemOptionValue('foobar', 'true', { foobar: false });
      assert.isTrue(actual1);

      const actual2 = getItemOptionValue('foobar', 'false', { foobar: true });
      assert.isFalse(actual2);
    });
  });
});
