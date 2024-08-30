<script>
	import Form from './form.svelte';
	export let data;
</script>

<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
	Those who have hands, let them vote!
</h1>

<Form data={data.form} />
