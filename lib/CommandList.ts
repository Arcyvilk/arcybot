import { Routes, SlashCommandBuilder } from 'discord.js';
import { REST } from '@discordjs/rest';
import { ICommand, IInteraction } from './types';

import { CommandType } from 'utils/constants';
import { IDiscordCommand } from 'types';
import { CommandText, CommandEmbed, CommandFunction } from 'CommandBuilder';

import { log } from 'utils';

export class CommandList {
	private rawCommands: ICommand[];
	public list: (CommandText | CommandEmbed | CommandFunction | undefined)[];

	constructor(commands: ICommand[]) {
		this.rawCommands = commands;
		this.list = this.getList(commands);
	}

	private getList(commands: ICommand[]) {
		return commands.map(command => {
			if (command.type === CommandType.TEXT) {
				return new CommandText(command);
			}
			if (command.type === CommandType.EMBED) {
				return new CommandEmbed(command);
			}
			if (command.type === CommandType.FUNCTION) {
				return new CommandFunction(command);
			}
		});
	}

	private getSlashCommands() {
		return this.rawCommands
			.map(command => {
				const description = command.isDisabled
					? `[DISABLED] ${command.description}`
					: command.description;
				return new SlashCommandBuilder()
					.setName(command.keyword)
					.setDescription(description)
					.setDMPermission(command.canUseInDm ?? false);
			})
			.map(command => command.toJSON());
	}

	public async register() {
		const token = process.env.DISCORD_TOKEN;
		const botId = process.env.BOT_ID;

		if (!token || !botId) return;

		const route = Routes.applicationCommands(botId);
		const rest = new REST({ version: '10' }).setToken(token);
		const slashCommands = this.getSlashCommands();

		try {
			const discordCommands = (await rest.put(route, {
				body: slashCommands,
			})) as IDiscordCommand[];
			log.INFO(`Successfully registered ${discordCommands.length} commands!`);
		} catch (error) {
			log.WARN(`Could not register commands.`);
			console.log(error);
		}
	}

	public execute(interaction: IInteraction) {
		const { commandName } = interaction;
		const Command = this.list.find(c => c?.command.keyword === commandName);

		if (!Command) return;
		Command.reply(interaction);
	}
}
