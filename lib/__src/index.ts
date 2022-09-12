import { Client, GatewayIntentBits } from 'discord.js';
import * as dotenv from 'dotenv';

import { CommandList } from 'CommandList';
import { createCommandDictionary, log } from 'utils';

import { mock as rawCommands } from '__src/commands/mock';
import { help } from '__src/commands/commands';

dotenv.config();

const bot = new Client({ intents: [GatewayIntentBits.Guilds] });

const fnCommands = createCommandDictionary([help]);

const Commands = new CommandList(rawCommands, fnCommands, {
	discordToken: process.env.DISCORD_TOKEN,
	botId: process.env.BOT_ID,
});

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
