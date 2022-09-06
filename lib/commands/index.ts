import { Command } from 'types/Command';
import { CommandType } from 'utils/constants';

// TODO
// move this command object to database
export const commands: Command[] = [
	{
		keyword: 'text',
		isDisabled: false,
		isModOnly: false,
		description: 'Demonstrates use of a TEXT command.',
		type: CommandType.TEXT,
		text: 'I am a text command!',
	},
	{
		keyword: 'embed',
		isDisabled: false,
		isModOnly: false,
		description: 'Demonstrates use of an EMBED command.',
		type: CommandType.EMBED,
		embed: {
			title: 'This is embed.',
			fields: [
				{
					name: 'First field',
					value: 'Hehe',
				},
				{
					name: 'Second field',
					value: 'Also hehe',
				},
			],
		},
	},
	{
		keyword: 'function',
		isDisabled: false,
		isModOnly: false,
		description: 'Demonstrates use of a FUNCTION command.',
		type: CommandType.FUNCTION,
	},
];
