<script lang="ts">
	import { cn } from '$lib/utils';

	let className: string = '';
	export { className as class };
	export let showText = true;
</script>

<div class={cn('flex items-center gap-2', className)}>
	<!-- Logo Mark -->
	<div class="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500">
		<svg
			viewBox="0 0 24 24"
			fill="none"
			class="h-5 w-5 text-white"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<!-- Neural network / brain icon -->
			<circle cx="12" cy="12" r="3" />
			<circle cx="12" cy="4" r="1.5" />
			<circle cx="12" cy="20" r="1.5" />
			<circle cx="4" cy="12" r="1.5" />
			<circle cx="20" cy="12" r="1.5" />
			<circle cx="6.5" cy="6.5" r="1.5" />
			<circle cx="17.5" cy="6.5" r="1.5" />
			<circle cx="6.5" cy="17.5" r="1.5" />
			<circle cx="17.5" cy="17.5" r="1.5" />
			<line x1="12" y1="9" x2="12" y2="5.5" />
			<line x1="12" y1="15" x2="12" y2="18.5" />
			<line x1="9" y1="12" x2="5.5" y2="12" />
			<line x1="15" y1="12" x2="18.5" y2="12" />
			<line x1="9.9" y1="9.9" x2="7.5" y2="7.5" />
			<line x1="14.1" y1="9.9" x2="16.5" y2="7.5" />
			<line x1="9.9" y1="14.1" x2="7.5" y2="16.5" />
			<line x1="14.1" y1="14.1" x2="16.5" y2="16.5" />
		</svg>
	</div>

	{#if showText}
		<span class="text-xl font-bold tracking-tight">
			<span class="text-gradient">Neuro</span><span class="text-foreground">teq</span>
		</span>
	{/if}
</div>
