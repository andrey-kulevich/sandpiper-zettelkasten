import * as React from 'react';
import { SpeedDial, SpeedDialAction, SpeedDialIcon } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { useState } from 'react';

//const fs = window.require('fs');
//const pathModule = window.require('path');
//const { app } = window.require('@electron/remote');

//console.log(app);

const actions = [
	{ icon: <FileCopyIcon />, name: 'Copy', onClick: () => {} },
	{ icon: <SaveIcon />, name: 'Save', onClick: () => {} },
	{ icon: <PrintIcon />, name: 'Print', onClick: () => {} },
	{ icon: <ShareIcon />, name: 'Share', onClick: () => {} },
];

export default function Content() {
	const [markdown, setMarkdown] = useState<string>('');

	// const foo = () => {
	// 	fs.readdir('/', (e: any, files: any) => {
	// 		// On error, show and return error
	// 		if (e) return console.error(e);
	//
	// 		console.log(files);
	// 	});
	// };

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
				minHeight={'100vh'}
				value='# This is a H1  \n## This is a H2  \n###### This is a H6'
				onChange={(value, viewUpdate) => setMarkdown(value)}
			/>
		</>
	);
}
