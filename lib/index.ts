import { Client, GatewayIntentBits } from 'discord.js';
import * as dotenv from 'dotenv';

import { log, updateCommands } from 'utils';

dotenv.config();

const bot = new Client({ intents: [GatewayIntentBits.Guilds] });
const guildId = '234740225782317057'; // ArcyTesting - mock guild id

bot.once('ready', () => {
	log.INFO('Ready!');
	updateCommands(guildId);
});

bot.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const { commandName } = interaction;

	if (commandName === 'ping') {
		await interaction.reply('Pong!');
	} else if (commandName === 'server') {
		await interaction.reply('Server info.');
	} else if (commandName === 'user') {
		await interaction.reply('User info.');
	}
});

bot.login(process.env.DISCORD_TOKEN);
