import { Client, GatewayIntentBits } from 'discord.js';
import * as dotenv from 'dotenv';

import { log } from 'utils';

import { commands } from '__src/commands';
import { CommandList } from 'CommandList';

dotenv.config();

const bot = new Client({ intents: [GatewayIntentBits.Guilds] });
const Commands = new CommandList(commands);

bot.once('ready', () => {
	log.INFO('Ready!');
	Commands.register();
});

bot.on('interactionCreate', async interaction => {
	if (interaction.isChatInputCommand()) {
		Commands.execute(interaction);
	}
});

bot.login(process.env.DISCORD_TOKEN);
