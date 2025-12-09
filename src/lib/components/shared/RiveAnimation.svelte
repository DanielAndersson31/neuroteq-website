<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import pkg from '@rive-app/canvas';
	const { Rive, Layout, Fit, Alignment } = pkg;

	interface Props {
		src: string;
		stateMachine?: string;
		autoplay?: boolean;
		fit?: 'contain' | 'cover' | 'fill' | 'fitWidth' | 'fitHeight' | 'none' | 'scaleDown';
		alignment?:
			| 'center'
			| 'topLeft'
			| 'topCenter'
			| 'topRight'
			| 'centerLeft'
			| 'centerRight'
			| 'bottomLeft'
			| 'bottomCenter'
			| 'bottomRight';
		class?: string;
		width?: number | string;
		height?: number | string;
		onLoad?: (rive: Rive) => void;
	}

	let {
		src,
		stateMachine,
		autoplay = true,
		fit = 'contain',
		alignment = 'center',
		class: className = '',
		width = '100%',
		height = '100%',
		onLoad
	}: Props = $props();

	let canvas: HTMLCanvasElement;
	let rive: Rive | null = null;

	const fitMap: Record<string, Fit> = {
		contain: Fit.Contain,
		cover: Fit.Cover,
		fill: Fit.Fill,
		fitWidth: Fit.FitWidth,
		fitHeight: Fit.FitHeight,
		none: Fit.None,
		scaleDown: Fit.ScaleDown
	};

	const alignmentMap: Record<string, Alignment> = {
		center: Alignment.Center,
		topLeft: Alignment.TopLeft,
		topCenter: Alignment.TopCenter,
		topRight: Alignment.TopRight,
		centerLeft: Alignment.CenterLeft,
		centerRight: Alignment.CenterRight,
		bottomLeft: Alignment.BottomLeft,
		bottomCenter: Alignment.BottomCenter,
		bottomRight: Alignment.BottomRight
	};

	onMount(() => {
		if (!canvas || !src) return;

		rive = new Rive({
			src,
			canvas,
			autoplay,
			stateMachines: stateMachine ? [stateMachine] : undefined,
			layout: new Layout({
				fit: fitMap[fit],
				alignment: alignmentMap[alignment]
			}),
			onLoad: () => {
				rive?.resizeDrawingSurfaceToCanvas();
				if (onLoad && rive) onLoad(rive);
			}
		});
	});

	onDestroy(() => {
		if (rive) {
			rive.cleanup();
		}
	});

	// Expose methods for external control
	export function play(animationName?: string) {
		if (animationName) {
			rive?.play(animationName);
		} else {
			rive?.play();
		}
	}

	export function pause() {
		rive?.pause();
	}

	export function reset() {
		rive?.reset();
	}

	// Fire state machine input
	export function fireInput(inputName: string) {
		if (rive && stateMachine) {
			const inputs = rive.stateMachineInputs(stateMachine);
			const input = inputs?.find((i) => i.name === inputName);
			if (input && 'fire' in input) {
				(input as { fire: () => void }).fire();
			}
		}
	}

	// Set boolean input
	export function setBooleanInput(inputName: string, value: boolean) {
		if (rive && stateMachine) {
			const inputs = rive.stateMachineInputs(stateMachine);
			const input = inputs?.find((i) => i.name === inputName);
			if (input && 'value' in input) {
				input.value = value;
			}
		}
	}

	// Set number input
	export function setNumberInput(inputName: string, value: number) {
		if (rive && stateMachine) {
			const inputs = rive.stateMachineInputs(stateMachine);
			const input = inputs?.find((i) => i.name === inputName);
			if (input && 'value' in input) {
				input.value = value;
			}
		}
	}
</script>

<canvas
	bind:this={canvas}
	class={className}
	style="width: {typeof width === 'number' ? `${width}px` : width}; height: {typeof height ===
	'number'
		? `${height}px`
		: height};"
></canvas>
