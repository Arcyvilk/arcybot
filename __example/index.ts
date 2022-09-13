import * as dotenv from 'dotenv';

import Arcybot from '../lib';

import { mock as commandsObject } from './commands/mock';
import { help } from './commands/commands';

dotenv.config();

const commandsFunctions = [help];

const bot = new Arcybot(commandsObject, commandsFunctions, {
	discordToken: process.env.DISCORD_TOKEN,
	botId: process.env.BOT_ID,
});

bot.start();
