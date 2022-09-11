import { IInteraction } from 'types';

const help = async (interaction: IInteraction): Promise<void> => {
	interaction.reply('dupa :3');
};

const mod = (): void => {
	console.log('hehe');
};

export const commands = {
	help,
	mod,
};
