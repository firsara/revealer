// @flow
import anime from 'animejs';

import {
  createOverlay,
  wrapContent,
  getInitialTransform,
  getInitialTransformOrigin,
  getAnimationOutTransformOrigin,
  getAnimationTransformIn,
  getAnimationTransformOut,
} from './helpers';

import type { RvlrOptions, Easings } from '../../lib';

export type Direction = 'rl' | 'lr' | 'tb' | 'bt';

export type Options = RvlrOptions & {
  direction: Direction,
  easing: Easings,
  easein?: ?Easings,
  easeout?: ?Easings,
  duration: number,
  delay: number,
  bgcolor: string,
  measurecontent: boolean,
};

export default class BlockReveal {
  node: HTMLElement;
  options: Options;
  content: HTMLElement;
  overlay: HTMLElement;

  static DEFAULT_OPTIONS = {
    direction: 'lr',
    easing: 'easeInOutQuint',
    easein: null,
    easeout: null,
    duration: 300,
    delay: 0,
    bgcolor: '#000000',
    measurecontent: false,
  };

  setup() {
    this.overlay = createOverlay(this.options.bgcolor);
    this.content = wrapContent(this.node, this.options.measurecontent);

    this.node.style.position = 'relative';
    this.node.appendChild(this.overlay);

    this.init();
  }

  init() {
    const { content, overlay } = this;
    const { direction } = this.options;

    const initialTransform = getInitialTransform(direction);
    const initialTransformOrigin = getInitialTransformOrigin(direction);

    content.style.opacity = '0';

    // TODO: assign css values via helper function
    // $FlowFixMe
    overlay.style.WebkitTransform = initialTransform;
    overlay.style.transform = initialTransform;

    // TODO: assign css values via helper function
    // $FlowFixMe
    overlay.style.WebkitTransformOrigin = initialTransformOrigin;
    overlay.style.transformOrigin = initialTransformOrigin;
  }

  animate() {
    const { content, overlay, options } = this;

    overlay.style.width = `${content.offsetWidth}px`;
    overlay.style.height = `${content.offsetHeight}px`;

    const transformsIn = getAnimationTransformIn(options.direction);
    const halfDuration = Math.round(options.duration / 2);

    anime({
      targets: overlay,
      duration: halfDuration,
      easing: options.easein || options.easing,
      delay: options.delay,
      ...transformsIn,
      complete: () => {
        content.style.opacity = '1';

        const outTransformOrigin = getAnimationOutTransformOrigin(options.direction);
        const transformsOut = getAnimationTransformOut(options.direction);

        // TODO: assign css values via helper function
        // $FlowFixMe
        overlay.style.WebkitTransformOrigin = outTransformOrigin;
        overlay.style.transformOrigin = outTransformOrigin;

        anime({
          targets: overlay,
          duration: halfDuration,
          easing: options.easeout || options.easing,
          ...transformsOut,
        });
      },
    });
  }

  leftViewport() {
    anime.remove(this.overlay);
    this.init();
  }
}
