<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { ArrowRight, MessageSquare } from 'lucide-svelte';

	export let title = "Ready to Transform Your Business with AI?";
	export let description = "Let's discuss how Neuroteq can help you leverage artificial intelligence to achieve your business goals.";
	export let primaryCta = { text: "Schedule a Consultation", href: "/contact" };
	export let secondaryCta = { text: "View Our Work", href: "/case-studies" };
</script>

<section class="section-padding">
	<div class="container-wide">
		<div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-600 to-accent-600 px-8 py-16 text-center text-white md:px-16 md:py-24">
			<!-- Background decoration -->
			<div class="absolute inset-0 -z-10 overflow-hidden">
				<div class="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>
				<div class="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-white/10 blur-3xl"></div>
			</div>

			<div class="mx-auto max-w-3xl">
				<h2 class="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
					{title}
				</h2>
				<p class="mx-auto mt-6 max-w-2xl text-lg text-white/80">
					{description}
				</p>
				<div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
					<Button href={primaryCta.href} size="lg" class="bg-white text-primary hover:bg-white/90 px-8">
						<MessageSquare class="mr-2 h-5 w-5" />
						{primaryCta.text}
					</Button>
					{#if secondaryCta}
						<Button href={secondaryCta.href} variant="outline" size="lg" class="border-white/30 text-white hover:bg-white/10 px-8">
							{secondaryCta.text}
							<ArrowRight class="ml-2 h-5 w-5" />
						</Button>
					{/if}
				</div>
			</div>
		</div>
	</div>
</section>
