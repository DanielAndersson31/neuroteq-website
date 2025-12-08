import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			out: 'build',
			precompress: true
		}),
		alias: {
			$components: 'src/lib/components',
			$config: 'src/lib/config',
			$schemas: 'src/lib/schemas',
			$utils: 'src/lib/utils',
			$types: 'src/lib/types'
		}
	}
};

export default config;
