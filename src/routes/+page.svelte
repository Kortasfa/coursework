<script lang="ts">
	import { findQuantitieName, quantities } from '../data/physicalQuantities';
	import { phenomena, findPhenomenaData } from '../data/effectsChain';
	import { Graph, type Edge } from '../data/graph';

	type TableData = {
		phenomenonName: string;
		inputQuantities: string[];
		outputQuantitie: string;
	};

	let start = 0;
	let end = 0;
	let allPaths: Edge[][] = [];
	let allPathsTableData: TableData[][] = [];
	let loading = false;

	const graph = new Graph();

	for (let quantity of quantities) {
		graph.addNode(quantity);
	}

	for (let connection of phenomena) {
		for (let i of connection.inputQuantities) {
			graph.addEdge(i, connection.outputQuantities, connection.name);
		}
	}

	async function findAllPaths() {
		loading = true;
		await new Promise((r) => setTimeout(r, 0));
		allPaths = graph.findAllPaths(start, end);
		allPathsTableData = [];
		if (allPaths) {
			allPaths.forEach((path) => {
				let pathTableData: TableData[] = [];
				path.forEach((pathData) => {
					let data = findPhenomenaData(pathData.phenomenonName);
					let inputQuantities: string[] = [];
					data?.inputQuantities.forEach((element) => {
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
				allPathsTableData.push(pathTableData);
			});
		}
		allPathsTableData.sort((a, b) => a.length - b.length);
		loading = false;
	}
</script>

<div class="p-4">
	<div class="inputs">
		<div class="card p-1">
			<header class="card-header h3">Входное значение</header>
			<section class="p-4">
				<select bind:value={start} class="select" size="9">
					{#each quantities as quantity}
						<option value={quantity.id}>{quantity.name}</option>
					{/each}
				</select>
			</section>
		</div>
		<div class="card p-1">
			<header class="card-header h3">Конечное значение</header>
			<section class="p-4">
				<select bind:value={end} class="select" size="9">
					{#each quantities as quantity}
						<option value={quantity.id}>{quantity.name}</option>
					{/each}
				</select>
			</section>
		</div>
		<div class="card p-1">
			<header class="card-header h3">Инструкция</header>
			<section class="p-4">
				<h4 class="h4">Выбор входного и выходного значения</h4>
				<p>
					В левом и правом блоках "Входное значение" и "Конечное значение" <br />
					соответственно выберите физические величины, между которыми вы <br /> хотели бы найти кратчайший
					путь преобразования.
				</p>
				<br />
				<h4 class="h4">Найти все пути</h4>
				<p>
					Нажмите кнопку "Найти все пути", чтобы приложение выполнело <br /> поиск всех путей между выбранными
					вами величинами.
				</p>
				<br />
				<h4 class="h4">Результаты</h4>
				<p>
					Если существует кратчайший путь между выбранными вами величинами, он <br /> будет
					отображен ниже кнопки в виде списка преобразований. <br /> Если путь не найден, будет
					отображено сообщение "Нет пути между <br /> введенными значениями."
				</p>
			</section>
		</div>
	</div>
	<div class="inputs centered">
		<button type="button" class="btn variant-filled card-hover" on:click={findAllPaths}
			>Найти все пути</button
		>
		{#if loading}
			<p>Загрузка...</p>
		{/if}
		{#if allPaths.length > 0 && !loading}
			<p>Найдено {allPaths.length}</p>
		{/if}
	</div>
	{#if !loading}
		{#key allPaths}
			{#key allPathsTableData}
				{#if allPaths.length > 0}
					{#each allPathsTableData as tables}
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
			{/key}
		{/key}
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
</style>
