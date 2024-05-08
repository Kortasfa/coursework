<script lang="ts">
	let fileContent = '';
	let connectionsContent = '';
	let showButton = false;

	const checkUploadStatus = () => {
		showButton = fileContent !== '' && connectionsContent !== '';
	};

	const handleFileUpload = async (event: Event, type: string) => {
		const input = event.target as HTMLInputElement;
		const file = input.files?.[0];
		const reader = new FileReader();

		if (!file) return;

		reader.onload = () => {
			if (type === 'effects') {
				fileContent = reader.result as string;
				const effectsLabel = document.getElementById('effects');
				if (effectsLabel) effectsLabel.style.backgroundColor = 'aquamarine';
			} else if (type === 'connections') {
				connectionsContent = reader.result as string;
				const connectionsLabel = document.getElementById('connections');
				if (connectionsLabel) connectionsLabel.style.backgroundColor = 'aquamarine';
			}
			checkUploadStatus();
		};

		reader.readAsText(file, 'UTF-8');
	};
</script>

<!-- Home.svelte -->
<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>
		Поиск физических принципов действий <br /> на основе фонда физических эффектов
	</h1>

	<div>
		<label for="effects-upload" class="upload-label" id="effects"
			>Выберите файл физических эффектов</label
		>
		<input
			id="effects-upload"
			class="upload-input"
			type="file"
			on:change={(event) => handleFileUpload(event, 'effects')}
			accept=".txt"
		/>
	</div>

	<div>
		<label for="connections-upload" class="upload-label" id="connections"
			>Выберите файл соединений</label
		>
		<input
			id="connections-upload"
			class="upload-input"
			type="file"
			on:change={(event) => handleFileUpload(event, 'connections')}
			accept=".txt"
		/>
	</div>

	{#if showButton}
		<a href="/graph">Continue</a>
	{/if}
</section>

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

	div {
		margin-bottom: 20px;
	}

	.upload-label {
		font-size: 16px;
		margin-bottom: 5px;
		border: 1px solid #ccc;
		border-radius: 10px;
		padding: 5px;
		cursor: pointer;
	}

	.upload-input {
		border: 1px solid #ccc;
		border-radius: 5px;
		padding: 10px;
		width: 300px;
	}

	.upload-input[type='file'] {
		position: absolute;
		clip: rect(0, 0, 0, 0);
	}
</style>
