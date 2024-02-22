<script lang="ts">
	export let href: string;
	export let text: string;

	import { Button } from '$lib/components/ui/button';
	import ExternalLink from 'lucide-svelte/icons/external-link';
</script>

<Button variant="ghost" {href} target="_blank" class="align-middle">
	{text || ''}
	<ExternalLink class="ml-2 h-4 w-4" />
</Button>
