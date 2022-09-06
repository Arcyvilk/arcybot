import { CacheType, ChatInputCommandInteraction } from 'discord.js';

import {
	Command,
	CommandText,
	CommandEmbed,
	CommandFunction,
} from 'types/Command';
import { commands } from 'commands';
import { CommandType } from 'utils/constants';
import { EmbedBuilder } from '@discordjs/builders';

/**
 * Decides the future of the command based on its type.
 */
export const executeCommand = async (
	interaction: ChatInputCommandInteraction<CacheType>,
): Promise<void> => {
	const { commandName } = interaction;
	const command: Command | undefined = commands.find(
		c => c.keyword === commandName,
	);

	if (!command) return;

	if (command.type === CommandType.TEXT) {
		executeTextCommand(command, interaction);
	}
	if (command.type === CommandType.EMBED) {
		executeEmbedCommand(command, interaction);
	}
	if (command.type === CommandType.FUNCTION) {
		executeFunctionCommand(command, interaction);
	}
};

/**
 * Executes a text type command based on its parameters.
 */
const executeTextCommand = (
	command: CommandText,
	interaction: ChatInputCommandInteraction<CacheType>,
): void => {
	interaction.reply(command.text);
};

/**
 * Executes an embed type command based on its parameters.
 */
const executeEmbedCommand = (
	command: CommandEmbed,
	interaction: ChatInputCommandInteraction<CacheType>,
): void => {
	const { title, fields, thumbnailImg } = command.embed;
	const embed = new EmbedBuilder()
		.setColor(0xfdc000)
		.setTitle(title)
		.addFields(fields);
	if (thumbnailImg) embed.setImage(thumbnailImg);

	interaction.reply({ embeds: [embed] });
};

/**
 * Executes a function type command based on its parameters.
 */
const executeFunctionCommand = (
	command: CommandFunction,
	interaction: ChatInputCommandInteraction<CacheType>,
): void => {
	interaction.reply(
		`Function commands, including the ${command.keyword.toUpperCase()} are not coded yet`,
	);
};
