// @flow
import { DEFAULT_OPTIONS } from '.';
import type { RvlrOptions } from '.';

export function getItemOptionValue(key: string, value: string): string | number | boolean {
  if (key === 'duration' || key === 'delay') {
    return parseInt(value, 10);
  }

  if (key === 'singleAnimation') {
    if (value === 'true') {
      return true;
    }

    return false;
  }

  return value;
}

export function getItemOptions(node: HTMLElement): RvlrOptions {
  const opts = {
    animation: node.getAttribute('data-rvlr-animation'),
    direction: node.getAttribute('data-rvlr-direction'),
    easing: node.getAttribute('data-rvlr-easing'),
    bgColor: node.getAttribute('data-rvlr-bgColor'),
    duration: node.getAttribute('data-rvlr-duration'),
    delay: node.getAttribute('data-rvlr-delay'),
    singleAnimation: node.getAttribute('data-rvlr-singleAnimation'),
  };

  const itemOptions = Object.keys(opts).reduce((result, key) => {
    if (opts[key] === null || opts[key] === undefined) {
      return result;
    }

    return {
      ...result,
      [key]: getItemOptionValue(key, opts[key]),
    };
  }, {});

  return {
    ...DEFAULT_OPTIONS,
    ...(itemOptions: any),
  };
}

