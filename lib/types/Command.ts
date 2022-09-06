import { CustomEmbed } from 'types/Embed';
import { CommandType } from 'utils/constants';

export type BaseCommand = {
	keyword: string;
	description: string;
	type: CommandType;
	isDisabled?: boolean;
	isModOnly?: boolean;
	canUseInDm?: boolean;
	refusalText?: string;
	category?: string;
};

export interface CommandText extends Omit<BaseCommand, 'type'> {
	type: CommandType.TEXT;
	text: string;
}

export interface CommandFunction extends Omit<BaseCommand, 'type'> {
	type: CommandType.FUNCTION;
}

export interface CommandEmbed extends Omit<BaseCommand, 'type'> {
	type: CommandType.EMBED;
	embed: CustomEmbed;
}

export type Command = CommandText | CommandFunction | CommandEmbed;
