import * as dotenv from 'dotenv';

import Arcybot from '../';

import { mock as commandsObject } from '__src/commands/mock';
import { help } from '__src/commands/commands';

dotenv.config();

const commandsFunctions = [help];

const bot = new Arcybot(commandsObject, commandsFunctions, {
	discordToken: process.env.DISCORD_TOKEN,
	botId: process.env.BOT_ID,
});

bot.start();
