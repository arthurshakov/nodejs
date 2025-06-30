const fs = require('fs/promises');
const path = require('path');
const chalk = require('chalk');

const notesPath = path.join(__dirname, 'db.json');

async function addNote(title) {
	// const notes = require('./db.json');
	// const buffer = await fs.readFile(notesPath);
	// const notes = Buffer.from(buffer).toString('utf-8');
	const notes = await getNotes();

	const note = {
		title,
		id: Date.now().toString(),
	}

	notes.push(note);

	await fs.writeFile(notesPath, JSON.stringify(notes));

	console.log(chalk.green('Note was added'));
}

async function getNotes() {
	// return require('./db.json');
	const notesJSON = await fs.readFile(notesPath, {encoding: 'utf-8'});
	const notes = JSON.parse(notesJSON);

	return Array.isArray(notes) ? notes : [];
}

async function printNotes() {
	const notes = await getNotes();

	console.log(chalk.bgBlue('Here is the list of notes'));

	notes.forEach(note => {
		console.log(chalk.blue(note.title));
	});
}

async function removeNote(noteId) {
	const notes = await getNotes();

	const noteIndex = notes.findIndex(({id}) => id === noteId);

	if (noteIndex === -1) {
		console.log(chalk.red(`Note with id "${noteId}" not found!`));
		return;
	}

	const removedNote = notes.splice(noteIndex, 1)[0];

	await fs.writeFile(notesPath, JSON.stringify(notes));

	console.log(chalk.green(`Note "${removedNote.title}" (ID: ${noteId}) was removed!`));
}

module.exports = {
	addNote, printNotes, removeNote,
}