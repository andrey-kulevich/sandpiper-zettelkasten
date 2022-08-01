import * as React from 'react';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import Delete from '@mui/icons-material/Delete';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';

export default function Content({ noteName }: { noteName: string }) {
	const [markdown, setMarkdown] = useState<string>('');

	const saveNote = () => {
		const filename = markdown.substring(0, markdown.indexOf('\n')).replace('#', '').trim() + '.txt';
		ipcRenderer.invoke('app:on-file-add', { name: filename, data: markdown }).then((res) => console.log(res));
	};

	const deleteNote = () => {
		ipcRenderer.invoke('app:on-file-add', { filename: noteName }).then((res) => console.log(res));
	};

	const actions = [
		{ icon: <SaveIcon />, name: 'Save', onClick: saveNote },
		{ icon: <Delete />, name: 'Delete', onClick: deleteNote },
	];

	useEffect(() => {
		ipcRenderer.invoke('app:on-file-open', noteName).then((data) => {
			setMarkdown(data);
		});

		// save note on hotkey
		document.addEventListener(
			'keydown',
			(event) => {
				if (event.ctrlKey && event.key === 's') saveNote();
			},
			false,
		);
	}, [noteName]);

	return (
		<>
			<SpeedDial
				ariaLabel='SpeedDial basic example'
				sx={{ position: 'absolute', bottom: 16, right: 16 }}
				icon={<SpeedDialIcon />}
			>
				{actions.map((action) => (
					<SpeedDialAction key={action.name} icon={action.icon} tooltipTitle={action.name} onClick={action.onClick} />
				))}
			</SpeedDial>
			<MarkdownEditor
				visible
				minHeight={'100vh'}
				value={markdown}
				onChange={(value, viewUpdate) => setMarkdown(value)}
			/>
		</>
	);
}
