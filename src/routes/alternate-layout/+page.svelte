<script lang="ts">
	import { getMonthHumanReadable, getEventTimePosInYear, endYear } from '$lib/Event';
	import config from '$lib/config';
	import { range } from '$lib/range';

	const years = range(config.startYear, endYear + 1);

	let size = 200;
	$: size = Math.max(size, 20);
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<div class="h-screen overflow-auto flex flex-col p-16">
	<div class="absolute top-8 right-8 flex gap-2">
		<button class="bg-white rounded-lg px-4 py-1 text-black" on:click={() => (size -= 10)}>-</button
		>
		<button class="bg-white rounded-lg px-4 py-1 text-black" on:click={() => (size += 10)}>+</button
		>
		<a class="bg-white rounded-lg px-4 py-1 text-black flex items-center justify-center" href="/">
			<svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
				><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path
					d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"
				/></svg
			>
		</a>
	</div>
	<div class="max-w-3xl mx-auto w-full">
		<h1 class="pb-8 text-2xl">{config.title}</h1>
		{#each years as year}
			{@const yearEvents = config.events.filter((event) => event.time.year === year)}
			<section class="relative" style="height: {size}px">
				<p class="left-16 top-0 absolute transform -translate-y-1/2 bg-black z-20">{year}</p>

				{#each yearEvents as yearEvent}
					<div
						class="absolute right-0 w-max rounded-lg z-30 text-right p-1 transform -translate-y-1/2 bg-slate-900 text-sm opacity-80"
						style="top: {getEventTimePosInYear(yearEvent.time) * 100}%"
					>
						{#if yearEvent.time.tag !== 'year'}
							{getMonthHumanReadable(yearEvent.time.month)}
						{/if}

						{#if yearEvent.time.tag === 'day'}
							{yearEvent.time.day}
						{/if}

						{yearEvent.time.year} -

						{yearEvent.name}
					</div>
				{/each}

				{#each [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11] as num}
					<div
						class="absolute left-0 bg-white h-[1px]"
						style="top: {(num / 12) * 100}%"
						class:w-8={num !== 0}
						class:w-full={num === 0}
					/>
				{/each}
			</section>
		{/each}
	</div>
</div>
