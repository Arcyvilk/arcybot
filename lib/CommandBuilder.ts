import { EmbedBuilder, GuildMemberRoleManager, Role } from 'discord.js';

import { CommandDisabled } from 'utils/constants';
import {
	CommandFn,
	CommandObject,
	CommandObjectEmbed,
	CommandObjectText,
	CommandObjectFunction,
	DiscordInteraction,
} from 'types';
import { getErrorEmbed } from 'index';

abstract class CommandBuilder<T extends CommandObject> {
	constructor(public command: T) {
		this.command = command;
	}

	public canBeExecuted(
		interaction: DiscordInteraction,
		modRole?: string,
	): boolean {
		if (this.command.isDisabled) {
			interaction.reply(getErrorEmbed('Error', CommandDisabled.DISABLED, true));
			return false;
		}
		if (modRole && this.command.isModOnly && interaction.inGuild()) {
			const isMod = (
				interaction?.member.roles as GuildMemberRoleManager
			).cache.some((role: Role) => role.name === modRole);
			if (!isMod) {
				interaction.reply(
					getErrorEmbed('Error', CommandDisabled.MOD_ONLY, true),
				);
				return false;
			}
		}
		return true;
	}
}

export class TextCommand extends CommandBuilder<CommandObjectText> {
	public execute(interaction: DiscordInteraction): void {
		interaction.reply(this.command.text);
	}
}

export class EmbedCommand extends CommandBuilder<CommandObjectEmbed> {
	public execute(interaction: DiscordInteraction): void {
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
			interaction.reply(
				getErrorEmbed(
					'Cannot execute this command',
					'This command is registered, but not configured.',
					true,
				),
			);
			return;
		}
		this.commandFn(interaction);
	}
}
