import React from 'react';
import ReactDom from 'react-dom';
import App from './app';

ReactDom.hydrate(React.createElement(App, {}, null), document.querySelector(
    '#react-mount'
) as HTMLElement);
