// @flow
import { rvlr } from './lib';

if (!(typeof module !== 'undefined' && module.exports)) {
  // $FlowFixMe
  this.rvlr = rvlr;
}

rvlr();

export {
  rvlr,
};
