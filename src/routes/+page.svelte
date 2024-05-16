<script lang="ts">
	import { findQuantitieName, quantities } from '../data/physicalQuantities';
	import { phenomena, type Phenomenon } from '../data/effectsChain';
	import { Graph, type Edge } from '../data/graph';

	type TableData = {
		phenomenonName: string;
		inputQuantities: string[];
		outputQuantitie: string;
	};

	let start = 0;
	let end = 0;
	let shortestPath: Edge[]  = [];
	let tableData: TableData[] = [];

	const graph = new Graph();

	for (let quantity of quantities) {
		graph.addNode(quantity);
	}

	for (let connection of phenomena) {
		for (let i of connection.inputQuantities) {
			graph.addEdge(i, connection.outputQuantities, connection.name);
		}
	}

	function findShortestPath() {
		shortestPath = graph.findShortestPath(start, end);
		tableData = []
		if (shortestPath) {
			shortestPath.forEach((path) => {
				let data = findPhenomenaData(path.phenomenonName);
				let inputQuantities: string[] = [];
				data?.inputQuantities.forEach((element) => {
					let quantityName = findQuantitieName(element);
					if (quantityName) {
						inputQuantities.push(quantityName);
					}
				});

				if (data) {
					tableData.push({
						phenomenonName: path.phenomenonName,
						inputQuantities: inputQuantities,
						outputQuantitie: findQuantitieName(data.outputQuantities) || ''
					});
				}
			});
		}
	}

	function findPhenomenaData(name: string): Phenomenon | null {
		for (let connection of phenomena) {
			if (connection.name === name) {
				return {
					name: connection.name,
					inputQuantities: connection.inputQuantities,
					outputQuantities: connection.outputQuantities
				};
			}
		}
		return null;
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
				<h4 class="h4">Найти кратчайший путь</h4>
				<p>
					Нажмите кнопку "Найти кратчайший путь", чтобы приложение выполнело <br /> поиск кратчайшего
					пути между выбранными вами величинами.
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
	<button type="button" class="btn variant-filled card-hover marginBottom" on:click={findShortestPath}
		>Найти кратчайший путь</button
	>
	{#key shortestPath}
		{#key tableData}
			{#if shortestPath.length > 0}
				<div class="table-container inputs">
					{#each tableData as table, i}
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
								{#each table.inputQuantities as input, i}
									<tr>
										<td>{input}</td>
										<td>{i == 0 ? table.outputQuantitie : ''}</td>
									</tr>
								{/each}
							</tbody>
						</table>
					{/each}
				</div>
			{/if}
		{/key}
	{/key}
</div>

<style>
	.inputs {
		display: flex;
		gap: 20px;
		margin-bottom: 20px;
	}
	.marginBottom{
		margin-bottom: 20px;
	}
</style>
