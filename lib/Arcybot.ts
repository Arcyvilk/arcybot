import { Client, GatewayIntentBits } from 'discord.js';

import { createCommandDictionary, log } from 'utils';
import { CommandObject } from 'types';

import { CommandFn, CommandList } from 'CommandList';

export type ArcybotConfig = {
	discordToken?: string;
	botId?: string;
};

export class Arcybot {
	private _bot: Client;
	private _config: ArcybotConfig;
	private _commands: CommandList;

	constructor(
		commandsObject: CommandObject[],
		commandsFunctions: CommandFn[],
		config: ArcybotConfig,
	) {
		this._config = config;
		this._bot = new Client({ intents: [GatewayIntentBits.Guilds] });

		const commandsDictionary = createCommandDictionary(commandsFunctions);

		this._commands = new CommandList(commandsObject, commandsDictionary, {
			discordToken: process.env.DISCORD_TOKEN,
			botId: process.env.BOT_ID,
		});
	}

	public get botClient() {
		return this._bot;
	}

	public get commands() {
		return this._commands;
	}

	public start(loginMessage = 'Arcybot started!') {
		this._bot.login(this._config.discordToken);

		this._bot.once('ready', () => {
			log.INFO(loginMessage);
			this._commands.register();
		});

		this._bot.on('interactionCreate', async interaction => {
			if (interaction.isChatInputCommand()) {
				this._commands.execute(interaction);
			}
		});
	}
}
