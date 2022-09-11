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
	public command: T;

	constructor(command: T) {
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

	public execute() {
		/** */
	}
}

export class CommandText extends CommandBuilder<ICommandText> {
	public reply(interaction: IInteraction): void {
		const canBeExecuted = this.canBeExecuted(interaction);
		if (!canBeExecuted) return;

		interaction.reply(this.command.text);
	}
}

export class CommandEmbed extends CommandBuilder<ICommandEmbed> {
	public reply(interaction: IInteraction): void {
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

export class CommandFunction extends CommandBuilder<ICommandFunction> {
	public reply(interaction: IInteraction): void {
		const canBeExecuted = this.canBeExecuted(interaction);
		if (!canBeExecuted) return;

		interaction.reply('This command type is not supported yet');
	}
}
