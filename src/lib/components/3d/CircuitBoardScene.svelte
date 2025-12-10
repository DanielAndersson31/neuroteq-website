<script lang="ts">
	import { Canvas } from '@threlte/core';
	import CircuitBoard from './CircuitBoard.svelte';
	import { onMount } from 'svelte';

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});
</script>

{#if mounted}
	<div class="circuit-scene">
		<Canvas
			rendererParameters={{
				antialias: true,
				alpha: false,
				powerPreference: 'high-performance'
			}}
		>
			<CircuitBoard />
		</Canvas>
	</div>
{/if}

<style>
	.circuit-scene {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		z-index: 0;
	}

	.circuit-scene :global(canvas) {
		display: block;
		width: 100% !important;
		height: 100% !important;
		position: absolute !important;
		top: 0 !important;
		left: 0 !important;
	}

	.circuit-scene :global(> div),
	.circuit-scene :global(> div > div) {
		position: absolute !important;
		top: 0 !important;
		left: 0 !important;
		width: 100% !important;
		height: 100% !important;
	}
</style>
