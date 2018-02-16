import React from 'react';
import LoadingScreen from './LoadingScreen';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default function deferComponentRender(WrappedComponent) {
  class DeferredRenderWrapper extends React.Component {
    static displayName = `deferComponentRender(${getDisplayName(WrappedComponent)})`;

    state = { shouldRender: false };

    componentDidMount() {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => this.setState({ shouldRender: true }));
      });
    }

    render() {
      const { shouldRender } = this.state;

      return shouldRender ? <WrappedComponent {...this.props} /> : <LoadingScreen />;
    }
  }

  return DeferredRenderWrapper;
}
