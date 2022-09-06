import { Client, GatewayIntentBits } from 'discord.js';
import * as dotenv from 'dotenv';

import { log } from 'utils';

dotenv.config();

const bot = new Client({ intents: [GatewayIntentBits.Guilds] });

bot.once('ready', () => {
	log.INFO('Ready!');
});

bot.login(process.env.DISCORD_TOKEN);
