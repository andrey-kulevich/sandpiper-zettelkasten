import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './utils/theme';
import Header from './components/Header';
import { Box, CssBaseline, Divider, Stack } from '@mui/material';
import NotesBrowser from './components/NotesBrowser';
import Content from './components/Content';
import { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';

const container = document.getElementById('root');
const root = createRoot(container);

function App() {
	const [files, setFiles] = useState([]);
	const [currentNote, setCurrentNote] = useState<string>('');

	useEffect(() => {
		ipcRenderer.invoke('app:get-files').then((files = []) => {
			setFiles(files.filter((elem: any) => elem.name[0] != '.'));
		});
	}, []);

	return (
		<React.StrictMode>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Header />
				<Stack direction='row' divider={<Divider orientation='vertical' flexItem />}>
					<Box sx={{ width: '25%', height: '100vh' }}>
						<NotesBrowser notes={files} setCurrentNote={setCurrentNote} />
					</Box>
					<Box sx={{ width: '75%', height: '100vh' }}>
						<Content noteName={currentNote} setNoteName={setCurrentNote} notes={files} />
					</Box>
				</Stack>
			</ThemeProvider>
		</React.StrictMode>
	);
}

root.render(<App />);
