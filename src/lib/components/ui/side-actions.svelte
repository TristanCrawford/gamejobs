<script lang="ts">
	import { toggleMode, mode } from 'mode-watcher';

	import Sun from 'lucide-svelte/icons/sun';
	import MoonStar from 'lucide-svelte/icons/moon-star';
	import HelpCircle from 'lucide-svelte/icons/help-circle';
	import Github from 'lucide-svelte/icons/github';

	import { Button } from '$lib/components/ui/button';
	import * as Drawer from '$lib/components/ui/drawer';
</script>

<div class="fixed bottom-4 right-4 flex flex-col gap-2">
	<Button
		variant="ghost"
		size="icon"
		href="https://github.com/TristanCrawford/gamejobs"
		target="_blank"
	>
		<Github />
	</Button>
	<Button on:click={toggleMode} variant="ghost" size="icon">
		{#if $mode === 'dark'}
			<Sun />
		{:else}
			<MoonStar />
		{/if}
	</Button>
	<Drawer.Root>
		<Drawer.Trigger>
			<Button variant="ghost" size="icon">
				<HelpCircle />
			</Button>
		</Drawer.Trigger>
		<Drawer.Content>
			<Drawer.Header>
				<Drawer.Description class="my-4 flex justify-center text-center">
					<p>
						Made with 🖤 by <a
							href="https://github.com/TristanCrawford"
							target="_blank"
							class="text-secondary-foreground">Tristan Crawford</a
						>
						<br />
						<br />
						<br />
						<span class="text-xl font-bold uppercase text-secondary-foreground">Kudos</span>
						<br />
						<br />
						<a href="https://amirsatvat.com" target="_blank" class="text-secondary-foreground"
							>Amir Satvat</a
						>
						for aggregating all of this data.
						<br />
						<br />
						<a href="https://github.com/huntabyte" target="_blank" class="text-secondary-foreground"
							>Hunter Johnston</a
						>
						for their work on
						<a
							href="https://github.com/huntabyte/shadcn-svelte"
							target="_blank"
							class="text-secondary-foreground">shadcn-svelte</a
						>.
					</p>
				</Drawer.Description>
			</Drawer.Header>
		</Drawer.Content>
	</Drawer.Root>
</div>
