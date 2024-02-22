<script lang="ts">
	export let listings;

	import { readable } from 'svelte/store';
	import { createTable, createRender, Render, Subscribe } from 'svelte-headless-table';
	import { addPagination, addSortBy, addTableFilter } from 'svelte-headless-table/plugins';

	import ArrowUp from 'lucide-svelte/icons/arrow-up';
	import ArrowDown from 'lucide-svelte/icons/arrow-down';
	import ArrowDownUp from 'lucide-svelte/icons/arrow-down-up';
	import ChevronLeft from 'lucide-svelte/icons/chevron-left';
	import ChevronRight from 'lucide-svelte/icons/chevron-right';

	import * as Table from '$lib/components/ui/table';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';

	import ExternalLink from '$lib/components/ui/external-link.svelte';

	const sortableCols = {
		company: true,
		location: true,
		lastUpdate: true,
		positionCount: true
	};

	const totalPositions = listings.length;

	const table = createTable(readable(listings), {
		sort: addSortBy({
			toggleOrder: ['asc', 'desc'],
			initialSortKeys: [{ id: 'positionCount', order: 'desc' }]
		}),
		page: addPagination(),
		filter: addTableFilter()
	});

	const columns = table.createColumns([
		table.column({ accessor: 'company', header: 'Company' }),
		// TODO: Implement Role Column & Filtering
		// table.column({ accessor: 'role', header: 'Role' }),
		table.column({ accessor: 'location', header: 'Location' }),
		table.column({ accessor: 'positionCount', header: 'Available Positions' }),
		table.column({
			accessor: 'lastUpdate',
			header: 'Last Updated',
			cell: ({ value }) => new Date(value).toLocaleDateString()
		}),
		table.column({
			accessor: 'url',
			header: '',
			cell: (item) => createRender(ExternalLink, { text: 'Apply', href: item.value })
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
		table.createViewModel(columns);

	const { sortKeys } = pluginStates.sort;
	const { hasNextPage, hasPreviousPage, pageIndex, pageCount } = pluginStates.page;
	const { filterValue } = pluginStates.filter;
</script>

<!-- Controls -->
<div class="flex items-center justify-between">
	<div class="flex flex-col gap-2">
		<span class="text-xs italic dark:text-secondary"
			>eg. "Remote", "New York", "Arkane Studios"</span
		>
		<Input placeholder="Search..." class="max-w-lg" bind:value={$filterValue} />
	</div>
	<div class="flex items-center space-x-4 self-end py-4">
		<span class="hidden text-sm dark:text-secondary lg:inline"
			>{totalPositions} Total Positions</span
		>
		<Button
			variant="outline"
			size="sm"
			on:click={() => ($pageIndex = $pageIndex - 1)}
			disabled={!$hasPreviousPage}
		>
			<ChevronLeft class="h-4 w-4" />
		</Button>
		<span>{$pageIndex + 1} / {$pageCount}</span>
		<Button
			variant="outline"
			size="sm"
			disabled={!$hasNextPage}
			on:click={() => ($pageIndex = $pageIndex + 1)}
		>
			<ChevronRight class="h-4 w-4" />
		</Button>
	</div>
</div>

<!-- Table -->
<div class="w-full rounded-md border">
	<Table.Root {...$tableAttrs}>
		<Table.Header>
			{#each $headerRows as headerRow}
				<Subscribe rowAttrs={headerRow.attrs()}>
					<Table.Row>
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
								<Table.Head {...attrs} class="py-0">
									<div class="my-2 inline-flex h-full w-full items-center justify-between gap-2">
										{#if cell.id in sortableCols}
											<Button
												variant="ghost"
												class="relative inline-flex h-full w-full cursor-pointer items-center justify-between px-2 hover:bg-secondary"
												on:click={props.sort.toggle}
											>
												<Render of={cell.render()} />
												{#if $sortKeys.some((o) => o.id === cell.id)}
													<span class="inline-flex items-center gap-4">
														{#if props.sort.order == 'asc'}
															<ArrowUp class="h-4 w-4" />
														{:else}
															<ArrowDown class="h-4 w-4" />
														{/if}
													</span>
												{/if}
											</Button>
										{:else}
											<div class="pl-2">
												<Render of={cell.render()} />
											</div>
										{/if}
										<!-- TODO: Implement Column Filtering -->
										<!-- {#if cell.id in filterableCols} -->
										<!-- 	<Button variant="ghost" class="hover:bg-secondary"> -->
										<!-- 		<ListFilter class="h-4 w-4" /> -->
										<!-- 	</Button> -->
										<!-- {/if} -->
									</div>
								</Table.Head>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Header>
		<Table.Body {...$tableBodyAttrs}>
			{#each $pageRows as row (row.id)}
				<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
					<Table.Row {...rowAttrs}>
						{#each row.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
								<Table.Cell {...attrs}>
									<div class="pl-2">
										{#if cell.id === 'url'}
											<div class="text-right">
												<Render of={cell.render()} />
											</div>
										{:else}
											<Render of={cell.render()} />
										{/if}
									</div>
								</Table.Cell>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
