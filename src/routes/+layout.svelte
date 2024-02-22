<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';

	import SideActions from '$lib/components/ui/side-actions.svelte';

	import '../app.pcss';
</script>

<ModeWatcher defaultMode={'dark'} />
<SideActions />

<div class="mx-8 mt-4 flex flex-col gap-4 lg:mx-48">
	<slot />
</div>
