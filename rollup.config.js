import alias from '@rollup/plugin-alias';
import typescript from 'rollup-plugin-typescript2';

import path from 'path';

const projectRootDir = path.resolve(__dirname);

export default {
	input: 'lib/index.ts',
	output: [
		{
			dir: 'dist',
			format: 'esm',
			preserveModules: true,
		},
	],
	plugins: [
		alias({
			entries: [
				{
					find: 'lib',
					replacement: path.resolve(projectRootDir, 'lib'),
				},
			],
		}),
		typescript({
			typescript: require('typescript'),
		}),
	],
	external: ['discord.js', '@discordjs/rest'],
};
