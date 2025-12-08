<script lang="ts">
	import { page } from '$app/stores';
	import { siteConfig } from '$lib/config/site';

	export let title: string;
	export let description: string;
	export let image: string = siteConfig.ogImage;
	export let type: 'website' | 'article' = 'website';
	export let publishedTime: string | undefined = undefined;
	export let modifiedTime: string | undefined = undefined;
	export let author: string | undefined = undefined;
	export let keywords: string[] = [];
	export let noindex: boolean = false;
	export let nofollow: boolean = false;

	// Computed values
	$: fullTitle = title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`;
	$: canonicalUrl = `${siteConfig.url}${$page.url.pathname}`;
	$: fullImageUrl = image.startsWith('http') ? image : `${siteConfig.url}${image}`;
	$: robotsContent = [
		noindex ? 'noindex' : 'index',
		nofollow ? 'nofollow' : 'follow'
	].join(', ');

	// JSON-LD structured data
	$: jsonLd = {
		'@context': 'https://schema.org',
		'@type': type === 'article' ? 'Article' : 'WebPage',
		name: fullTitle,
		description: description,
		url: canonicalUrl,
		image: fullImageUrl,
		publisher: {
			'@type': 'Organization',
			name: siteConfig.name,
			logo: {
				'@type': 'ImageObject',
				url: `${siteConfig.url}/images/logo.svg`
			}
		},
		...(type === 'article' && {
			datePublished: publishedTime,
			dateModified: modifiedTime || publishedTime,
			author: {
				'@type': 'Person',
				name: author
			}
		})
	};
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{fullTitle}</title>
	<meta name="title" content={fullTitle} />
	<meta name="description" content={description} />
	{#if keywords.length > 0}
		<meta name="keywords" content={keywords.join(', ')} />
	{/if}
	<meta name="robots" content={robotsContent} />
	<link rel="canonical" href={canonicalUrl} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={type} />
	<meta property="og:url" content={canonicalUrl} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={fullImageUrl} />
	<meta property="og:site_name" content={siteConfig.name} />
	<meta property="og:locale" content="en_US" />

	{#if type === 'article'}
		{#if publishedTime}
			<meta property="article:published_time" content={publishedTime} />
		{/if}
		{#if modifiedTime}
			<meta property="article:modified_time" content={modifiedTime} />
		{/if}
		{#if author}
			<meta property="article:author" content={author} />
		{/if}
	{/if}

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={canonicalUrl} />
	<meta property="twitter:title" content={fullTitle} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={fullImageUrl} />

	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`}
</svelte:head>
