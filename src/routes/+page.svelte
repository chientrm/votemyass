<script>
	import { page } from '$app/stores';
	import { PUBLIC_URL } from '$env/static/public';
	import { Button } from '$lib/components/ui/button';
	import * as PageHeader from '$lib/components/ui/page-header';
	import { Separator } from '$lib/components/ui/separator';
	import * as Table from '$lib/components/ui/table';
	import { configs } from '$lib/configs';
	import { flags } from '$lib/flags';
	import { cn, percent } from '$lib/utils';
	import Form from './form.svelte';

	export let data;
</script>

<svelte:head>
	<title>{configs.title}</title>
	<meta property="og:title" content={configs.title} />
	<meta name="description" content={configs.description} />
	<meta property="og:site_name" content={configs.title} />
	<meta property="og:description" content={configs.description} />
	<meta property="og:image" content="{PUBLIC_URL}/og2.jpeg" />
	<meta property="og:image:alt" content={configs.title} />
	<meta property="og:image:width" content="1024" />
	<meta property="og:image:height" content="768" />
</svelte:head>

<PageHeader.Root>
	<PageHeader.Heading>VoteMyAss.com</PageHeader.Heading>
	<PageHeader.Description balanced={false}>{configs.features}</PageHeader.Description>
</PageHeader.Root>

<Form data={data.form} />

<div class="my-4 flex h-5 items-center space-x-4 text-sm">
	<Button
		href="/"
		variant="link"
		class={cn(
			'transition-colors hover:text-foreground/80',
			!$page.url.searchParams.has('latest') ? 'text-foreground/60' : 'text-foreground'
		)}
	>
		Top
	</Button>
	<Separator orientation="vertical" />
	<Button
		href="/?latest"
		variant="link"
		class={cn(
			'transition-colors hover:text-foreground/80',
			$page.url.searchParams.has('latest') ? 'text-foreground/60' : 'text-foreground'
		)}
	>
		Latest
	</Button>
</div>

<Table.Root>
	<Table.Caption>A list of recent polls.</Table.Caption>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-[100px]">Country</Table.Head>
			<Table.Head class="w-[100px]">Votes</Table.Head>
			<Table.Head>Title</Table.Head>
			<Table.Head class="text-right">Result</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each data.pollResults as { id, title, country, yes, votes }}
			<Table.Row>
				<Table.Cell class="font-medium">{flags[country]}</Table.Cell>
				<Table.Cell>{votes}</Table.Cell>
				<Table.Cell>
					<Button variant="link" href="/poll/{id}">{title}</Button>
				</Table.Cell>
				{#if yes > votes - yes}
					<Table.Cell class="bg-green-500 text-right text-white">
						Yes {percent(yes, votes)}
					</Table.Cell>
				{:else}
					<Table.Cell class="bg-red-500 text-right text-white">
						No {percent(yes, votes)}
					</Table.Cell>
				{/if}
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
