export type CustomEmbed = {
	title: string;
	thumbnailImg?: string;
	fields: EmbedField[];
};

export type EmbedField = {
	name: string;
	value: string;
};
