import { Routes } from 'discord.js';
import { REST } from '@discordjs/rest';

import { commands } from 'commands';
import { DiscordCommand } from 'types';
import { log } from 'utils';

export const updateCommands = async (guildId: string) => {
	const token = process.env.DISCORD_TOKEN;
	const botId = process.env.BOT_ID;

	if (!token || !botId) return;

	const rest = new REST({ version: '10' }).setToken(token);

	try {
		const discordCommands = (await rest.put(
			Routes.applicationGuildCommands(botId, guildId),
			{
				body: commands,
			},
		)) as DiscordCommand[];
		log.INFO(`Successfully registered ${discordCommands.length} commands!`);
	} catch (error) {
		log.WARN(`Could not register commands.`);
		console.log(error);
	}
};
