import * as React from 'react';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import Delete from '@mui/icons-material/Delete';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';
import { Add } from '@mui/icons-material';
import { NotificationContext } from '../App';

export default function Content({
	noteName,
	setNoteName,
	notes,
}: {
	noteName: string;
	setNoteName: (name: string) => void;
	notes: any[];
}) {
	const [markdown, setMarkdown] = useState<string>('');
	const notify = React.useContext(NotificationContext);

	const saveNote = () => {
		const filename = markdown.substring(0, markdown.indexOf('\n')).replace('#', '').trim() + '.txt';
		const isUpdateName = noteName.length > 0 && filename !== noteName;
		ipcRenderer
			.invoke('app:on-file-add', {
				name: isUpdateName ? noteName : filename,
				data: markdown,
				updateName: isUpdateName ? filename : undefined,
			})
			.then(notify('Zettelkasten saved'));
	};

	const deleteNote = () => {
		ipcRenderer.invoke('app:on-file-delete', noteName).then(notify('Zettelkasten deleted'));
	};

	const newNote = () => {
		setMarkdown(
			'# ' +
				(Number(notes[notes.length - 1].name[0]) + 1) +
				' Название заметки\n' +
				'#разное #жизнь\n' +
				'\n' +
				'Описание заметки.\n' +
				'### Ссылки\n' +
				'- [1 Zettelkasten прекрасен](1)',
		);
		setNoteName('');
	};

	const actions = [
		{ icon: <Add />, name: 'New Note', onClick: newNote },
		{ icon: <SaveIcon />, name: 'Save', onClick: saveNote },
		{ icon: <Delete />, name: 'Delete', onClick: deleteNote },
	];

	const saveNoteOnKeydown = (event: KeyboardEvent) => {
		if (event.ctrlKey && event.key === 's') saveNote();
	};

	useEffect(() => {
		if (noteName.length > 0) {
			ipcRenderer.invoke('app:on-file-open', noteName).then((data) => {
				setMarkdown(data);
			});
		}
		// save note on hotkey
		document.addEventListener('keydown', saveNoteOnKeydown, false);
		return () => document.removeEventListener('keydown', saveNoteOnKeydown, false);
	}, [noteName]);

	return (
		<>
			<SpeedDial ariaLabel='options' sx={{ position: 'absolute', bottom: 16, right: 16 }} icon={<SpeedDialIcon />}>
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
