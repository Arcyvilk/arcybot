import { Client, GatewayIntentBits } from 'discord.js';
import * as dotenv from 'dotenv';

import { executeCommand, updateCommands } from 'utils/commands';
import { log } from 'utils';

dotenv.config();

const bot = new Client({ intents: [GatewayIntentBits.Guilds] });
const guildId = '234740225782317057'; // ArcyTesting - mock guild id

bot.once('ready', () => {
	log.INFO('Ready!');
	updateCommands(guildId);
});

bot.on('interactionCreate', async interaction => {
	if (interaction.isChatInputCommand()) {
		executeCommand(interaction);
	}
});

bot.login(process.env.DISCORD_TOKEN);
