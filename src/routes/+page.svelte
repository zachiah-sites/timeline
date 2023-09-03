<script lang="ts">
	import { getMonthHumanReadable, getEventTimePosInYear, endYear } from '$lib/Event';
	import config from '$lib/config';
	import { range } from '$lib/range';

    const years = range(config.startYear, endYear + 1);
    
    let size = 200
    $: size = Math.max(size, 20);
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<div class="h-screen overflow-auto flex flex-col p-16">
    <div class="absolute top-8 right-8">
        <button class="bg-white rounded-lg px-4 py-1 text-black" on:click={() => size -= 10}>-</button>
        <button class="bg-white rounded-lg px-4 py-1 text-black" on:click={() => size += 10}>+</button>
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
