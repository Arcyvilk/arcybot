import { CommandDictionary, CommandFn } from 'types';

export const createCommandDictionary = (
	fnList: CommandFn[],
): CommandDictionary => {
	return new Map(fnList.map((fn: CommandFn) => [fn.name, fn]));
};
