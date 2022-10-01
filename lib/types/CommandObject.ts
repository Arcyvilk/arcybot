import { CustomEmbed } from 'types';
import { CommandType } from 'utils/constants';

export type BaseCommandObject = {
	keyword: string;
	description: string;
	type: CommandType;
	isDisabled?: boolean;
	isModOnly?: boolean;
	canUseInDm?: boolean;
	refusalText?: string;
	category?: string;
};

export interface CommandObjectText extends Omit<BaseCommandObject, 'type'> {
	type: CommandType.TEXT;
	text: string;
}

export interface CommandObjectFunction extends Omit<BaseCommandObject, 'type'> {
	type: CommandType.FUNCTION | CommandType.CUSTOM;
}

export interface CommandObjectEmbed extends Omit<BaseCommandObject, 'type'> {
	type: CommandType.EMBED;
	embed: CustomEmbed;
}

export type CommandObject =
	| CommandObjectText
	| CommandObjectFunction
	| CommandObjectEmbed;
