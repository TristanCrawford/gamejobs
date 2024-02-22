<script lang="ts">
	export let data;

	import { Button } from '$lib/components/ui/button';
	import { Skeleton } from '$lib/components/ui/skeleton';

	import MainTable from '$lib/components/ui/main-table.svelte';
</script>

<h1 class="mt-8 font-mono text-4xl font-bold text-[#0f0]">$ cat gamejobs.txt</h1>

<!-- Table -->
{#await data.listings}
	<Skeleton class="mt-8 h-96 w-full rounded" />
{:then listings}
	<MainTable {listings} />
{:catch error}
	Oops...
{/await}
