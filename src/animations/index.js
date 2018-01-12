// @flow
import BlockReveal from './blockReveal';
import FadeIn from './fadein';

export type Animation = {
  node: HTMLElement,
  options: any,
  setup: () => void,
  animate: () => void,
  leftViewport: () => void,
};

export type RvlrAnimation = 'blockReveal' | 'fadein';

export default {
  blockReveal: BlockReveal,
  fadein: FadeIn,
};
