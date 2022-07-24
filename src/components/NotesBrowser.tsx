import * as React from 'react';
import { InputAdornment, List, ListItem, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';

export default function NotesBrowser() {
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
				<ListItem>sdsdsd</ListItem>
				<ListItem>sdsdsd</ListItem>
				<ListItem>sdsdsd</ListItem>
				<ListItem>sdsdsd</ListItem>
				<ListItem>sdsdsd</ListItem>
			</List>
		</>
	);
}
