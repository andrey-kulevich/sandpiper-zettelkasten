import * as React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './utils/theme';
import Header from './components/Header';
import { Box, CssBaseline, Divider, Snackbar, Stack } from '@mui/material';
import NotesBrowser from './components/NotesBrowser';
import Content from './components/Content';
import { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';

const container = document.getElementById('root');
const root = createRoot(container);
export const NotificationContext = React.createContext({} as any);

function App() {
	const [files, setFiles] = useState([]);
	const [currentNote, setCurrentNote] = useState<string>('');
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState<string>('');

	useEffect(() => {
		ipcRenderer.invoke('app:get-files').then((files = []) => {
			setFiles(files.filter((elem: any) => elem.name[0] != '.'));
		});
	}, []);

	const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') return;
		setOpen(false);
	};

	const notify = (_message: string) => {
		setMessage(_message);
		setOpen(true);
	};

	return (
		<React.StrictMode>
			<ThemeProvider theme={theme}>
				<NotificationContext.Provider value={notify}>
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
					<Snackbar open={open} autoHideDuration={6000} onClose={handleClose} message={message} />
				</NotificationContext.Provider>
			</ThemeProvider>
		</React.StrictMode>
	);
}

export function render() {
	root.render(<App />);
}
