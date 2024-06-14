<script lang="ts">
	import { findQuantitieName, quantities } from '../data/physicalQuantities';
	import { findPhenomenaData } from '../data/effectsChain';
	import { graph, type Edge } from '../data/graph';
	import { writable, derived } from 'svelte/store';
	import {
		TabGroup,
		Tab,
		ListBox,
		ListBoxItem,
		Paginator,
		type PaginationSettings
	} from '@skeletonlabs/skeleton';

	let firstTabSet: number = 0;
	let secondTabSet: number = 0;
	let depth = '5';
	let start: number = 0;
	let end: number = 0;
	let loading: Boolean = false;
	let inputBansId: number[] = [];
	let fullBansId: number[] = [];

	type TableData = {
		phenomenonName: string;
		inputQuantities: string[];
		outputQuantitie: string;
	};

	const allPaths = writable<Edge[][]>([]);
	const allPathsTableData = writable<TableData[][]>([]);

	let paginationSettings = {
		page: 0,
		limit: 1,
		size: 0,
		amounts: [1, 3, 5, 10]
	} satisfies PaginationSettings;

	$: paginationSettings.size = $allPathsTableData.length;

	$: paginatedTableData = derived(allPathsTableData, ($allPathsTableData) => {
		const startIndex = paginationSettings.page * paginationSettings.limit;
		const endIndex = startIndex + paginationSettings.limit;
		return $allPathsTableData.slice(startIndex, endIndex);
	});

	async function findAllPaths() {
		loading = true;
		await new Promise((r) => setTimeout(r, 0));
		const paths = graph.findAllPaths(start, end, parseInt(depth));
		allPaths.set(paths);
		const pathsTableData: TableData[][] = [];
		const inputBansSet = new Set(inputBansId);

		if (paths) {
			paths.forEach((path) => {
				let pathTableData: TableData[] = [];
				let shouldBanPath = false;

				path.forEach((pathData) => {
					let data = findPhenomenaData(pathData.phenomenonName);
					let inputQuantities: string[] = [];

					data?.inputQuantities.forEach((element) => {
						if (inputBansSet.has(element)) {
							shouldBanPath = true;
						}

						let quantityName = findQuantitieName(element);
						if (quantityName) {
							inputQuantities.push(quantityName);
						}
					});

					if (data) {
						pathTableData.push({
							phenomenonName: pathData.phenomenonName,
							inputQuantities: inputQuantities,
							outputQuantitie: findQuantitieName(data.outputQuantities) || ''
						});
					}
				});

				if (!shouldBanPath) {
					pathsTableData.push(pathTableData);
				}
			});
		}

		pathsTableData.sort((a, b) => a.length - b.length);
		allPathsTableData.set(pathsTableData);
		loading = false;
	}
</script>

<div class="p-4">
	<div class="inputs">
		<div class="card p-1">
			<TabGroup>
				<Tab bind:group={firstTabSet} name="tab1" value={0}>Входы</Tab>
				<Tab bind:group={firstTabSet} name="tab2" value={1}>Запреты на входы</Tab>
				<svelte:fragment slot="panel">
					{#if firstTabSet === 0}
						<header class="card-header h3">Входное значение</header>
						<section class="p-4 list_height">
							<ListBox class="select">
								{#each quantities as quantity}
									<ListBoxItem bind:group={start} name="medium" value={quantity.id}>
										{quantity.name}
									</ListBoxItem>
								{/each}
							</ListBox>
						</section>
					{:else if firstTabSet === 1}
						<header class="card-header h3">Запреты на доп входы</header>
						<section class="p-4 list_height">
							<ListBox multiple class="select">
								{#each quantities as quantity}
									<ListBoxItem bind:group={inputBansId} name="medium" value={quantity.id}>
										{quantity.name}
									</ListBoxItem>
								{/each}
							</ListBox>
						</section>
					{/if}
				</svelte:fragment>
			</TabGroup>
		</div>
		<div class="card p-1">
			<TabGroup>
				<Tab bind:group={secondTabSet} name="tab1" value={0}>Выход</Tab>
				<Tab bind:group={secondTabSet} name="tab2" value={1}>Запреты на выходы</Tab>
				<svelte:fragment slot="panel">
					{#if secondTabSet === 0}
						<header class="card-header h3">Конечное значение</header>
						<section class="p-4 list_height">
							<ListBox class="select">
								{#each quantities as quantity}
									<ListBoxItem bind:group={end} name="medium" value={quantity.id}>
										{quantity.name}
									</ListBoxItem>
								{/each}
							</ListBox>
						</section>
					{:else if secondTabSet === 1}
						<header class="card-header h3">Запреты на выходы</header>
						<section class="p-4 list_height">
							<ListBox multiple class="select">
								{#each quantities as quantity}
									<ListBoxItem bind:group={fullBansId} name="medium" value={quantity.id}>
										{quantity.name}
									</ListBoxItem>
								{/each}
							</ListBox>
						</section>
					{/if}
				</svelte:fragment>
			</TabGroup>
		</div>
		<div class="card p-1">
			<header class="card-header h3">Инструкция 📄</header>
			<section class="p-4">
				<h4 class="h4">Выбор входного и выходного значения 🧭</h4>
				<p>
					В левом и правом блоках "Входное значение" и "Конечное значение" <br />
					соответственно выберите физические величины, между которыми вы <br /> хотели бы найти кратчайший
					путь преобразования.
				</p>
				<br />
				<h4 class="h4">Найти все пути 🔍</h4>
				<p>
					Нажмите кнопку "Найти все пути", чтобы приложение выполнило <br /> поиск всех путей между выбранными
					вами величинами.
				</p>
				<br />
				<h4 class="h4">Результаты 📊</h4>
				<p>
					Если существует кратчайший путь между выбранными вами величинами, он <br /> будет
					отображен ниже кнопки в виде списка преобразований. <br /> Если путь не найден, будет
					отображено сообщение "Нет пути между <br /> введенными значениями."
				</p>
			</section>
		</div>
	</div>
	<div class="inputs centered">
		<button type="button" class="btn variant-filled card-hover" on:click={findAllPaths}>
			Найти все пути
		</button>
		<span>Глубина поиска</span>
		<label class="label">
			<select class="select" bind:value={depth}>
				<option value="1">1</option>
				<option value="3">3</option>
				<option value="5" selected>5</option>
				<option value="10">10</option>
			</select>
		</label>
		{#if loading}
			<p>Загрузка...</p>
		{/if}
		{#if $allPaths.length > 0 && !loading}
			<Paginator
				bind:settings={paginationSettings}
				showFirstLastButtons={false}
				showPreviousNextButtons={true}
				amountText="путей"
			/>
		{/if}
	</div>
	{#if !loading}
		{#if $allPaths.length > 0}
			{#each $paginatedTableData as tables}
				<div class="table-container inputs">
					{#each tables as table, i}
						<table class="table table-hover">
							<caption>
								{table.phenomenonName}
							</caption>
							<thead>
								<tr>
									<th>Входящие ФЭ</th>
									<th>Выходящие ФЭ</th>
								</tr>
							</thead>
							<tbody>
								{#each table.inputQuantities as input, j}
									<tr>
										<td>{input}</td>
										<td>{j == 0 ? table.outputQuantitie : ''}</td>
									</tr>
								{/each}
							</tbody>
						</table>
						{#if i < tables.length - 1}
							<div class="arrow">➡️</div>
						{/if}
					{/each}
				</div>
			{/each}
		{/if}
	{/if}
</div>

<style>
	.inputs {
		display: flex;
		gap: 20px;
		margin-bottom: 20px;
	}
	.centered {
		align-items: center;
	}
	.arrow {
		margin-top: 40px;
	}
	.list_height {
		height: 350px;
		overflow: auto;
	}
</style>
