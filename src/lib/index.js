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
  singleAnimation: boolean,
};

export type RvlrElement = {
  node: HTMLElement,
  watcher: ScrollWatcher,
  options: RvlrOptions,
};

export const DEFAULT_OPTIONS: RvlrOptions = {
  animation: 'fadein',
  singleAnimation: true,
};

export function createRevealerItem(node: HTMLElement): RvlrElement {
  node.setAttribute('data-rvlr-initialized', 'true');

  const options = getItemOptions(node);
  const watcher = scrollMonitor.create(node);

  return {
    node,
    watcher,
    options,
  };
}

export function setupRevealerItem(item: RvlrElement): ?Animation {
  const { watcher, options: { animation: type, singleAnimation } } = item;

  const AnimationInstance: any = animations[type];

  if (AnimationInstance) {
    const animation: Animation = new AnimationInstance(item.node, item.options);

    watcher.enterViewport(() => {
      animation.animate();

      if (singleAnimation) {
        watcher.destroy();
      }
    });

    watcher.exitViewport(() => {
      if (!singleAnimation) {
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
