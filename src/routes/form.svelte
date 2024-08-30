<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { configs } from '$lib/configs';
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
			<Form.Label>What you want? What you want?</Form.Label>
			<Input
				{...attrs}
				bind:value={$formData.title}
				placeholder="Allow calling someone gay or retard again."
			/>
		</Form.Control>
		<Form.Description>{configs.description}</Form.Description>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button>Start a Poll!</Form.Button>
</form>
