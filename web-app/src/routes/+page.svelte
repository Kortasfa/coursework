<script lang="ts">
	import { quantities } from '../data/physicalQuantities';
	import { phenomena } from '../data/effectsChain';
	import { Graph } from './graph';

	let start = 0;
	let end = 0;
	let shortestPath: string[] = [];

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

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Coursework" />
</svelte:head>

<section>
	<h1>
		Поиск физических принципов действий <br /> на основе фонда физических эффектов
	</h1>
	<label for="start">Начальное значение</label>
	<input type="number" id="start" bind:value={start} />
	<label for="end">Конечное значение</label>
	<input type="number" id="end" bind:value={end} />
	<button on:click={findShortestPath}>Найти кратчайший путь</button>
</section>

<div class="results">
	{#if shortestPath.length > 0}
		<p>Кратчайший путь: {shortestPath.join(' -> ')}</p>
	{:else}
		<p>Нет пути между введенными значениями.</p>
	{/if}
</div>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
		margin-bottom: 20px;
	}

	.results {
		display: flex;
		align-items: flex-start;
		margin-top: 20px;
		flex-direction: column;
	}
</style>
