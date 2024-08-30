<script>
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import * as PageHeader from '$lib/components/ui/page-header';
	import { flags } from '$lib/flags';
	import { cn } from '$lib/utils';
	export let data;
	$: myVoteResult = data.voteResults.find((vote) => vote.userId === data.userId);
	$: yes = data.pollResults[0].yes;
	$: votes = data.pollResults[0].votes;
</script>

<PageHeader.Root>
	<PageHeader.Heading
		>{flags[data.pollResults[0].country]} {data.pollResults[0].title}</PageHeader.Heading
	>
	<PageHeader.Description
		balanced={false}
		class={cn('p-2 text-white', yes / votes >= 0.5 ? 'bg-green-500' : 'bg-red-500')}
	>
		{yes} yes/ {votes} votes ({((100 * yes) / votes).toFixed(0)} %)
	</PageHeader.Description>
</PageHeader.Root>

{#if myVoteResult}
	You voted {myVoteResult.value}
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
