// @flow
import FadeIn from './fadein';

export type Animation = {
  animate: () => void,
  leftViewport: () => void,
};

export type RvlrAnimation = 'fadein';

export default {
  fadein: FadeIn,
};
