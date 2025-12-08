<script lang="ts">
	import { SEOHead } from '$lib/components/shared';
	import { Hero, ServicesOverview, Testimonials, CTASection } from '$lib/components/sections';
	import { siteConfig } from '$lib/config/site';
</script>

<SEOHead
	title="Neuroteq - AI Consulting & Development"
	description={siteConfig.description}
	keywords={['AI consulting', 'machine learning', 'artificial intelligence', 'custom AI development', 'AI integration']}
/>

<Hero />
<ServicesOverview />
<Testimonials />
<CTASection />
