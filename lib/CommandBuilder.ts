import { CommandFn } from 'CommandList';
import { EmbedBuilder } from 'discord.js';
import { CommandDisabled } from 'utils/constants';
import {
	ICommand,
	ICommandEmbed,
	ICommandText,
	ICommandFunction,
	IInteraction,
} from './types';

abstract class CommandBuilder<T extends ICommand> {
	constructor(public command: T) {
		this.command = command;
	}

	public canBeExecuted(interaction: IInteraction): boolean {
		if (this.command.isDisabled) {
			interaction.reply(CommandDisabled.DISABLED);
			return false;
		}
		if (this.command.isModOnly) {
			// check if user has the correct role
			console.log(interaction.member?.roles);
			interaction.reply(CommandDisabled.MOD_ONLY);
			return false;
		}
		return true;
	}
}

export class TextCommand extends CommandBuilder<ICommandText> {
	public execute(interaction: IInteraction): void {
		const canBeExecuted = this.canBeExecuted(interaction);
		if (!canBeExecuted) return;

		interaction.reply(this.command.text);
	}
}

export class EmbedCommand extends CommandBuilder<ICommandEmbed> {
	public execute(interaction: IInteraction): void {
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

export class FunctionCommand extends CommandBuilder<ICommandFunction> {
	constructor(command: ICommandFunction, private commandFn: CommandFn) {
		super(command);
		this.commandFn = commandFn;
	}

	public execute(interaction: IInteraction): void {
		if (!this.commandFn) {
			interaction.reply('This command is registered, but not configured.');
			return;
		}
		const canBeExecuted = this.canBeExecuted(interaction);
		if (!canBeExecuted) return;

		this.commandFn(interaction);
	}
}
