import { Routes, SlashCommandBuilder } from 'discord.js';
import { REST } from '@discordjs/rest';
import { ICommand, IInteraction } from './types';

import { CommandType } from 'utils/constants';
import { IDiscordCommand } from 'types';
import { CommandText, CommandEmbed, CommandFunction } from 'CommandBuilder';

import { log } from 'utils';

export type CommandConfig = {
	discordToken?: string;
	botId?: string;
};

export class CommandList {
	public list: (CommandText | CommandEmbed | CommandFunction | undefined)[];

	constructor(
		private rawCommands: ICommand[],
		private fnCommands: Record<string, (interaction: IInteraction) => unknown>,
		private config: CommandConfig,
	) {
		this.rawCommands = rawCommands;
		this.fnCommands = fnCommands;
		this.config = config;
		this.list = this.getList();
	}

	private getList() {
		return this.rawCommands.map(command => {
			if (command.type === CommandType.TEXT) {
				return new CommandText(command);
			}
			if (command.type === CommandType.EMBED) {
				return new CommandEmbed(command);
			}
			if (command.type === CommandType.FUNCTION) {
				const fn = this.fnCommands[command.keyword];
				return new CommandFunction(command, fn);
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
		const token = this.config.discordToken;
		const botId = this.config.botId;

		if (!token || !botId) return;

		const route = Routes.applicationCommands(botId);
		const rest = new REST({ version: '10' }).setToken(token);
		const slashCommands = this.getSlashCommands();

		try {
			const discordCommands = (await rest.put(route, {
				body: slashCommands,
			})) as IDiscordCommand[];
			log.INFO(
				`Successfully registered ${discordCommands.length} global commands!`,
			);
		} catch (error) {
			log.WARN(`Could not register global commands.`);
			console.log(error);
		}
	}

	public execute(interaction: IInteraction) {
		const { commandName } = interaction;
		const Command = this.list.find(c => c?.command.keyword === commandName);

		if (!Command) return;
		Command.execute(interaction);
	}
}
