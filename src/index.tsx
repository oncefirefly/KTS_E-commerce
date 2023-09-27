import * as React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';
import 'regenerator-runtime';
import '@styles/styles.scss';
import '@config/configureMobX';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render((<App />) as keyof React.ReactNode);
