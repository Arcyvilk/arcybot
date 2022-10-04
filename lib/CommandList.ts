import { Routes, SlashCommandBuilder } from 'discord.js';
import { REST } from '@discordjs/rest';
import { ArcybotConfig } from '.';

import { log, CommandType } from 'utils';
import {
	CommandObject,
	CommandDictionary,
	DiscordInteraction,
	DiscordCommand,
} from 'types';

import { TextCommand, EmbedCommand, FunctionCommand } from 'CommandBuilder';

export class CommandList {
	public list: (TextCommand | EmbedCommand | FunctionCommand | undefined)[];

	constructor(
		private config: ArcybotConfig,
		private commandsObject: CommandObject[],
		private commandsDictionary: CommandDictionary,
		private customCommands?: SlashCommandBuilder[],
	) {
		this.list = this.getList();
	}

	/**
	 * Creates a list of command objects.
	 * @returns
	 */
	private getList() {
		return this.commandsObject.map(command => {
			if (command.type === CommandType.TEXT) {
				return new TextCommand(command);
			}
			if (command.type === CommandType.EMBED) {
				return new EmbedCommand(command);
			}
			if (
				command.type === CommandType.FUNCTION ||
				command.type === CommandType.CUSTOM
			) {
				const fn = this.commandsDictionary.get(command.keyword);
				return new FunctionCommand(command, fn);
			}
		});
	}

	/**
	 * Creates a list of basic slash commands, built from the command types TEXT, EMBED or FUNCTION.
	 * @returns SlashCommandBuilder[]
	 */
	private getBasicSlashCommands() {
		return this.commandsObject
			.filter(command => command.type !== CommandType.CUSTOM)
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

	/**
	 * Creates a list of custom commands, built from command type CUSTOM.
	 * @returns SlashCommandBuilder[]
	 */
	private getCustomSlashCommands() {
		const customSlashCommands = this.commandsObject
			.filter(command => command.type === CommandType.CUSTOM)
			.map(command => {
				const description = command.isDisabled
					? `[DISABLED] ${command.description}`
					: command.description;
				const customCommand = this.customCommands?.find(
					c => c.name === command.keyword,
				);
				if (customCommand)
					return customCommand
						.setName(command.keyword)
						.setDescription(description)
						.setDMPermission(command.canUseInDm ?? false);
			})
			.map(command => (command ? command.toJSON() : undefined))
			.filter(Boolean);
		return customSlashCommands;
	}

	/**
	 * Merges basic commands with custom ones.
	 * @returns SlashCommandBuilder[]
	 */
	private getSlashCommands() {
		return [...this.getBasicSlashCommands(), ...this.getCustomSlashCommands()];
	}

	/**
	 * Registers all commands as global Discord commands.
	 * @returns
	 */
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

	/**
	 * If a command is of executable type, executes it.
	 * @param interaction DiscordInteraction
	 * @returns void
	 */
	public execute(interaction: DiscordInteraction) {
		const { commandName } = interaction;
		const Command = this.list.find(c => c?.command.keyword === commandName);

		if (!Command) return;
		Command.execute(interaction);
	}
}
