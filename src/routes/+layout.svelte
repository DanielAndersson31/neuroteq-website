<script lang="ts">
	import '../app.css';
	import { Header, Footer } from '$lib/components/layout';
	import { Toaster } from '$lib/components/ui/sonner';

	let { children } = $props();
</script>

<Toaster position="top-right" richColors />

<div class="flex min-h-screen flex-col">
	<Header />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
