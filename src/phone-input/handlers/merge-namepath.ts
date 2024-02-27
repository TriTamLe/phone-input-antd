import type { NamePath } from 'antd/es/form/interface';

export const mergeNamePath = (...args: NamePath[]): NamePath => {
  if (args.length === 1) {
    return args[0];
  }

  const merged: NamePath = [];

  for (const arg of args) {
    if (typeof arg === 'string' || typeof arg === 'number') merged.push(arg);
    else merged.push(...arg);
  }

  return merged;
};
