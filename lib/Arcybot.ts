import { Client, GatewayIntentBits, SlashCommandBuilder } from 'discord.js';

import { createCommandDictionary, log } from 'utils';
import { CommandFn, CommandObject } from 'types';

import { CommandList } from 'CommandList';

export type ArcybotConfig = {
	discordToken?: string;
	botId?: string;
	modRole?: string;
	guildId?: string;
};

export class Arcybot {
	private _bot: Client;
	private _commands: CommandList;

	constructor(
		private config: ArcybotConfig,
		commandsObject: CommandObject[],
		commandsFunctions: CommandFn[],
		customCommands?: SlashCommandBuilder[],
	) {
		this._bot = new Client({ intents: [GatewayIntentBits.Guilds] });

		const commandsDictionary = createCommandDictionary(commandsFunctions);

		this._commands = new CommandList(
			this.config,
			commandsObject,
			commandsDictionary,
			customCommands,
		);
	}

	public get botClient() {
		return this._bot;
	}

	public get commands() {
		return this._commands;
	}

	public start(loginMessage = 'Arcybot started!') {
		this._bot.login(this.config.discordToken);

		this._bot.once('ready', () => {
			log.INFO(loginMessage);
			this._commands.register();
		});

		this._bot.on('interactionCreate', async interaction => {
			if (interaction.isChatInputCommand()) {
				this._commands.execute(interaction, this.config.modRole);
			}
		});
	}
}
