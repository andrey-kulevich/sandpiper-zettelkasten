import * as React from 'react';
import { InputAdornment, List, ListItem, ListItemButton, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useState } from 'react';

export default function NotesBrowser({
	notes,
	setCurrentNote,
}: {
	notes: any[];
	setCurrentNote: (filename: string) => void;
}) {
	const [filter, setFilter] = useState<string>('');

	const filterNotes = (notes: any[]) => {
		if (filter.length > 0) {
			return notes.filter((elem) =>
				elem.name
					.substring(0, elem.name.length - 4)
					.toLowerCase()
					.includes(filter.toLowerCase()),
			);
		}
		return notes;
	};

	return (
		<>
			<TextField
				id='search-input'
				placeholder='search'
				size='small'
				sx={{ p: 1 }}
				fullWidth
				value={filter}
				onChange={(e) => setFilter(e.target.value)}
				InputProps={{
					startAdornment: (
						<InputAdornment position='start'>
							<Search />
						</InputAdornment>
					),
				}}
			/>
			<List>
				{filterNotes(notes).map((elem, index) => (
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
