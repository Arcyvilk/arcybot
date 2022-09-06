import { Routes } from 'discord.js';
import { REST } from '@discordjs/rest';

import { getSlashCommands } from './getSlashCommands';
import { DiscordCommand } from 'types';
import { log } from 'utils';

/**
 * Gets the list of slash commands.
 * Updates the guild by given guild ID with the new commands.
 */
export const updateCommands = async (guildId: string) => {
	const token = process.env.DISCORD_TOKEN;
	const botId = process.env.BOT_ID;

	if (!token || !botId) return;

	const route = Routes.applicationGuildCommands(botId, guildId);
	const rest = new REST({ version: '10' }).setToken(token);
	const slashCommands = getSlashCommands();

	try {
		const discordCommands = (await rest.put(route, {
			body: slashCommands,
		})) as DiscordCommand[];
		log.INFO(`Successfully registered ${discordCommands.length} commands!`);
	} catch (error) {
		log.WARN(`Could not register commands.`);
		console.log(error);
	}
};
