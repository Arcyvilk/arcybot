import { Routes, SlashCommandBuilder } from 'discord.js';
import { REST } from '@discordjs/rest';

import { CommandType } from 'utils/constants';
import { ICommand, IInteraction, IDiscordCommand } from 'types';
import { TextCommand, EmbedCommand, FunctionCommand } from 'CommandBuilder';

import { log } from 'utils';

export type CommandConfig = {
	discordToken?: string;
	botId?: string;
};

export type CommandFn = (interaction: IInteraction) => unknown;

export type CommandDictionary = Map<string, CommandFn>;

export class CommandList {
	public list: (TextCommand | EmbedCommand | FunctionCommand | undefined)[];

	constructor(
		private rawCommands: ICommand[],
		private fnCommands: CommandDictionary,
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
				return new TextCommand(command);
			}
			if (command.type === CommandType.EMBED) {
				return new EmbedCommand(command);
			}
			if (command.type === CommandType.FUNCTION) {
				const fn = this.fnCommands.get(command.keyword);
				return new FunctionCommand(command, fn);
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
