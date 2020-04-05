import React from 'react';
import NextApp, { AppProps } from 'next/app';

export default class App extends NextApp<AppProps> {
  componentDidMount() {
    // NOTE: remove the server side style for material-ui here
    const jssSeverSideStyles = document.querySelector('#jss-server-side');
    if (jssSeverSideStyles && jssSeverSideStyles.parentNode)
      jssSeverSideStyles.parentNode.removeChild(jssSeverSideStyles);
  }
  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}
