<script>
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import * as PageHeader from '$lib/components/ui/page-header';
	export let data;
	$: myVoteResult = data.voteResults.find((vote) => vote.userId === data.userId);
</script>

<PageHeader.Root>
	<PageHeader.Heading>{data.pollResults[0].title}</PageHeader.Heading>
	<PageHeader.Description balanced={false}>{data.voteResults.length} votes</PageHeader.Description>
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
