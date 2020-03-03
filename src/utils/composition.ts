import * as React from 'react';

/**
 * composition
 * ------------------
 * An alternative to compose of redux package.
 * The type P will be the public props your component should receive
 * @param wrappedComponent
 * @param hocs
 * Notice the P type should be the component props that are passed by parent, not other HOC`s.(OwnProps)
 */
const composition = <P = {}>(wrappedComponent: React.ComponentType<P> , ...hocs: any[]) => {
  return hocs.reduce((accumulator, currentHoc) => currentHoc(accumulator), wrappedComponent) as React.ComponentType<P>;
};

export default composition;
