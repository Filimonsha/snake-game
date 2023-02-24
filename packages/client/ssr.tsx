import React from 'react';
import { App } from './src/app';
import { renderToString } from 'react-dom/server';

export const render = () => renderToString(<App />)
