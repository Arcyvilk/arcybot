import { CacheType, ChatInputCommandInteraction } from 'discord.js';

export type IDiscordCommand = {
	id: string;
	application_id: string;
	version: string;
	default_permission: boolean;
	default_member_permissions: null; // TODO
	type: number;
	name: string;
	name_localizations: null; // TODO
	description: string;
	description_localizations: null; // TODO
	guild_id: string;
};

export type IInteraction = ChatInputCommandInteraction<CacheType>;
