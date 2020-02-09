import React from 'react';
import {AppContext, IGlobalState} from './context';
import {ComponentType, PureComponent, Component} from 'react';

export type ComponentPropsWithContext = {context?: IGlobalState};
/**
 * Higher-order component to wrap an arbitrary component and provide it with app context.
 *
 * @param InnerComponent  the component to wrap
 * @param pureComponent   whether to return a PureComponent (use false if InnerComponent uses other
 *                        props and fails to update properly due to PureComponent's flat diffs)
 */
export const withContext = <ComponentProps extends {}>(
  InnerComponent: ComponentType<ComponentProps>,
  pureComponent: boolean = true,
) => {
  const componentType = pureComponent ? PureComponent : Component;
  return class WithContext extends componentType<
    ComponentProps & ComponentPropsWithContext
  > {
    render() {
      return (
        <AppContext.Consumer>
          {(context: IGlobalState) => (
            <InnerComponent {...this.props} context={context} />
          )}
        </AppContext.Consumer>
      );
    }
  };
};

export default withContext;
