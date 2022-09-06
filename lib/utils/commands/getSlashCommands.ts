import { SlashCommandBuilder } from 'discord.js';
import { commands } from 'commands';

export const getSlashCommands = () => {
	return commands
		.map(command => {
			return new SlashCommandBuilder()
				.setName(command.keyword)
				.setDescription(command.description)
				.setDMPermission(command.canUseInDm ?? false);
		})
		.map(command => command.toJSON());
};
