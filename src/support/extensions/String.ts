import { normalize } from '../utils';

String.prototype.getNormalized = function (): string {
  return normalize(String(this));
};

export {};
