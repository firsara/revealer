// @flow
import scrollMonitor from './scrollMonitor';
import { getItemOptions } from './helpers';
import animations from '../animations';

import type { ScrollWatcher } from './scrollMonitor';
import type { Animation, RvlrAnimation } from '../animations';

export type Easings =
  'easeInQuad' |
  'easeOutQuad' |
  'easeInOutQuad' |
  'easeInCubic' |
  'easeOutCubic' |
  'easeInOutCubic' |
  'easeInQuart' |
  'easeOutQuart' |
  'easeInOutQuart' |
  'easeInQuint' |
  'easeOutQuint' |
  'easeInOutQuint' |
  'easeInSine' |
  'easeOutSine' |
  'easeInOutSine' |
  'easeInExpo' |
  'easeOutExpo' |
  'easeInOutExpo' |
  'easeInCirc' |
  'easeOutCirc' |
  'easeInOutCirc' |
  'easeInBack' |
  'easeOutBack' |
  'easeInOutBack' |
  'easeInElastic' |
  'easeOutElastic' |
  'easeInOutElastic';

export type RvlrOptions = {
  animation: RvlrAnimation,
  singleanimation: boolean,
};

export type RvlrElement = {
  node: HTMLElement,
  watcher: ScrollWatcher,
};

export const DEFAULT_OPTIONS: RvlrOptions = {
  animation: 'fadein',
  singleanimation: false,
};

export function createRevealerItem(node: HTMLElement): RvlrElement {
  node.setAttribute('data-rvlr-initialized', 'true');

  const watcher = scrollMonitor.create(node);

  return {
    node,
    watcher,
  };
}

export function setupRevealerItem(item: RvlrElement): ?Animation {
  const { node, watcher } = item;

  const attr = node.getAttribute('data-rvlr-animation');
  const type = attr && attr.length > 0 && animations[attr]
    ? attr
    : DEFAULT_OPTIONS.animation;

  const AnimationInstance: any = animations[type];

  if (AnimationInstance) {
    const defaultOptions = {
      ...DEFAULT_OPTIONS,
      ...AnimationInstance.DEFAULT_OPTIONS,
    };

    const options = getItemOptions(node, defaultOptions);

    const animation: Animation = new AnimationInstance();
    animation.node = item.node;
    animation.options = options;
    animation.setup();

    watcher.enterViewport(() => {
      animation.animate();

      if (options.singleanimation) {
        watcher.destroy();
      }
    });

    watcher.exitViewport(() => {
      if (!options.singleanimation) {
        animation.leftViewport();
      }
    });

    return animation;
  }

  return null;
}

export function rvlr() {
  const items = Array.prototype.slice.call(document.querySelectorAll('[data-rvlr-animation]'));

  const newItems = items.filter(node => (
    node.getAttribute('data-rvlr-initialized') !== 'true'
  ));

  const revealerItems = newItems.map(createRevealerItem);
  return revealerItems.map(setupRevealerItem);
}
