
import { assert } from 'chai';

import { DEFAULT_OPTIONS } from '..';
import { getItemOptionValue, getItemOptions } from '../helpers';

describe('lib helpers', () => {
  describe('getItemOptionValue()', () => {
    it('should return the original value as number', () => {
      const actual = getItemOptionValue('whatever', 3);
      assert.strictEqual(actual, 3);
    });

    it('should return the original value as string', () => {
      const actual = getItemOptionValue('whatever', '3');
      assert.strictEqual(actual, '3');
    });

    it('should transform duration value', () => {
      const actual = getItemOptionValue('duration', '3');
      assert.strictEqual(actual, 3);
    });

    it('should transform delay value', () => {
      const actual = getItemOptionValue('delay', '3');
      assert.strictEqual(actual, 3);
    });

    it('should transform singleAnimation value', () => {
      const actual1 = getItemOptionValue('singleAnimation', 'true');
      assert.strictEqual(actual1, true);

      const actual2 = getItemOptionValue('singleAnimation', 'false');
      assert.strictEqual(actual2, false);
    });
  });

  describe('getItemOptions()', () => {
    const mockHtmlItem = {
      'data-rvlr-animation': 'shizzle',
      'data-rvlr-direction': 'nizzle',
      'data-rvlr-easing': 'foo',
      'data-rvlr-bgColor': 'bar',
      'data-rvlr-duration': '12345',
      'data-rvlr-delay': '345',
      'data-rvlr-singleAnimation': 'false',

      getAttribute: key => mockHtmlItem[key],
    };

    const mockHtmlItemEmpty = {
      getAttribute: () => null,
    };

    it('should return the default options if no params are present', () => {
      const actual = getItemOptions(mockHtmlItemEmpty);
      assert.deepEqual(actual, DEFAULT_OPTIONS);
    });

    it('should return the merged options', () => {
      const actual = getItemOptions(mockHtmlItem);
      assert.deepEqual(actual, {
        animation: 'shizzle',
        direction: 'nizzle',
        easing: 'foo',
        bgColor: 'bar',
        duration: 12345,
        delay: 345,
        singleAnimation: false,
      });
    });
  });
});
