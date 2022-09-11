import { ICustomEmbed } from 'types';
import { CommandType } from 'utils/constants';

export type IBaseCommand = {
	keyword: string;
	description: string;
	type: CommandType;
	isDisabled?: boolean;
	isModOnly?: boolean;
	canUseInDm?: boolean;
	refusalText?: string;
	category?: string;
};

export interface ICommandText extends Omit<IBaseCommand, 'type'> {
	type: CommandType.TEXT;
	text: string;
}

export interface ICommandFunction extends Omit<IBaseCommand, 'type'> {
	type: CommandType.FUNCTION;
}

export interface ICommandEmbed extends Omit<IBaseCommand, 'type'> {
	type: CommandType.EMBED;
	embed: ICustomEmbed;
}

export type ICommand = ICommandText | ICommandFunction | ICommandEmbed;
