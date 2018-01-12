// @flow
import type { RvlrOptions } from '.';

export function getItemOptionValue(key: string, value: string, defaultOptions: RvlrOptions): string | number | boolean {
  if (defaultOptions[key] === true || defaultOptions[key] === false) {
    if (value === 'true') {
      return true;
    }

    return false;
  }

  if (typeof defaultOptions[key] === 'number') {
    return parseInt(value, 10);
  }

  return value;
}

export function getItemOptions(node: HTMLElement, defaultOptions: RvlrOptions): RvlrOptions {
  const attrs = Array.prototype.slice.call(node.attributes).filter(attr => attr.localName.indexOf('data-rvlr-') !== -1).map(attr => attr.localName);

  const opts = attrs.reduce((result, attr) => ({
    ...result,
    [attr.replace('data-rvlr-', '')]: node.getAttribute(attr),
  }), {});

  const itemOptions = Object.keys(opts).reduce((result, key) => {
    if (opts[key] === null || opts[key] === undefined) {
      return result;
    }

    return {
      ...result,
      [key]: getItemOptionValue(key, opts[key], defaultOptions),
    };
  }, {});

  return {
    ...defaultOptions,
    ...(itemOptions: any),
  };
}

