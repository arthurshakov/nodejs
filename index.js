// console.log(process.argv);

const yargs = require('yargs/yargs')(process.argv.slice(2));
const pkg = require('./package.json');
const {addNote, printNotes, removeNote, editNote} = require('./notes.controller');

yargs.version(pkg.version);

yargs.command({
	command: 'add',
	describe: 'add new note to list',
	builder: {
		title: {
			type: 'string',
			describe: 'Note title',
			demandOption: true,
		},
	},
	async handler({ title }) {
		await addNote(title);
	}
})

yargs.command({
	command: 'list',
	describe: 'Print all notes',
	async handler() {
		await printNotes();
	}
})

yargs.command({
	command: 'remove',
	describe: 'Removing a note by id',
	builder: {
		id: {
			type: 'string',
			describe: 'Note id to remove',
			demandOption: true,
		},
	},
	async handler({id}) {
		await removeNote(id);
	}
})

yargs.command({
	command: 'edit',
	describe: 'Editing a note by id',
	builder: {
		id: {
			type: 'string',
			describe: 'Note id to edit',
			demandOption: true,
		},
		title: {
			type: 'string',
			describe: 'New title for the edited note',
			demandOption: true,
		},
	},
	async handler({id, title}) {
		await editNote(id, title);
	},
});

yargs.parse();