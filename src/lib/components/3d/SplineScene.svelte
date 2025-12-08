<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Application } from '@splinetool/runtime';

	interface Props {
		url?: string;
		class?: string;
	}

	let { url = '', class: className = '' }: Props = $props();

	let canvas: HTMLCanvasElement;
	let app: Application | null = null;
	let loading = $state(true);
	let error = $state(false);

	onMount(async () => {
		if (!url) {
			loading = false;
			return;
		}

		try {
			app = new Application(canvas);
			await app.load(url);
			loading = false;
		} catch (e) {
			console.error('Failed to load Spline scene:', e);
			error = true;
			loading = false;
		}
	});

	onDestroy(() => {
		if (app) {
			app.dispose();
		}
	});
</script>

<div class="spline-container {className}">
	{#if loading}
		<div class="loading-state">
			<div class="loader"></div>
		</div>
	{/if}

	{#if error}
		<div class="error-state">
			<p>Failed to load 3D scene</p>
		</div>
	{/if}

	<canvas bind:this={canvas} class:hidden={loading || error}></canvas>
</div>

<style>
	.spline-container {
		position: relative;
		width: 100%;
		height: 100%;
	}

	canvas {
		width: 100%;
		height: 100%;
		display: block;
	}

	.hidden {
		opacity: 0;
	}

	.loading-state,
	.error-state {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.loader {
		width: 40px;
		height: 40px;
		border: 3px solid rgba(13, 115, 119, 0.2);
		border-top-color: #14b8a6;
		border-radius: 50%;
		animation: spin 1s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.error-state p {
		color: #6b7280;
		font-size: 0.875rem;
	}
</style>
