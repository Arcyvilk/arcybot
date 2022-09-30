import { Routes, SlashCommandBuilder } from 'discord.js';
import { REST } from '@discordjs/rest';
import { ArcybotConfig } from '.';

import { log, CommandType } from 'utils';
import { CommandObject, DiscordInteraction, DiscordCommand } from 'types';

import { TextCommand, EmbedCommand, FunctionCommand } from 'CommandBuilder';

export type CommandFn = (interaction: DiscordInteraction) => unknown;
export type CommandDictionary = Map<string, CommandFn>;

export class CommandList {
	public list: (TextCommand | EmbedCommand | FunctionCommand | undefined)[];

	constructor(
		private commandsObject: CommandObject[],
		private commandsDictionary: CommandDictionary,
		private config: ArcybotConfig,
	) {
		this.commandsObject = commandsObject;
		this.commandsDictionary = commandsDictionary;
		this.config = config;
		this.list = this.getList();
	}

	private getList() {
		return this.commandsObject.map(command => {
			if (command.type === CommandType.TEXT) {
				return new TextCommand(command);
			}
			if (command.type === CommandType.EMBED) {
				return new EmbedCommand(command);
			}
			if (command.type === CommandType.FUNCTION) {
				const fn = this.commandsDictionary.get(command.keyword);
				return new FunctionCommand(command, fn);
			}
		});
	}

	private getSlashCommands() {
		return this.commandsObject
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
			})) as DiscordCommand[];
			log.INFO(
				`Successfully registered ${discordCommands.length} global commands!`,
			);
		} catch (error) {
			log.WARN(`Could not register global commands.`);
			console.log(error);
		}
	}

	public execute(interaction: DiscordInteraction) {
		const { commandName } = interaction;
		const Command = this.list.find(c => c?.command.keyword === commandName);

		if (!Command) return;
		Command.execute(interaction);
	}
}
