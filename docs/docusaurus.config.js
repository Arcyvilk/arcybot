// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
	title: 'Arcybot',
	tagline: 'Dinosaurs are cool',
	url: 'https://github.com/Arcyvilk/arcybot',
	baseUrl: '/',
	onBrokenLinks: 'throw',
	onBrokenMarkdownLinks: 'warn',
	favicon: 'img/favicon.ico',
	organizationName: 'Arcyvilk',
	projectName: 'arcybot',
	deploymentBranch: 'gh-pages',
	trailingSlash: false,
	i18n: {
		defaultLocale: 'en',
		locales: ['en'],
	},

	presets: [
		[
			'classic',
			/** @type {import('@docusaurus/preset-classic').Options} */
			({
				docs: {
					routeBasePath: '/arcybot/',
					sidebarPath: require.resolve('./sidebars.js'),
				},
				theme: {
					customCss: require.resolve('./custom.css'),
				},
			}),
		],
	],

	themeConfig:
		/** @type {import('@docusaurus/preset-classic').ThemeConfig} */
		({
			navbar: {
				title: 'Arcybot - Discord bot utils library',
				logo: {
					alt: 'Arcybot Logo',
					src: 'arcybot/img/logo.svg',
					href: '/arcybot',
				},
				items: [
					{
						href: 'https://github.com/Arcyvilk/arcybot',
						label: 'GitHub',
						position: 'right',
					},
				],
			},
			prism: {
				theme: lightCodeTheme,
				darkTheme: darkCodeTheme,
			},
		}),
};

module.exports = config;