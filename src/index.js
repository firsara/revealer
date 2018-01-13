// @flow
import { rvlr } from './lib';

if (typeof window !== 'undefined') {
  window.rvlr = rvlr;
}

rvlr();

export {
  rvlr,
};
