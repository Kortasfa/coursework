<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	import { AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';

	function changeTheme(themeToChange: 'dark' | 'white') {
		document.getElementById('html')?.classList.remove(themeToChange == 'dark' ? 'white' : 'dark');
		document.getElementById('html')?.classList.add(themeToChange == 'dark' ? 'dark' : 'white');
	}
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase"
					>Поиск физических принципов действий на основе фонда физических эффектов</strong
				>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<div class="btn-group ">
					<button on:click={() => changeTheme('dark')}>Темный</button>
					<button on:click={() => changeTheme('white')}>Светлый</button>
				</div>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/kortasfa/coursework"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<div>
		<AppRail class="fixed">
			<AppRailAnchor href="/" selected={$page.url.pathname === '/'}>
				<svelte:fragment slot="lead"><img src="home.svg" alt="home" /></svelte:fragment>
			</AppRailAnchor>
			<AppRailAnchor href="/about" selected={$page.url.pathname === '/about'}>
				<svelte:fragment slot="lead"><img src="info.svg" alt="info" /></svelte:fragment>
			</AppRailAnchor>
			<AppRailAnchor href="/data" selected={$page.url.pathname === '/data'}>
				<svelte:fragment slot="lead"><img src="data.svg" alt="info" /></svelte:fragment>
			</AppRailAnchor>
		</AppRail>
		<div class="margin">
		<slot />
		</div>
	</div>
</AppShell>

<style>
	.margin {
		margin-left: 80px;
	}
</style>