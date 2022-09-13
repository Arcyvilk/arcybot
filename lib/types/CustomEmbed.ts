export type CustomEmbed = {
	title: string;
	thumbnailImg?: string;
	fields: CustomEmbedField[];
};

export type CustomEmbedField = {
	name: string;
	value: string;
};
