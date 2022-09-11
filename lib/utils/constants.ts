export enum CommandType {
	TEXT = 'text',
	EMBED = 'embed',
	FUNCTION = 'function',
}

export enum Color {
	MAIN = 'FDC000',
	JOIN = '51E61C',
	LEAVE = 'C70000',
	EDIT = '83C4F2',
	DELETE = 'C70000',
	DESCRIPTION = '8442F5',
}

export enum CommandDisabled {
	MOD_ONLY = 'This command can be used only by people with specified role.',
	DISABLED = 'This command is temporarily disabled.',
}
