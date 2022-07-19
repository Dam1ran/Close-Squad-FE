import { CSSProperties } from 'react';

export function flex_design(
  direction:
    | '-moz-initial'
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'unset'
    | 'column'
    | 'column-reverse'
    | 'row'
    | 'row-reverse' = 'row',
  justifyContent = 'center',
  alignItems = 'center',
): CSSProperties {
  return {
    display: 'flex',
    flexDirection: direction,
    justifyContent: justifyContent,
    alignItems: alignItems,
  };
}
