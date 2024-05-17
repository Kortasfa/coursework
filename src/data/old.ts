
// function findShortestPath() {
//     shortestPath = graph.findShortestPath(start, end);
//     tableData = [];
//     if (shortestPath) {
//         shortestPath.forEach((path) => {
//             let data = findPhenomenaData(path.phenomenonName);
//             let inputQuantities: string[] = [];
//             data?.inputQuantities.forEach((element) => {
//                 let quantityName = findQuantitieName(element);
//                 if (quantityName) {
//                     inputQuantities.push(quantityName);
//                 }
//             });

//             if (data) {
//                 tableData.push({
//                     phenomenonName: path.phenomenonName,
//                     inputQuantities: inputQuantities,
//                     outputQuantitie: findQuantitieName(data.outputQuantities) || ''
//                 });
//             }
//         });
//     }
// }

// <!-- {#key shortestPath}
// 		{#key tableData}
// 			{#if shortestPath.length > 0}
// 				<div class="table-container inputs">
// 					{#each tableData as table, i}
// 						<table class="table table-hover">
// 							<caption>
// 								{table.phenomenonName}
// 							</caption>
// 							<thead>
// 								<tr>
// 									<th>Входящие ФЭ</th>
// 									<th>Выходящие ФЭ</th>
// 								</tr>
// 							</thead>
// 							<tbody>
// 								{#each table.inputQuantities as input, i}
// 									<tr>
// 										<td>{input}</td>
// 										<td>{i == 0 ? table.outputQuantitie : ''}</td>
// 									</tr>
// 								{/each}
// 							</tbody>
// 						</table>
// 						{#if i < tableData.length - 1}
// 							<div class="arrow">➡️</div>
// 						{/if}
// 					{/each}
// 				</div>
// 			{/if}
// 		{/key}
// 	{/key} -->