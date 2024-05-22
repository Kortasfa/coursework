<script lang="ts">
	import { quantities, type Quantity } from '../../data/physicalQuantities';
	import { phenomena, type Phenomenon } from '../../data/effectsChain';
	import { FileButton } from '@skeletonlabs/skeleton';
	import { get, writable } from 'svelte/store';
	import { graph } from '../../data/graph';

	let quantitiesUpdated = writable<Quantity[]>(quantities);
	let phenomenaUpdated = writable<Phenomenon[]>(phenomena);

	let quantitiesFile: FileList;
	let phenomenaFiles: FileList;

	async function handleQuantitiesUpload(files: FileList) {
		if (files && files.length > 0) {
			const file = files[0];
			const text = await file.text();
			const parsedData = JSON.parse(text) as Quantity[];
			quantitiesUpdated.set(parsedData);

			const updatedQuantities = get(quantitiesUpdated);
			const updatedPhenomena = get(phenomenaUpdated);
			graph.updateGraph(updatedQuantities, updatedPhenomena);
		}
	}

	async function handlePhenomenaUpload(files: FileList) {
		if (files && files.length > 0) {
			const file = files[0];
			const text = await file.text();
			const parsedData = JSON.parse(text) as Phenomenon[];
			phenomenaUpdated.set(parsedData);

			const updatedQuantities = get(quantitiesUpdated);
			const updatedPhenomena = get(phenomenaUpdated);
			graph.updateGraph(updatedQuantities, updatedPhenomena);
		}
	}

	function downloadFile(data: Quantity[] | Phenomenon[]) {
		const jsonString = JSON.stringify(data);
		const blob = new Blob([jsonString], { type: 'application/json' });
		const link = document.createElement('a');
		link.download = 'data.json';
		link.href = URL.createObjectURL(blob);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
</script>

<div class="p-4 flex">
	<div class="table-compact">
		<div class="btn-group-vertical variant-filled">
			<FileButton
				name="files"
				button=""
				width="w-full"
				bind:files={quantitiesFile}
				on:change={() => handleQuantitiesUpload(quantitiesFile)}>Загрузить</FileButton
			>
			<button on:click={() => quantitiesUpdated.subscribe((value) => downloadFile(value))}
				>Скачать</button
			>
		</div>
		<table class="table table-hover">
			<caption> Физические величины </caption>
			<thead>
				<tr>
					<th>Id</th>
					<th>Название</th>
				</tr>
			</thead>
			<tbody>
				{#each $quantitiesUpdated as row}
					<tr>
						<td>{row.id}</td>
						<td>{row.name}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="table-compact">
		<div class="btn-group-vertical variant-filled">
			<FileButton
				name="files"
				button=""
				width="w-full"
				bind:files={phenomenaFiles}
				on:change={() => handlePhenomenaUpload(phenomenaFiles)}>Загрузить</FileButton
			>
			<button on:click={() => phenomenaUpdated.subscribe((value) => downloadFile(value))}
				>Скачать</button
			>
		</div>
		<table class="table table-hover">
			<caption> Цепочка эффектов </caption>
			<thead>
				<tr>
					<th>Название эффекта</th>
					<th>Входящие физические величины</th>
					<th>Произовдные физические величины</th>
				</tr>
			</thead>
			<tbody>
				{#each $phenomenaUpdated as row}
					<tr>
						<td>{row.name}</td>
						<td>{row.inputQuantities}</td>
						<td>{row.outputQuantities}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style>
	.flex {
		display: flex;
		gap: 20px;
	}
</style>
