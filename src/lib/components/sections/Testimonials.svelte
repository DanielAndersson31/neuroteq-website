<script lang="ts">
	import { testimonials, stats } from '$lib/config/testimonials';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Badge } from '$lib/components/ui/badge';
	import { Quote } from 'lucide-svelte';
</script>

<section class="section-padding">
	<div class="container-wide">
		<!-- Stats -->
		<div class="mb-20 grid gap-8 rounded-2xl bg-gradient-to-r from-primary-500 to-accent-500 p-8 text-white sm:grid-cols-2 lg:grid-cols-4">
			{#each stats as stat}
				<div class="text-center">
					<div class="text-4xl font-bold md:text-5xl">{stat.value}</div>
					<div class="mt-2 text-sm text-white/80">{stat.label}</div>
				</div>
			{/each}
		</div>

		<!-- Section Header -->
		<div class="mx-auto max-w-3xl text-center">
			<Badge variant="outline" class="mb-4">Testimonials</Badge>
			<h2 class="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
				Trusted by Industry Leaders
			</h2>
			<p class="mt-4 text-lg text-muted-foreground">
				See what our clients say about working with Neuroteq on their AI initiatives.
			</p>
		</div>

		<!-- Testimonials Grid -->
		<div class="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each testimonials as testimonial}
				<Card.Root class="relative">
					<Card.Header>
						<Quote class="h-8 w-8 text-primary/20" />
					</Card.Header>
					<Card.Content>
						<p class="text-muted-foreground">"{testimonial.quote}"</p>
					</Card.Content>
					<Card.Footer class="flex items-center gap-4">
						<Avatar.Root>
							<Avatar.Fallback class="bg-primary/10 text-primary">
								{testimonial.author.split(' ').map(n => n[0]).join('')}
							</Avatar.Fallback>
						</Avatar.Root>
						<div>
							<div class="font-semibold">{testimonial.author}</div>
							<div class="text-sm text-muted-foreground">
								{testimonial.role}, {testimonial.company}
							</div>
						</div>
					</Card.Footer>
				</Card.Root>
			{/each}
		</div>
	</div>
</section>
