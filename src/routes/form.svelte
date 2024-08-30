<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Textarea } from '$lib/components/ui/textarea';
	import { type Infer, superForm, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { formSchema, type FormSchema } from './schema';

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance } = form;
</script>

<form method="POST" use:enhance>
	<Form.Field {form} name="title">
		<Form.Control let:attrs>
			<Form.Label>What's happening?</Form.Label>
			<Textarea
				{...attrs}
				bind:value={$formData.title}
				placeholder="All to call someone gay or retard again."
			/>
		</Form.Control>
		<Form.Description>Vote your ass out of this clown world 🤡🌎.</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Start a Poll!</Form.Button>
</form>
