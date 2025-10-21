import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';
import { applyTheme } from './src/theme';

const container = document.getElementById('root');
if (!container) throw new Error('Root container missing in index.html');
const root = createRoot(container);
// Apply theme variables (change in src/theme.ts)
applyTheme();
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

if ((module as any).hot) {
	(module as any).hot.accept();
}
