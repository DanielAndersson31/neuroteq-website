<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import {
		createScrollAnimation,
		createStaggeredAnimation,
		type AnimationPreset
	} from '$lib/utils/animations';
	import type { Snippet } from 'svelte';

	interface Props {
		animation?: AnimationPreset;
		duration?: number;
		delay?: number;
		stagger?: number;
		staggerChildren?: string;
		start?: string;
		once?: boolean;
		class?: string;
		children: Snippet;
	}

	let {
		animation = 'fadeInUp',
		duration = 1,
		delay = 0,
		stagger = 0,
		staggerChildren = '',
		start = 'top 85%',
		once = true,
		class: className = '',
		children
	}: Props = $props();

	let element: HTMLElement;
	let scrollTriggerInstance: gsap.core.Tween | null = null;

	onMount(() => {
		if (!element) return;

		if (staggerChildren) {
			scrollTriggerInstance = createStaggeredAnimation(element, staggerChildren, animation, {
				duration,
				stagger,
				start
			});
		} else {
			scrollTriggerInstance = createScrollAnimation(element, animation, {
				duration,
				delay,
				start,
				once
			});
		}
	});

	onDestroy(() => {
		if (scrollTriggerInstance) {
			scrollTriggerInstance.kill();
		}
	});
</script>

<div bind:this={element} class={className}>
	{@render children()}
</div>
