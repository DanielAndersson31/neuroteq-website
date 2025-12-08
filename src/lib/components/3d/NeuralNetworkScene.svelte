<script lang="ts">
	import { Canvas } from '@threlte/core';
	import NeuralNetwork from './NeuralNetwork.svelte';
	import { onMount } from 'svelte';

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});
</script>

{#if mounted}
	<div class="neural-scene">
		<Canvas>
			<NeuralNetwork />
		</Canvas>
	</div>
{/if}

<style>
	.neural-scene {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
		pointer-events: none;
	}

	.neural-scene :global(canvas) {
		pointer-events: auto;
	}
</style>
