<script>
	import Form from './form.svelte';
	export let data;
</script>

<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">
	Those who have hands, let them vote!
</h3>

<Form data={data.form} />
