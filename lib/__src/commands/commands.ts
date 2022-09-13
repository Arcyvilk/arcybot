import { DiscordInteraction } from 'types';

export const help = async (interaction: DiscordInteraction): Promise<void> => {
	interaction.reply('Im helping :3');
};
