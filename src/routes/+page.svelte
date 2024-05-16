<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import { quantities } from '../data/physicalQuantities';
	import { phenomena } from '../data/effectsChain';
	import { Graph } from '../data/graph';

	let start = 0;
	let end = 0;
	let shortestPath: string[] | null = null;

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
		shortestPath = graph.findShortestPath(start, end) || [];
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
	<button type="button" class="btn variant-filled card-hover" on:click={findShortestPath}
		>Найти кратчайший путь</button
	>
	{#if shortestPath}
		{#if shortestPath.length > 0}
			<button type="button" class="btn variant-filled card-hover" on:click={findShortestPath}
				>Искать следующий путь</button
			>
			<p>{shortestPath.join(' -> ')}</p>
		{:else}
			<p>Нет пути между введенными значениями.</p>
		{/if}
	{/if}
</div>

<style>
	.inputs {
		display: flex;
		gap: 20px;
		margin-bottom: 20px;
	}
</style>
