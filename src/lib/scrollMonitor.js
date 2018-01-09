// @flow
import scrollMonitor from 'scrollmonitor';

type Offset = {
  top: number,
  bottom: number,
};

type Callback = () => void;

export type ScrollWatcher = {
  // events
  visibilityChange: (callback: Callback) => void,
  stateChange: (callback: Callback) => void,
  enterViewport: (callback: Callback) => void,
  fullyEnterViewport: (callback: Callback) => void,
  exitViewport: (callback: Callback) => void,
  partiallyExitViewport: (callback: Callback) => void,

  // properties
  isInViewport: boolean,
  isFullyInViewport: boolean,
  isAboveViewport: boolean,
  isBelowViewport: boolean,
  top: number,
  bottom: number,
  height: number,
  watchItem: any,
  offset: Offset,

  // methods
  on: () => void,
  off: () => void,
  one: () => void,
  recalculateLocation: () => void,
  destroy: () => void,
  lock: () => void,
  unlock: () => void,
};

export type ScrollMonitor = {
  createContainer: (element: HTMLElement) => ScrollMonitor,
  create: (watchItem: HTMLElement, offset?: number|Offset) => ScrollWatcher,
  update: () => void,
  recalculateLocations: () => void,
  viewportTop: number,
  viewportBottom: number,
  viewportHeight: number,
  documentHeight: number,
};

const monitor: ScrollMonitor = scrollMonitor;

export default monitor;
