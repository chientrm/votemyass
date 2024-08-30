<script>
	import * as PageHeader from '$lib/components/ui/page-header';
	import * as Table from '$lib/components/ui/table';
	import { Button } from '$lib/components/ui/button';
	import { configs } from '$lib/configs';
	import Form from './form.svelte';
	import { flags } from '$lib/flags';

	export let data;
</script>

<PageHeader.Root>
	<PageHeader.Heading>Those who have hands, let them vote!</PageHeader.Heading>
	<PageHeader.Description balanced={false}>{configs.description}</PageHeader.Description>
</PageHeader.Root>

<Form data={data.form} />

<Table.Root>
	<Table.Caption>A list of recent polls.</Table.Caption>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-[100px]">Country</Table.Head>
			<Table.Head>Title</Table.Head>
			<Table.Head class="text-right">Result</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each data.pollResults as { id, title, country, yes, votes }}
			<Table.Row>
				<Table.Cell class="font-medium">{flags[country]}</Table.Cell>
				<Table.Cell>
					<Button variant="link" href="/poll/{id}">{title}</Button>
				</Table.Cell>
				<Table.Cell class="text-right">{((100 * yes) / votes).toFixed(0)} %</Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
