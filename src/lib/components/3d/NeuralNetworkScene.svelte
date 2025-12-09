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
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		width: 100vw;
		height: 100%;
		z-index: 0;
		pointer-events: none;
		overflow: hidden;
	}

	.neural-scene :global(canvas) {
		pointer-events: auto;
		width: 100% !important;
		height: 100% !important;
	}
</style>
