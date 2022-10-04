import { DiscordInteraction } from 'types';

export type CommandFn = (interaction: DiscordInteraction) => unknown;
export type CommandDictionary = Map<string, CommandFn>;
