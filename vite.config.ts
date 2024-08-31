import { sveltekit } from '@sveltejs/kit/vite';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		Icons({
			compiler: 'svelte'
		})
	],
	build: {
		rollupOptions: {
			external: ['@resvg/resvg-js', 'css-tree']
		}
	}
});
