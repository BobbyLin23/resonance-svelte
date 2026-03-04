<script lang='ts' module>
  import type { FormAsyncValidateOrFn, FormValidateOrFn, SvelteFormApi } from '@tanstack/svelte-form'
  import type { Snippet } from 'svelte'
  import {
    createForm,
    formOptions,
  } from '@tanstack/svelte-form'
  import { getContext, setContext } from 'svelte'
  import z from 'zod'

  // eslint-disable-next-line unused-imports/no-unused-vars
  const ttsFormSchema = z.object({
    text: z.string().min(1, 'Please enter some text'),
    voiceId: z.string().min(1, 'Please select a voice'),
    temperature: z.number(),
    topP: z.number(),
    topK: z.number(),
    repetitionPenalty: z.number(),
  })

  export type TTSFormValues = z.infer<typeof ttsFormSchema>

  /** Form context type: SvelteFormApi + handleSubmit from FormApi */
  type TTSFormApi = SvelteFormApi<
    TTSFormValues,
    undefined | FormValidateOrFn<TTSFormValues>,
    undefined | FormValidateOrFn<TTSFormValues>,
    undefined | FormAsyncValidateOrFn<TTSFormValues>,
    undefined | FormValidateOrFn<TTSFormValues>,
    undefined | FormValidateOrFn<TTSFormValues>,
    undefined | FormValidateOrFn<TTSFormValues>,
    undefined | FormAsyncValidateOrFn<TTSFormValues>,
    undefined | FormValidateOrFn<TTSFormValues>,
    undefined | FormValidateOrFn<TTSFormValues>,
    undefined | FormValidateOrFn<TTSFormValues>,
    unknown
  > & { handleSubmit: () => void }

  const TTS_FORM_KEY = Symbol('tts-form') as symbol

  export function setTTSFormContext(form: TTSFormApi): void {
    setContext(TTS_FORM_KEY, form)
  }

  export function getTTSFormContext(): TTSFormApi {
    const form = getContext<TTSFormApi>(TTS_FORM_KEY)
    if (!form)
      throw new Error('TTS form context not found')
    return form
  }

  export const defaultTTSValues: TTSFormValues = {
    text: '',
    voiceId: '',
    temperature: 0.8,
    topP: 0.95,
    topK: 1000,
    repetitionPenalty: 1.2,
  }

  export const ttsFormOptions = formOptions({
    defaultValues: defaultTTSValues,
  })
</script>

<script lang='ts'>
  const { children, defaultValues }: {
    children?: Snippet
    defaultValues?: Partial<TTSFormValues>
  } = $props()

  const form = createForm(() => ({
    ...ttsFormOptions,
    defaultValues: { ...defaultTTSValues, ...defaultValues },
    onSubmit: () => {
    // console.log(values)
    },
  }))

  setTTSFormContext(form as TTSFormApi)
</script>

<form
  class='flex min-h-0 flex-1 overflow-hidden'
  onsubmit={(e) => {
    e.preventDefault()
    e.stopPropagation()
    form.handleSubmit()
  }}>
  {@render children?.()}
</form>
