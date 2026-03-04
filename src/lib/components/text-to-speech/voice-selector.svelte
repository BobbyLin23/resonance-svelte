<script lang='ts'>
  import type { VoiceCategory } from '$lib/generated/prisma/client'
  import * as Select from '$lib/components/ui/select'
  import { VOICE_CATEGORY_LABELS } from '$lib/data/voice-categories'
  import { getTTSFormContext } from './text-to-speech-form.svelte'
  import { useTTSVoices } from './tts-voices-context.svelte'
  import VoiceAvatar from './voice-avatar.svelte'

  const { customVoices, systemVoices, allVoices: voices } = useTTSVoices()
  const form = getTTSFormContext()

  type VoiceDisplay = {
    id: string
    name: string
    category: VoiceCategory | null
  }

  function getCurrentVoice(vId: string | undefined): VoiceDisplay {
    const sid = vId ?? ''
    const selected = voices.find(v => v.id === sid)
    const hasMissing = Boolean(sid) && !selected
    if (selected)
      return selected
    if (hasMissing)
      return { id: sid, name: 'Unavailable voice', category: null }
    return voices[0] ?? { id: '', name: '', category: null }
  }

  function getHasMissingSelectedVoice(vId: string | undefined): boolean {
    const sid = vId ?? ''
    const selected = voices.find(v => v.id === sid)
    return Boolean(sid) && !selected
  }
</script>

<div class='space-y-2'>
  <span class='text-sm font-medium leading-none'>Voice style</span>
  <form.Field name='voiceId'>
    {#snippet children(field)}
      <form.Subscribe selector={s => ({ voiceId: s.values.voiceId, isSubmitting: s.isSubmitting })}>
        {#snippet children({ voiceId: vId, isSubmitting: submitting })}
          {@const vIdStr = vId ?? ''}
          {@const currentVoice = getCurrentVoice(vId)}
          {@const hasMissingSelectedVoice = getHasMissingSelectedVoice(vId)}
          <Select.Root
            type='single'
            value={vIdStr}
            onValueChange={(v: string) => field.handleChange(v)}
            disabled={submitting}
          >
            <Select.Trigger
              class='w-full h-auto gap-1 rounded-lg bg-white px-2 py-1'
              aria-label='Voice style'
            >
              {#if currentVoice?.id}
                <VoiceAvatar seed={currentVoice.id} name={currentVoice.name} />
                <span class='truncate text-sm font-medium tracking-tight'>
                  {currentVoice.name}
                  {#if currentVoice.category}
                    &nbsp; - {VOICE_CATEGORY_LABELS[currentVoice.category]}
                  {/if}
                </span>
              {/if}
            </Select.Trigger>
            <Select.Content>
              {#if hasMissingSelectedVoice && currentVoice?.id}
                <Select.Group>
                  <Select.GroupHeading>Selected Voice</Select.GroupHeading>
                  <Select.Item value={currentVoice.id}>
                    {#snippet children()}
                      <VoiceAvatar seed={currentVoice.id} name={currentVoice.name} />
                      <span class='truncate text-sm font-medium'>
                        {currentVoice.name}
                        {#if currentVoice.category}
                          &nbsp; - {VOICE_CATEGORY_LABELS[currentVoice.category]}
                        {/if}
                      </span>
                    {/snippet}
                  </Select.Item>
                </Select.Group>
                {#if customVoices.length > 0 || systemVoices.length > 0}
                  <Select.Separator />
                {/if}
              {/if}
              {#if customVoices.length > 0}
                <Select.Group>
                  <Select.GroupHeading>Team Voices</Select.GroupHeading>
                  {#each customVoices as v (v.id)}
                    <Select.Item value={v.id}>
                      {#snippet children()}
                        <VoiceAvatar seed={v.id} name={v.name} />
                        <span class='truncate text-sm font-medium'>
                          {v.name} - {VOICE_CATEGORY_LABELS[v.category]}
                        </span>
                      {/snippet}
                    </Select.Item>
                  {/each}
                </Select.Group>
              {/if}
              {#if customVoices.length > 0 && systemVoices.length > 0}
                <Select.Separator />
              {/if}
              {#if systemVoices.length > 0}
                <Select.Group>
                  <Select.GroupHeading>Built-in Voices</Select.GroupHeading>
                  {#each systemVoices as v (v.id)}
                    <Select.Item value={v.id}>
                      {#snippet children()}
                        <VoiceAvatar seed={v.id} name={v.name} />
                        <span class='truncate text-sm font-medium'>
                          {v.name} - {VOICE_CATEGORY_LABELS[v.category]}
                        </span>
                      {/snippet}
                    </Select.Item>
                  {/each}
                </Select.Group>
              {/if}
            </Select.Content>
          </Select.Root>
        {/snippet}
      </form.Subscribe>
    {/snippet}
  </form.Field>
</div>
