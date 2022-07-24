import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './utils/theme';
import Header from './components/Header';
import { Box, CssBaseline, Divider, Stack } from '@mui/material';
import NotesBrowser from './components/NotesBrowser';
import Content from './components/Content';

const container = document.getElementById('root');
const root = createRoot(container);

function render() {
	root.render(
		<React.StrictMode>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Header />
				<Stack direction='row' divider={<Divider orientation='vertical' flexItem />}>
					<Box sx={{ width: '25%', height: '100vh' }}>
						<NotesBrowser />
					</Box>
					<Box sx={{ width: '75%', height: '100vh' }}>
						<Content />
					</Box>
				</Stack>
			</ThemeProvider>
		</React.StrictMode>,
	);
}

render();
