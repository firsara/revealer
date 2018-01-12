// @flow
import type { Direction } from '.';

type AnimeTransform = {
  scaleX?: [number, number],
  scaleY?: [number, number],
};

// TODO: write tests

export function createOverlay(color: string): HTMLElement {
  const overlay = document.createElement('span');
  overlay.style.display = 'block';
  overlay.style.position = 'absolute';
  overlay.style.top = '0px';
  overlay.style.left = '0px';
  overlay.style.width = '0px';
  overlay.style.height = '0px';
  overlay.style.backgroundColor = color;

  return overlay;
}

export function wrapContent(node: HTMLElement, measurecontent: boolean): HTMLElement {
  const innerWrapper = node.querySelector('[data-rvlr-content-wrapper]');

  if (!innerWrapper) {
    // eslint-disable-next-line no-param-reassign
    node.innerHTML = `<span data-rvlr-content-wrapper>${node.innerHTML}</span>`;
  }

  const content = node.querySelector('[data-rvlr-content-wrapper]');

  // $FlowFixMe
  content.style.display = measurecontent ? 'inline-block' : 'block';

  // NOTE: forcing return value, HTMLElement will be defined
  return (content: any);
}

export function getInitialTransform(direction: Direction): string {
  if (direction === 'lr') {
    return 'scale3d(0, 1, 1)';
  }

  if (direction === 'rl') {
    return 'scale3d(0, 1, 1)';
  }

  if (direction === 'tb') {
    return 'scale3d(1, 0, 1)';
  }

  if (direction === 'bt') {
    return 'scale3d(1, 0, 1)';
  }

  return '';
}

export function getInitialTransformOrigin(direction: Direction): string {
  if (direction === 'lr') {
    return '0 0';
  }

  if (direction === 'rl') {
    return '100% 0';
  }

  if (direction === 'tb') {
    return '0 0';
  }

  if (direction === 'bt') {
    return '0 100%';
  }

  return '';
}

export function getAnimationOutTransformOrigin(direction: Direction): string {
  if (direction === 'lr') {
    return '100% 0';
  }

  if (direction === 'rl') {
    return '0 0';
  }

  if (direction === 'tb') {
    return '0 100%';
  }

  if (direction === 'bt') {
    return '0 0';
  }

  return '';
}

export function getAnimationTransformIn(direction: Direction): AnimeTransform {
  if (direction === 'lr' || direction === 'rl') {
    return {
      scaleX: [0, 1],
    };
  }

  if (direction === 'tb' || direction === 'bt') {
    return {
      scaleY: [0, 1],
    };
  }

  return {};
}

export function getAnimationTransformOut(direction: Direction): AnimeTransform {
  if (direction === 'lr' || direction === 'rl') {
    return {
      scaleX: [1, 0],
    };
  }

  if (direction === 'tb' || direction === 'bt') {
    return {
      scaleY: [1, 0],
    };
  }

  return {};
}
