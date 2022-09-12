import { CommandDictionary, CommandFn } from 'CommandList';

export const createCommandDictionary = (
	fnList: CommandFn[],
): CommandDictionary => {
	return new Map(fnList.map((fn: CommandFn) => [fn.name, fn]));
};
