
import { assert } from 'chai';

import { createRevealerItem, setupRevealerItem, DEFAULT_OPTIONS } from '..';

describe('lib', () => {
  const htmlItemMockup = {
    'data-rvlr-animation': 'fadein',
    style: {},
    querySelector: () => ({
      ...htmlItemMockup,
    }),
    getAttribute: attr => htmlItemMockup[attr],
    setAttribute: (attr, value) => {
      htmlItemMockup[attr] = value;
    },
    appendChild: () => null,
  };

  global.document = {
    querySelectorAll: () => ([
      {
        ...htmlItemMockup,
        'data-rvlr-animation': 'fadein',
      },
      {
        ...htmlItemMockup,
        'data-rvlr-animation': 'fadein',
      },
    ]),
    createElement: () => ({
      ...htmlItemMockup,
    }),
  };

  describe('createRevealerItem()', () => {
    it('should return a revealer item', () => {
      const mock = { ...htmlItemMockup };
      const actual = createRevealerItem(mock);
      const expected = {
        ...DEFAULT_OPTIONS,
        animation: 'fadein',
      };

      assert.strictEqual(actual.node, mock);
      assert.deepEqual(actual.options, expected);
      assert.isDefined(actual.watcher);
    });

    it('should set initialized data attribute on given dom node', () => {
      const mock = { ...htmlItemMockup };
      const actual = createRevealerItem(mock);
      assert.strictEqual(actual.node['data-rvlr-initialized'], 'true');
    });
  });

  describe('setupRevealerItem()', () => {
    it('should return null if animation not defined', () => {
      const mock = { ...htmlItemMockup };
      const rvlrItem = createRevealerItem(mock);
      const options = { ...rvlrItem.options };
      options.animation = 'foobar';

      rvlrItem.options = options;

      const actual = setupRevealerItem(rvlrItem);
      assert.isNull(actual);
    });
  });
});
