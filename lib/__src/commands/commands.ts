import { IInteraction } from 'types';

export const help = async (interaction: IInteraction): Promise<void> => {
	interaction.reply('Im helping :3');
};
