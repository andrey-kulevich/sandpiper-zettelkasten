import path from 'path';
import fs from 'fs-extra';
import os from 'os';
import chokidar from 'chokidar';
import { app } from 'electron';

// get application directory
const appDir = path.resolve(app.getAppPath(), 'knowledge_base');

export const getFiles = () => {
	fs.ensureDirSync(appDir);
	const files = fs.readdirSync(appDir);
	return files.map((filename) => {
		const filePath = path.resolve(appDir, filename);
		const fileStats = fs.statSync(filePath);
		return {
			name: filename,
			path: filePath,
			size: Number(fileStats.size / 1000).toFixed(1), // kb
		};
	});
};

export const addFile = (file: any) => {
	// ensure `appDir` exists
	fs.ensureDirSync(appDir);
	let filePath = path.resolve(appDir, file.name);
	if (file.updateName) {
		fs.renameSync(filePath, appDir + file.updateName);
		filePath = path.resolve(appDir, file.updateName);
	}
	if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, file.data);
};

export const deleteFile = (filename: string) => {
	const filePath = path.resolve(appDir, filename);
	if (fs.existsSync(filePath)) fs.removeSync(filePath);
};

export const readFile = (filename: string) => {
	const filePath = path.resolve(appDir, filename);
	if (fs.existsSync(filePath)) {
		return fs.readFileSync(filePath, 'utf8');
	}
};

export const watchFiles = (win: any) => {
	chokidar.watch(appDir).on('unlink', (filepath) => {
		win.webContents.send('app:delete-file', path.parse(filepath).base);
	});
};
