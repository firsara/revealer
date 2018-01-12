// @flow
import anime from 'animejs';

import type { RvlrOptions, Easings } from '../../lib';

export type Direction = 'rl' | 'lr' | 'tb' | 'bt';

export type Options = RvlrOptions & {
  easing: Easings,
  duration: number,
  delay: number,
};

const DEFAULT_OPTIONS = {
  easing: 'easeOutQuint',
  duration: 2000,
  delay: 0,
};

export default class FadeIn {
  node: HTMLElement;
  options: Options;

  constructor(node: HTMLElement, options: Options) {
    this.node = node;
    this.options = {
      ...DEFAULT_OPTIONS,
      ...options,
    };

    this.init();
  }

  init() {
    this.node.style.opacity = '0';
  }

  animate() {
    anime({
      targets: this.node,
      duration: this.options.duration,
      easing: this.options.easing,
      delay: this.options.delay,
      opacity: 1,
    });
  }

  leftViewport() {
    this.init();
  }
}
