export type ICustomEmbed = {
	title: string;
	thumbnailImg?: string;
	fields: IEmbedField[];
};

export type IEmbedField = {
	name: string;
	value: string;
};
