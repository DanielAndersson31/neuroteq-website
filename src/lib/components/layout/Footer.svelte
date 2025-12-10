<script lang="ts">
	import { siteConfig } from '$lib/config/site';
	import Logo from './Logo.svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { Linkedin, Twitter, Github, Mail, Phone } from 'lucide-svelte';
</script>

<footer class="border-t bg-muted/30">
	<div class="container-wide py-12 md:py-16">
		<!-- Main Footer Content -->
		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
			<!-- Brand Column -->
			<div class="lg:col-span-2">
				<Logo />
				<p class="mt-4 max-w-xs text-sm text-muted-foreground">
					{siteConfig.description}
				</p>
				<!-- Social Links -->
				<div class="mt-6 flex gap-4">
					<a
						href={siteConfig.social.linkedin}
						class="text-muted-foreground transition-colors hover:text-primary"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="LinkedIn"
					>
						<Linkedin class="h-5 w-5" />
					</a>
					<a
						href={siteConfig.social.twitter}
						class="text-muted-foreground transition-colors hover:text-primary"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Twitter"
					>
						<Twitter class="h-5 w-5" />
					</a>
					<a
						href={siteConfig.social.github}
						class="text-muted-foreground transition-colors hover:text-primary"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="GitHub"
					>
						<Github class="h-5 w-5" />
					</a>
				</div>
			</div>

			<!-- Services -->
			<div>
				<h3 class="text-sm font-semibold">Services</h3>
				<ul class="mt-4 space-y-3">
					{#each siteConfig.footerNav.services as link}
						<li>
							<a href={link.href} class="text-sm text-muted-foreground transition-colors hover:text-primary">
								{link.title}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Company -->
			<div>
				<h3 class="text-sm font-semibold">Company</h3>
				<ul class="mt-4 space-y-3">
					{#each siteConfig.footerNav.company as link}
						<li>
							<a href={link.href} class="text-sm text-muted-foreground transition-colors hover:text-primary">
								{link.title}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Contact Info -->
			<div>
				<h3 class="text-sm font-semibold">Contact</h3>
				<ul class="mt-4 space-y-3">
					<li>
						<a
							href="mailto:{siteConfig.email}"
							class="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
						>
							<Mail class="h-4 w-4" />
							{siteConfig.email}
						</a>
					</li>
					<li>
						<a
							href="tel:{siteConfig.phone}"
							class="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
						>
							<Phone class="h-4 w-4" />
							{siteConfig.phone}
						</a>
					</li>
				</ul>
			</div>
		</div>

		<Separator class="my-8" />

		<!-- Bottom Bar -->
		<div class="flex flex-col items-center justify-between gap-4 md:flex-row">
			<p class="text-sm text-muted-foreground">
				&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
			</p>
			<div class="flex gap-6">
				{#each siteConfig.footerNav.legal as link}
					<a href={link.href} class="text-sm text-muted-foreground transition-colors hover:text-primary">
						{link.title}
					</a>
				{/each}
			</div>
		</div>
	</div>
</footer>
