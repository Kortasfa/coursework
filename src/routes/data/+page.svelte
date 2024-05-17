<script lang="ts">
	import { quantities } from '../../data/physicalQuantities';
    import { phenomena } from '../../data/effectsChain';
</script>

<div class="p-4 flex">
	<div class="table-compact">
		<table class="table table-hover">
            <caption>
                Физические величины
            </caption>
			<thead>
				<tr>
					<th>Id</th>
					<th>Название</th>
				</tr>
			</thead>
			<tbody>
				{#each quantities as row}
					<tr>
						<td>{row.id}</td>
						<td>{row.name}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
    <div class="table-compact">
		<table class="table table-hover">
            <caption>
                Цепочка эффектов
            </caption>
			<thead>
				<tr>
					<th>Название эффетка</th>
					<th>Входящие физические величины</th>
                    <th>Произовдные физические величины</th>
				</tr>
			</thead>
			<tbody>
				{#each phenomena as row}
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
        gap: 20px
    }
</style>
