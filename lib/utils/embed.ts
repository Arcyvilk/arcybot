import { APIEmbed } from 'discord.js';

type CustomEmbed = {
	embeds: APIEmbed[];
	ephemeral?: boolean;
};

export const getSuccessEmbed = (
	title: string,
	message: string,
	ephemeral?: boolean,
): CustomEmbed => ({
	embeds: [
		{
			title: `✅ ${title}`,
			fields: [{ name: '---', value: message }],
		},
	],
	ephemeral: !!ephemeral,
});

export const getAwaitEmbed = (
	title: string,
	message: string,
	ephemeral?: boolean,
): CustomEmbed => ({
	embeds: [
		{
			title: `⏳ ${title}`,
			fields: [{ name: '---', value: message }],
		},
	],
	ephemeral: !!ephemeral,
});

export const getInfoEmbed = (
	title: string,
	message: string,
	ephemeral?: boolean,
): CustomEmbed => ({
	embeds: [
		{
			title: `ℹ️ ${title}`,
			fields: [{ name: '---', value: message }],
		},
	],
	ephemeral: !!ephemeral,
});

export const getWarningEmbed = (
	title: string,
	message: string,
	ephemeral?: boolean,
): CustomEmbed => ({
	embeds: [
		{
			title: `⚠️ ${title}`,
			fields: [{ name: '---', value: message }],
		},
	],
	ephemeral: !!ephemeral,
});

export const getErrorEmbed = (
	title: string,
	message: string,
	ephemeral?: boolean,
): CustomEmbed => ({
	embeds: [
		{
			title: `❌ ${title}`,
			fields: [{ name: '---', value: message }],
		},
	],
	ephemeral: !!ephemeral,
});
