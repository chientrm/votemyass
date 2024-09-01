<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { PUBLIC_URL } from '$env/static/public';
	import { Button } from '$lib/components/ui/button';
	import * as PageHeader from '$lib/components/ui/page-header';
	import * as Table from '$lib/components/ui/table';
	import { flags } from '$lib/flags';
	import { cn } from '$lib/utils';
	import MingcuteSocialXFill from '~icons/mingcute/social-x-fill';
	export let data;
	interface Country {
		yes: number;
		votes: number;
	}
	$: countries = new Map<string, Country>();
	$: data.voteResults.forEach((voteResult) => {
		const code = voteResult.country.substring(0, 2);
		const country = countries.get(code) ?? { yes: 0, votes: 0 };
		country.votes++;
		if (voteResult.value === 'yes') {
			country.yes++;
		}
		countries.set(code, country);
	});
	$: title = `${flags[data.pollResult.country]} ${data.pollResult.title}`;
	$: yes = data.pollResult.yes;
	$: votes = data.pollResult.votes;
	$: description = `${yes} yes, ${votes - yes} no`;
	$: url = `${PUBLIC_URL}${$page.url.pathname}`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:title" content={title} />
	<meta name="description" content={description} />
	<meta property="og:site_name" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content="{url}/og" />
	<meta property="og:image:alt" content={title} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
</svelte:head>

<PageHeader.Root>
	<PageHeader.Heading>{title}</PageHeader.Heading>
	<PageHeader.Description
		balanced={false}
		class={cn('p-2 text-white', yes / votes >= 0.5 ? 'bg-blue-500' : 'bg-red-500')}
	>
		{description}
	</PageHeader.Description>
</PageHeader.Root>

{#if data.myVoteResult}
	<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">
		You voted {data.myVoteResult.value}
	</h3>
{:else}
	<div class="flex flex-row items-center gap-2">
		<div class="grow" />
		<span>What would you say?</span>
		<form use:enhance method="post" action="?/yes">
			<Button type="submit">Yes</Button>
		</form>
		<form use:enhance method="post" action="?/no">
			<Button type="submit" variant="destructive">No</Button>
		</form>
	</div>
{/if}

<Button href="https://x.com/intent/tweet?url={url}&text={title}" target="_blank">
	<MingcuteSocialXFill class="mr-2 h-4 w-4" />
	Share
</Button>

<Table.Root>
	<Table.Caption>A list of all votes.</Table.Caption>
	<Table.Header>
		<Table.Row>
			<Table.Head>Country</Table.Head>
			<Table.Head>Votes</Table.Head>
			<Table.Head class="text-right">Result</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each countries.entries() as [code, country]}
			<Table.Row>
				<Table.Cell class="font-medium">{flags[code]}</Table.Cell>
				<Table.Cell>{country.votes}</Table.Cell>
				<Table.Cell
					class={cn(
						'text-right text-white',
						country.yes / country.votes > 0.5 ? 'bg-blue-500' : 'bg-red-500'
					)}
				>
					{country.yes} yes, {country.votes - country.yes} no
				</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
