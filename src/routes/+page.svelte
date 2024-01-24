<script lang="ts">
	import { getMonthHumanReadable } from '$lib/Event';
	import config from '$lib/config';

	const years = [...new Set(config.events.map((ev) => ev.time.year))].sort((a, b) => a - b);
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<div class="h-screen overflow-auto flex flex-col p-16">
	<div class="max-w-3xl mx-auto w-full flex flex-col gap-6 pb-10">
		<h1 class="pb-8 text-2xl">{config.title}</h1>
		{#each years as year}
			{@const yearEvents = config.events.filter((event) => event.time.year === year)}
			<section class="flex flex-col gap-4">
				<h2 class="text-lg">{year}</h2>

				{#each yearEvents as yearEvent}
					<div class="flex rounded-lg p-2 bg-slate-900 text-sm opacity-80">
						<div class="mr-auto">
							{#if yearEvent.time.tag !== 'year'}
								{getMonthHumanReadable(yearEvent.time.month)}
							{/if}

							{#if yearEvent.time.tag === 'day'}
								{yearEvent.time.day}
							{/if}

							{yearEvent.time.year}
						</div>
						{yearEvent.name}
					</div>
				{/each}
			</section>
		{/each}
		<a class="self-end text-white underline mt-8" href="/alternate-layout"
			>Alternate layout</a
		>
	</div>
</div>
