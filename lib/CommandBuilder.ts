import { EmbedBuilder } from 'discord.js';

import { CommandDisabled } from 'utils/constants';
import {
	CommandFn,
	CommandObject,
	CommandObjectEmbed,
	CommandObjectText,
	CommandObjectFunction,
	DiscordInteraction,
} from 'types';

abstract class CommandBuilder<T extends CommandObject> {
	constructor(public command: T) {
		this.command = command;
	}

	public canBeExecuted(interaction: DiscordInteraction): boolean {
		if (this.command.isDisabled) {
			interaction.reply({ content: CommandDisabled.DISABLED, ephemeral: true });
			return false;
		}
		if (this.command.isModOnly) {
			// check if user has the correct role
			console.log(interaction.member?.roles);
			interaction.reply({ content: CommandDisabled.MOD_ONLY, ephemeral: true });
			return false;
		}
		return true;
	}
}

export class TextCommand extends CommandBuilder<CommandObjectText> {
	public execute(interaction: DiscordInteraction): void {
		const canBeExecuted = this.canBeExecuted(interaction);
		if (!canBeExecuted) return;

		interaction.reply(this.command.text);
	}
}

export class EmbedCommand extends CommandBuilder<CommandObjectEmbed> {
	public execute(interaction: DiscordInteraction): void {
		const canBeExecuted = this.canBeExecuted(interaction);
		if (!canBeExecuted) return;

		const { title, fields, thumbnailImg } = this.command.embed;
		const embed = new EmbedBuilder()
			.setColor(0xfdc000)
			.setTitle(title)
			.addFields(fields);
		if (thumbnailImg) embed.setImage(thumbnailImg);
		interaction.reply({ embeds: [embed] });
	}
}

export class FunctionCommand extends CommandBuilder<CommandObjectFunction> {
	constructor(
		command: CommandObjectFunction,
		private commandFn: CommandFn | undefined,
	) {
		super(command);
		this.commandFn = commandFn;
	}

	public execute(interaction: DiscordInteraction): void {
		if (!this.commandFn) {
			interaction.reply('This command is registered, but not configured.');
			return;
		}
		const canBeExecuted = this.canBeExecuted(interaction);
		if (!canBeExecuted) return;

		this.commandFn(interaction);
	}
}
