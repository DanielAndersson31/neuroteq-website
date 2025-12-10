<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		class?: string;
		showText?: boolean;
		variant?: 'default' | 'light';
	}

	let { class: className = '', showText = true, variant = 'default' }: Props = $props();
</script>

<div class={cn('flex items-center', className)}>
	{#if showText}
		<span class="text-xl font-bold tracking-tight text-primary">
			Neuroteq
		</span>
	{/if}
</div>
