import * as React from 'react';
import { InputAdornment, List, ListItem, ListItemButton, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';

export default function NotesBrowser({
	notes,
	setCurrentNote,
}: {
	notes: any[];
	setCurrentNote: (filename: string) => void;
}) {
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
				{notes.map((elem, index) => (
					<ListItem key={index} disablePadding>
						<ListItemButton onClick={() => setCurrentNote(elem.name)}>
							{elem.name.substring(0, elem.name.length - 4)}
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</>
	);
}
