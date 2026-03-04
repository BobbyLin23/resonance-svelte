<script lang='ts'>
  import type { TTSFormValues } from '$lib/components/text-to-speech/text-to-speech-form.svelte'
  import type { PageProps } from './$types'
  import SettingsPanel from '$lib/components/text-to-speech/settings-panel.svelte'
  import TextInputPanel from '$lib/components/text-to-speech/text-input-panel.svelte'
  import TextToSpeechForm, { defaultTTSValues } from '$lib/components/text-to-speech/text-to-speech-form.svelte'
  import TtsVoicesProvider from '$lib/components/text-to-speech/tts-voices-provider.svelte'
  import VoicePreviewPlaceholder from '$lib/components/text-to-speech/voice-preview-placeholder.svelte'
  import { Spinner } from '$lib/components/ui/spinner'
  import { orpc } from '$lib/orpc'
  import { createQuery } from '@tanstack/svelte-query'

  const { data }: PageProps = $props()

  const { data: voices, isPending } = createQuery(() => orpc.voices.getAll.queryOptions())

  // svelte-ignore state_referenced_locally
  const initialValues: Partial<TTSFormValues> = {
    voiceId: data.voiceId ?? undefined,
    text: data.text ?? undefined,
  }

  const { custom: customVoices, system: systemVoices } = voices ?? { custom: [], system: [] }
  const allVoices = [...customVoices, ...systemVoices]
  const fallbackVoiceId = allVoices[0]?.id ?? ''

  const resolvedVoiceId
    = initialValues.voiceId && allVoices.some(v => v.id === initialValues.voiceId)
      ? initialValues.voiceId
      : fallbackVoiceId

  const defaultValues: TTSFormValues = {
    ...defaultTTSValues,
    ...initialValues,
    voiceId: resolvedVoiceId,
  }
</script>

{#if isPending}
  <div class='flex min-h-0 flex-1 items-center justify-center'>
    <Spinner class='size-6' />
  </div>
{:else}
  <TtsVoicesProvider value={{ customVoices, systemVoices, allVoices }}>
    <TextToSpeechForm defaultValues={defaultValues}>
      <div class='flex min-h-0 flex-1 overflow-hidden'>
        <div class='flex min-h-0 flex-1 flex-col'>
          <TextInputPanel />
          <VoicePreviewPlaceholder />
        </div>
        <SettingsPanel />
      </div>
    </TextToSpeechForm>
  </TtsVoicesProvider>
{/if}
