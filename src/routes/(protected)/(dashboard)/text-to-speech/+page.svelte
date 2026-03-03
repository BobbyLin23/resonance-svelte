<script lang='ts'>
  import SettingsPanel from '$lib/components/text-to-speech/settings-panel.svelte'
  import TextInputPanel from '$lib/components/text-to-speech/text-input-panel.svelte'
  import TextToSpeechForm from '$lib/components/text-to-speech/text-to-speech-form.svelte'
  import VoicePreviewPlaceholder from '$lib/components/text-to-speech/voice-preview-placeholder.svelte'

</script>

<TextToSpeechForm>
  <div class='flex min-h-0 flex-1 flex-col'>
    <TextInputPanel />
    <VoicePreviewPlaceholder />
  </div>
  <SettingsPanel />
</TextToSpeechForm>
