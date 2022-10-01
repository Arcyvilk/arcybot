import * as dotenv from 'dotenv';

import { Arcybot } from '../lib';

import { mock as commandsObject } from './commands/mock';
import { foo } from './commands/commands';

dotenv.config();

const commandsFunctions = [foo];

const bot = new Arcybot(commandsObject, commandsFunctions, {
	discordToken: process.env.DISCORD_TOKEN,
	botId: process.env.BOT_ID,
});

bot.start('Bot started!');
