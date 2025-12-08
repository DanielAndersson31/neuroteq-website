<script lang="ts">
	import { page } from '$app/stores';
	import { siteConfig } from '$lib/config/site';
	import { cn } from '$lib/utils';
	import { Button } from '$lib/components/ui/button';
	import * as Sheet from '$lib/components/ui/sheet';
	import Logo from './Logo.svelte';
	import { Menu, ChevronDown } from 'lucide-svelte';

	let mobileMenuOpen = $state(false);
	let scrolled = $state(false);

	// Handle scroll for header background
	function handleScroll() {
		scrolled = window.scrollY > 20;
	}

	// Check if link is active
	function isActive(href: string): boolean {
		if (href === '/') {
			return $page.url.pathname === '/';
		}
		return $page.url.pathname.startsWith(href);
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}
</script>

<svelte:window onscroll={handleScroll} />

<header
	class={cn(
		'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
		scrolled ? 'bg-background/95 backdrop-blur-md shadow-sm border-b' : 'bg-transparent'
	)}
>
	<nav class="container-wide flex h-16 items-center justify-between md:h-20">
		<!-- Logo -->
		<a href="/" class="flex items-center">
			<Logo />
		</a>

		<!-- Desktop Navigation -->
		<div class="hidden items-center gap-1 lg:flex">
			{#each siteConfig.mainNav as item}
				{#if item.children}
					<div class="group relative">
						<button
							class={cn(
								'flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium transition-colors',
								isActive(item.href)
									? 'text-primary'
									: 'text-muted-foreground hover:text-foreground'
							)}
						>
							{item.title}
							<ChevronDown class="h-4 w-4 transition-transform group-hover:rotate-180" />
						</button>
						<!-- Dropdown -->
						<div class="invisible absolute left-0 top-full pt-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
							<div class="w-64 rounded-lg border bg-background p-2 shadow-lg">
								{#each item.children as child}
									<a
										href={child.href}
										class="block rounded-md px-3 py-2 transition-colors hover:bg-muted"
									>
										<div class="text-sm font-medium">{child.title}</div>
										{#if child.description}
											<div class="text-xs text-muted-foreground">{child.description}</div>
										{/if}
									</a>
								{/each}
							</div>
						</div>
					</div>
				{:else}
					<a
						href={item.href}
						class={cn(
							'rounded-md px-4 py-2 text-sm font-medium transition-colors',
							isActive(item.href)
								? 'text-primary'
								: 'text-muted-foreground hover:text-foreground'
						)}
					>
						{item.title}
					</a>
				{/if}
			{/each}
		</div>

		<!-- Desktop CTA -->
		<div class="hidden items-center gap-4 lg:flex">
			<Button href="/contact" class="gradient-primary text-white">
				Get Started
			</Button>
		</div>

		<!-- Mobile Menu Button -->
		<Sheet.Root bind:open={mobileMenuOpen}>
			<Sheet.Trigger class="lg:hidden inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground h-10 w-10">
				<Menu class="h-6 w-6" />
				<span class="sr-only">Toggle menu</span>
			</Sheet.Trigger>
			<Sheet.Content side="right" class="w-full sm:w-80">
				<Sheet.Header>
					<Sheet.Title>
						<Logo />
					</Sheet.Title>
				</Sheet.Header>
				<div class="mt-8 flex flex-col gap-4">
					{#each siteConfig.mainNav as item}
						{#if item.children}
							<div class="space-y-2">
								<span class="text-sm font-semibold text-muted-foreground">{item.title}</span>
								<div class="ml-4 space-y-2">
									{#each item.children as child}
										<a
											href={child.href}
											class="block text-sm text-foreground hover:text-primary"
											onclick={closeMobileMenu}
										>
											{child.title}
										</a>
									{/each}
								</div>
							</div>
						{:else}
							<a
								href={item.href}
								class={cn(
									'text-lg font-medium transition-colors',
									isActive(item.href) ? 'text-primary' : 'text-foreground hover:text-primary'
								)}
								onclick={closeMobileMenu}
							>
								{item.title}
							</a>
						{/if}
					{/each}
					<div class="mt-4 pt-4 border-t">
						<Button href="/contact" class="w-full gradient-primary text-white" onclick={closeMobileMenu}>
							Get Started
						</Button>
					</div>
				</div>
			</Sheet.Content>
		</Sheet.Root>
	</nav>
</header>

<!-- Spacer to prevent content from going under fixed header -->
<div class="h-16 md:h-20"></div>
