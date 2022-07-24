import * as React from 'react';
import { InputAdornment, List, ListItem, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';

export default function NotesBrowser() {
	const [files, setFiles] = useState([]);

	useEffect(() => {
		ipcRenderer.invoke('app:get-files').then((files = []) => {
			setFiles(files);
		});
	}, []);

	return (
		<>
			<TextField
				id='search-input'
				placeholder='search'
				size='small'
				sx={{ p: 1 }}
				fullWidth
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<Search />
						</InputAdornment>
					),
				}}
			/>
			<List>
				{files.map((elem, index) => (
					<ListItem key={index}>{elem.name}</ListItem>
				))}
			</List>
		</>
	);
}
