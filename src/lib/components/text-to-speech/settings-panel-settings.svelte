<script lang='ts'>
  import { Slider } from '$lib/components/ui/slider'
  import { sliders } from './sliders'
  import { getTTSFormContext } from './text-to-speech-form.svelte'
  import VoiceSelector from './voice-selector.svelte'

  const form = getTTSFormContext()
  const isSubmittingStore = form.useStore(s => s.isSubmitting)
</script>

<div class='border-b border-dashed p-4'>
  <VoiceSelector />
</div>
<div class='p-4 flex-1'>
  <div class='flex flex-col gap-8'>
    {#each sliders as slider (slider.id)}
      <form.Field name={slider.id}>
        {#snippet children(field)}
          <div class='space-y-2'>
            <span class='text-sm font-medium leading-none'>{slider.label}</span>
            <div class='flex items-center justify-between'>
              <span class='text-xs text-muted-foreground'>{slider.leftLabel}</span>
              <span class='text-xs text-muted-foreground'>{slider.rightLabel}</span>
            </div>
            <Slider
              type='single'
              value={field.state.value}
              onValueChange={v => field.handleChange(v)}
              min={slider.min}
              max={slider.max}
              step={slider.step}
              disabled={isSubmittingStore.current}
              class='**:data-[slot=slider-thumb]:size-3 **:data-[slot=slider-thumb]:bg-foreground **:data-[slot=slider-track]:h-1'
            />
          </div>
        {/snippet}
      </form.Field>
    {/each}
  </div>
</div>
