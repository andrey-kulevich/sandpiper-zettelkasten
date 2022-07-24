import * as React from 'react';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { useEffect, useState } from 'react';
import { ipcRenderer } from 'electron';

export default function Content() {
	const [markdown, setMarkdown] = useState<string>('');

	const actions = [
		{ icon: <FileCopyIcon />, name: 'Copy', onClick: () => {} },
		{
			icon: <SaveIcon />,
			name: 'Save',
			onClick: () => {
				ipcRenderer.invoke('app:on-file-add', { name: 'bla.txt', data: markdown }).then((res) => console.log(res));
			},
		},
		{ icon: <PrintIcon />, name: 'Print', onClick: () => {} },
		{ icon: <ShareIcon />, name: 'Share', onClick: () => {} },
	];

	useEffect(() => {
		ipcRenderer.invoke('app:on-file-open', 'bla.txt').then((data) => {
			setMarkdown(data);
		});
	}, []);

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
