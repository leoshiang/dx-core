import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// 模擬 __filename
const __filename = fileURLToPath(import.meta.url);

// 模擬 __dirname
const __dirname = dirname(__filename);

console.log(__dirname);
export default {
	mode: 'production',
	entry: './index.js',
	output: {
		filename: 'index.bundle.js',
		path: path.resolve(__dirname, 'lib'),
	},
	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader?plugins=rewire',
					options: {
						presets: ['@babel/preset-env'],
					},
				},
			},
		],
	},
	resolve: {
		fallback: {
			'fs': false,
			'os': false,
		},
	},
};
